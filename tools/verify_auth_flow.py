from playwright.sync_api import sync_playwright, expect
import time
import urllib.request
import json
import os

BASE = os.environ.get("BASE_URL", "http://localhost:5173")


def wait_for_server(url, timeout=60):
    start = time.time()
    while time.time() - start < timeout:
        try:
            with urllib.request.urlopen(url, timeout=5) as resp:
                if resp.status == 200:
                    return True
        except Exception:
            pass
        time.sleep(1)
    return False


def get_mock_current_user(page):
    try:
        return page.evaluate("() => window.__kinGuardMockApi?.__getCurrentUser?.() || null")
    except Exception:
        return None


def get_last_otp(page, email):
    try:
        return page.evaluate(f"() => window.__kinGuardMockApi?.__getLastOtpForEmail?.('{email}') || null")
    except Exception:
        return None


if __name__ == '__main__':
    print(f"Waiting for dev server at {BASE} ...")
    if not wait_for_server(BASE):
        print("DEV SERVER NOT READY: timed out waiting for the dev server.")
        raise SystemExit(2)
    print("Dev server is up.")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, slow_mo=300)
        try:
            ########################################
            # 1. Login as seeded admin
            ########################################
            print("CHECK 1: Logging in as seeded admin...")
            context = browser.new_context()
            page = context.new_page()
            page.goto(f"{BASE}/family-admin/login")
            # fill form
            page.fill('input[name="email"]', 'admin@example.com')
            page.fill('input[name="password"]', 'Password123!')
            page.click('button:has-text("Sign In")')
            try:
                page.wait_for_url("**/dashboard", timeout=10000)
                print("  -> navigated to /dashboard")
            except Exception:
                print("  -> FAILED to reach /dashboard after login, current:", page.url)

            ui_user = None
            try:
                ui_user = page.locator('text=Admin User').first().is_visible()
            except Exception:
                ui_user = False

            mock_user = get_mock_current_user(page)
            print(f"  -> mock backend currentUser: {mock_user}")
            print(f"  -> UI shows Admin User text: {ui_user}")
            check1_pass = (mock_user and mock_user.get('email') == 'admin@example.com' and ui_user)
            print("CHECK 1 RESULT:", "PASS" if check1_pass else "FAIL")

            ########################################
            # 2. Hard reload and assert session persists
            ########################################
            print("CHECK 2: Hard reload on /dashboard ...")
            page.reload(wait_until='networkidle')
            try:
                page.wait_for_url("**/dashboard", timeout=5000)
                print("  -> still on /dashboard after reload")
            except Exception:
                print("  -> NOT on /dashboard after reload, current:", page.url)
            mock_after_reload = get_mock_current_user(page)
            print("  -> mock currentUser after reload:", mock_after_reload)
            print("CHECK 2 RESULT:", "PASS" if (mock_after_reload and mock_after_reload.get('email') == 'admin@example.com') else "FAIL")

            ########################################
            # 3. Log out via topbar -> assert redirect to /auth, then back should not restore session
            ########################################
            print("CHECK 3: Click Log out in topbar...")
            # click the Log out button
            try:
                page.click('button:has-text("Log out")')
            except Exception:
                print("  -> Could not find Log out button to click")
            # wait for unauth redirect (to /auth or family-admin)
            time.sleep(0.5)
            mock_after_logout = get_mock_current_user(page)
            print("  -> mock currentUser after logout:", mock_after_logout)
            try:
                page.wait_for_url("**/auth**", timeout=5000)
                redirected_to_auth = True
                print("  -> redirected to /auth")
            except Exception:
                redirected_to_auth = False
                print("  -> did not redirect to /auth, current:", page.url)

            # go back
            page.go_back()
            time.sleep(0.5)
            after_back_url = page.url
            mock_after_back = get_mock_current_user(page)
            print("  -> after back navigation url:", after_back_url)
            print("  -> mock currentUser after back:", mock_after_back)
            not_restored = mock_after_back is None
            print("CHECK 3 RESULT:", "PASS" if (redirected_to_auth and not_restored) else "FAIL")

            ########################################
            # 4. Direct navigate to /dashboard while logged out -> expect redirect to /auth; screenshot
            ########################################
            print("CHECK 4: Direct navigate to /dashboard while logged out (fresh context)...")
            context2 = browser.new_context()
            page2 = context2.new_page()
            page2.goto(f"{BASE}/dashboard")
            try:
                page2.wait_for_url("**/auth**", timeout=5000)
                print("  -> redirected to /auth as expected")
            except Exception:
                print("  -> NOT redirected; current:", page2.url)
            ss_path = os.path.join('tools', 'screenshot_check4.png')
            page2.screenshot(path=ss_path)
            print("  -> screenshot saved to", ss_path)
            print("CHECK 4 RESULT:", "PASS" if page2.url.find('/auth') != -1 else "FAIL")

            ########################################
            # 5. Caregiver invite flow
            ########################################
            print("CHECK 5: Caregiver invite acceptance flow (fresh context)...")
            context3 = browser.new_context()
            page3 = context3.new_page()
            page3.goto(f"{BASE}/member/caregiver-invite?token=caregiver-token")
            page3.wait_for_load_state('networkidle')
            # fill form using labels
            page3.get_by_label('Full Name').fill('Caregiver One')
            # email should be prefilled but ensure
            try:
                page3.get_by_label('Email Address').fill('caregiver@example.com')
            except Exception:
                pass
            page3.get_by_label('Create Password').fill('Password123!')
            page3.get_by_label('Confirm Password').fill('Password123!')
            # check the responsibilities checkbox
            page3.check('#caregiver-responsibilities')
            # submit
            page3.click('button:has-text("Join Care Circle")')
            # should navigate to verify email
            try:
                page3.wait_for_url('**/family-admin/verify-email', timeout=5000)
                print('  -> landed on verify-email')
            except Exception:
                print('  -> did not land on verify-email, current:', page3.url)

            # get OTP from mock API helper
            otp = get_last_otp(page3, 'caregiver@example.com')
            print('  -> grabbed OTP from mock backend:', otp)
            if otp:
                # fill OTP inputs
                inputs = page3.locator('input[autoComplete="one-time-code"]')
                for i, ch in enumerate(str(otp)):
                    inputs.nth(i).fill(ch)
                # click Verify Account
                page3.click('button:has-text("Verify Account")')
                try:
                    page3.wait_for_url('**/family-admin/care-circle-setup', timeout=5000)
                    print('  -> verified and landed on care-circle-setup')
                except Exception:
                    print('  -> verify did not land on care-circle-setup, current:', page3.url)
            else:
                print('  -> OTP not available from mock backend; cannot complete verify step')

            # navigate to dashboard
            page3.goto(f"{BASE}/dashboard")
            page3.wait_for_load_state('networkidle')
            # assert caregiver-specific dashboard: check for a caregiver-only item like 'Medication' and absence of 'Insights'
            has_med = page3.locator('text=Medication').count() > 0
            has_insights = page3.locator('text=Insights').count() > 0
            mock_caregiver = get_mock_current_user(page3)
            print('  -> mock currentUser after caregiver flow:', mock_caregiver)
            print(f'  -> Medication present: {has_med}, Insights present: {has_insights}')
            check5_pass = mock_caregiver and mock_caregiver.get('role') == 'caregiver' and has_med and not has_insights
            print('CHECK 5 RESULT:', 'PASS' if check5_pass else 'FAIL')

            ########################################
            # 6. Family-member invite flow
            ########################################
            print('CHECK 6: Family-member invite acceptance (fresh context)...')
            context4 = browser.new_context()
            page4 = context4.new_page()
            page4.goto(f"{BASE}/member/family-invite?token=family-member-token")
            page4.wait_for_load_state('networkidle')
            page4.get_by_label('Full Name').fill('Family Member One')
            page4.get_by_label('Email Address').fill('family.member@example.com')
            page4.get_by_label('Create Password').fill('Password123!')
            page4.get_by_label('Confirm Password').fill('Password123!')
            # accept terms
            page4.check('input[name="acceptedTerms"], input[name="agreeToTerms"], input[type="checkbox"]')
            # submit
            page4.click('button:has-text("Continue")') if page4.locator('button:has-text("Continue")').count() else page4.click('button:has-text("Join")') if page4.locator('button:has-text("Join")').count() else page4.click('button:has-text("Create Account")') if page4.locator('button:has-text("Create Account")').count() else page4.click('button:has-text("Submit")')
            # page should navigate to member access-ready
            try:
                page4.wait_for_url('**/member/access-ready', timeout=5000)
                print('  -> landed on member access-ready')
            except Exception:
                print('  -> did not land on access-ready, current:', page4.url)

            # click Go to Dashboard button
            try:
                page4.click('button:has-text("Go to Dashboard")')
            except Exception:
                # try any button that navigates to dashboard
                page4.goto(f"{BASE}/dashboard")
            page4.wait_for_load_state('networkidle')
            mock_family = get_mock_current_user(page4)
            has_messages = page4.locator('text=Messages').count() > 0
            has_care_circle = page4.locator('text=Care Circle').count() > 0
            print('  -> mock currentUser after family-member flow:', mock_family)
            print(f'  -> Messages present: {has_messages}, Care Circle present: {has_care_circle}')
            check6_pass = mock_family and mock_family.get('role') in ('family-member','family-member') and has_messages and has_care_circle
            print('CHECK 6 RESULT:', 'PASS' if check6_pass else 'FAIL')

            ########################################
            # 7. Caregiver cannot access /dashboard/messages directly
            ########################################
            print('CHECK 7: As caregiver, navigate to /dashboard/messages and assert blocked')
            # reuse context3 (caregiver)
            page3.goto(f"{BASE}/dashboard/messages")
            try:
                # expect redirect away to /dashboard
                page3.wait_for_url('**/dashboard', timeout=5000)
                final7 = page3.url
                print('  -> final url after attempting /dashboard/messages:', final7)
                blocked7 = final7.endswith('/dashboard')
            except Exception:
                print('  -> navigation behavior unexpected, current:', page3.url)
                blocked7 = False
            ss7 = os.path.join('tools', 'screenshot_check7.png')
            page3.screenshot(path=ss7)
            print('  -> screenshot saved to', ss7)
            print('CHECK 7 RESULT:', 'PASS' if blocked7 else 'FAIL')

            ########################################
            # 8. Family member cannot access /dashboard/medication directly
            ########################################
            print('CHECK 8: As family-member, navigate to /dashboard/medication and assert blocked')
            page4.goto(f"{BASE}/dashboard/medication")
            try:
                page4.wait_for_url('**/dashboard', timeout=5000)
                final8 = page4.url
                blocked8 = final8.endswith('/dashboard')
                print('  -> final url after attempting /dashboard/medication:', final8)
            except Exception:
                print('  -> navigation behavior unexpected, current:', page4.url)
                blocked8 = False
            ss8 = os.path.join('tools', 'screenshot_check8.png')
            page4.screenshot(path=ss8)
            print('  -> screenshot saved to', ss8)
            print('CHECK 8 RESULT:', 'PASS' if blocked8 else 'FAIL')

            ########################################
            # End
            ########################################
            print('ALL CHECKS COMPLETE')

        finally:
            try:
                browser.close()
            except Exception:
                pass
