# KinGuard Dashboard Architecture

> This document is based on the KinGuard React codebase (routes, RBAC configuration, and page components) as the source of truth. Where behavior is inferred rather than explicitly coded, it is labeled **(Assumption)**.

---

## Part 1 — Dashboard Overview

**What KinGuard is**

KinGuard is a family care coordination platform built around a "Care Circle" — a group of people who share responsibility for monitoring and supporting a loved one (typically an elderly or dependent family member). The product combines medication tracking, wellness check-ins, activity timelines, messaging, and emergency response into a single shared workspace.

**What the dashboard is used for**

The dashboard (`/dashboard/*`, mirrored at `/app/*`) is the authenticated core of the product. Once a Family Admin has created a Care Circle and invited people into it, everyone in that circle uses the dashboard to:

- Check on the loved one's current wellness state and recent activity
- Track and confirm medication doses
- Send and read care notes and messages
- Receive and respond to alerts, including emergencies
- Manage who is in the Care Circle and what they can do

**The three user roles**

| Role | Who they are | Primary concern |
|---|---|---|
| **Family Admin** | The account creator; typically the loved one's closest relative and organizer of care | Full oversight — managing the Care Circle, medications, insights, and emergencies |
| **Family Member** | A relative or friend invited into the Care Circle | Staying informed about the loved one's wellbeing without necessarily providing hands-on care |
| **Caregiver** | A professional or family caregiver invited to provide direct, hands-on care | Executing daily care tasks — medication administration, check-ins, status updates |

**How they interact with one another**

The Family Admin creates the Care Circle and invites both Caregivers and Family Members into it (`InviteMemberPage`, `InviteFamilyPage`). Caregivers perform and log direct care actions (medication administration, wellness status updates), which are surfaced to Family Members as read-friendly updates and to the Family Admin as full operational data. All three roles share the same loved one's profile, medication list, activity timeline, and emergency system — but the interface each sees is tailored to their responsibilities (see Part 9, Role Access Matrix). Every role can escalate to Emergency (as either an Emergency Center or a simplified Emergency SOS view) and receive alerts when something needs attention.

---

## Part 2 — Complete Screen Inventory

Routes are defined under both `/dashboard/*` and `/app/*` (a legacy/duplicate mount of the same route tree — see Part 11). The table below uses the `/dashboard` paths. Several routes render a different React page per role via a "Route Page" wrapper component that reads the current role from `MockUserContext`.

| Screen | React Page | Route | Primary Role | Description |
|---|---|---|---|---|
| Dashboard (Admin) | `DashboardPage` | `/dashboard` | Family Admin | Overview hub: loved one's status hero card, wellness/medication stats, quick actions |
| Dashboard (Family Member) | `FamilyMemberDashboardPage` | `/dashboard` | Family Member | Loved one status card, today's care metrics, recent updates feed |
| Dashboard (Caregiver / "Today") | `CaregiverDashboardPage` | `/dashboard` | Caregiver | Focused single-task view: the next medication due and how to log it |
| Care Circle (Admin/Caregiver) | `CareCirclePage` | `/dashboard/care-circle` | Family Admin | Full roster of Care Circle members with contact info and status |
| Care Circle (Family Member) | `FamilyMemberCareCirclePage` | `/dashboard/care-circle` | Family Member | Read-oriented roster of Care Circle members |
| Invite Member | `InviteMemberPage` | `/dashboard/care-circle/invite` | Family Admin | Form to invite a new Caregiver or Family Member |
| Loved One Profile (Admin) | `LovedOneProfilePage` | `/dashboard/loved-one` | Family Admin | Full medical/personal profile, medication summary, care notes, emergency contacts |
| Loved One Profile (Family Member) | `FamilyMembersDesktopLovedOneScreenPage` | `/dashboard/loved-one` | Family Member | Same profile content, family-oriented framing (Care Circle, Send Check-in) |
| Loved One Status (Caregiver) | `LovedOneStatusScreenPage` | `/dashboard/loved-one` and `/dashboard/loved-one/status` | Caregiver | Condensed "current state" cards (wellness, medication, activity) plus care notes |
| Check-in | `CheckInPage` | `/dashboard/check-ins` | Family Member / Caregiver | Screen for sending or viewing a wellness check-in |
| Update Care Status | `UpdateCareStatusPage` | `/dashboard/check-ins/update-status` and `/check-ins/update-status` | Caregiver | Modal-style form to record the loved one's current state and care actions taken |
| Medications | `MedicationsPage` | `/dashboard/medication` | Family Admin / Caregiver | List of active medications and their schedule/status |
| Add Medication | `AddMedicationPage` | `/dashboard/medication/add` | Family Admin | Form to add a new medication to the regimen |
| Medication Task Detail | `MedicationTaskDetailPage` | *(not yet wired to a route)* | Caregiver | Detail view for a single medication task **(stub/placeholder file present but empty)** |
| Emergency Center | `EmergencyCenterPage` | `/dashboard/emergency-center` | Family Admin / Family Member | Full emergency dashboard: alert progress, live location, immediate actions |
| Emergency SOS | `EmergencySOSPage` | `/dashboard/emergency-sos` | Caregiver | Caregiver-facing emergency response view, shown via the same routes when role is Caregiver |
| Messages | `MessagesPage` | `/dashboard/messages` | All roles | Shared messaging/communication screen for the Care Circle |
| Family Members Message *(placeholder)* | `FamilyMembersMessagePage` | *(not wired to a route)* | Family Member | Placeholder page, not connected to routing |
| Notification Center (Admin) | `NotificationCenterPage` | `/dashboard/notifications` | Family Admin | Full alert/notification management |
| Caregiver Alerts | `CaregiverAlertsPage` | `/dashboard/notifications` | Caregiver | Active/resolved alerts relevant to care tasks |
| Family Member Alerts | `FamilyMemberAlertsPage` | `/dashboard/notifications` | Family Member | Attention-required alerts and a recent updates feed |
| Insights | `HealthInsightsPage` | `/dashboard/insights` | Family Admin | Health trend/insight reporting |
| Activity Timeline | `CareActivityTimelinePage` | `/dashboard/activity` | Caregiver | Chronological log of medication, notes, and wellness events |
| Profile (Admin) | `ProfilePage` | `/dashboard/profile` | Family Admin | Account/profile management |
| Caregiver Profile | `CaregiverProfilePage` | `/dashboard/profile` | Caregiver | Profile, notification/security settings, Care Circle access info |
| Family Member Profile | `FamilyMemberProfilePage` | `/dashboard/profile` | Family Member | Profile, Care Circle link, preferences, account settings |
| Settings | `SettingsPage` | `/dashboard/settings` | All roles | Application-wide settings |

**Authentication, onboarding, and invitation screens** (precede the dashboard; documented fully in Part 5):

| Screen | React Page | Route | Description |
|---|---|---|---|
| Welcome | `WelcomePage` | `/auth` (and legacy `/family-admin`) | Landing screen with Register/Sign In options |
| Create Account | `CreateAccountPage` | `/auth/register` | Family Admin registration form |
| Login | `LoginPage` | `/auth/login` | Family Admin login form |
| Forgot Password | `ForgotPasswordPage` | `/auth/forgot-password` | Password recovery request |
| Verify Email | `VerifyEmailPage` | `/auth/verify-email` | OTP entry to verify the new account |
| Care Circle Setup Intro | `CareCircleSetupInit` | `/onboarding/care-circle-setup` | Welcome/intro screen before creating a Care Circle |
| Create Care Circle | `CreateCareCirclePage` | `/onboarding/create-care-circle` | Form collecting the loved one's profile |
| Setup Complete | `SetupCompletePage` | `/onboarding/setup-complete` and `/invitations/complete` | Confirms setup, offers "go to dashboard" or "invite more members" |
| Invite Family | `InviteFamilyPage` | `/invitations/invite` | Bulk invitation form for Family Members/Caregivers |
| Caregiver Invitation Acceptance | `CaregiverInvitationAcceptancePage` | *(page exists; route not present in routing files)* | Caregiver accepts an invite, sets a password |
| Family Member Invitation Acceptance | `FamilyMemberInvitationAcceptancePage` | *(page exists; route not present in routing files)* | Family Member accepts an invite, sets a password |
| Member Access Ready | `MemberAccessReadyPage` | *(page exists; route not present in routing files)* | Confirms the invited member now has access |

---

## Part 3 — Screen Details

### Dashboard (Family Admin) — `DashboardPage`
- **Purpose:** Central daily overview for the person coordinating care.
- **Who can access it:** Family Admin (default `/dashboard` view when role is Family Admin).
- **Main actions:** View loved one's live status; access quick actions (implied: invite member, log medication, send check-in, view insights, based on icon imports `UserPlus`, `Pills`, `PaperPlane`, `Chart`).
- **Main information shown:** Personalized greeting, loved one's hero card (photo, check-in status, quote/mood), wellness % and medications-taken stats.
- **Navigation links:** Sidebar links to Care Circle, Medication, Check-ins, Insights, Messages, Emergency Center, Settings.
- **Possible next screens:** Loved One Profile, Care Circle, Medications, Emergency Center.

### Dashboard (Family Member) — `FamilyMemberDashboardPage`
- **Purpose:** Give a family member a quick, reassuring snapshot without operational detail.
- **Who can access it:** Family Member.
- **Main actions:** "View details" (loved one profile), scroll recent updates, view "no active alerts" confirmation.
- **Main information shown:** Loved one's profile card with mood quote and last check-in time, heart rate/rest rate, Today's Care metrics (meds, check-in, caregiver activity), a recent-updates timeline.
- **Navigation links:** Sidebar — Home, Care Circle, Loved One, Messages, Alerts, Profile, Emergency Center, Settings.
- **Possible next screens:** Loved One Profile, Notifications/Alerts, Messages.

### Dashboard ("Today") — `CaregiverDashboardPage`
- **Purpose:** Single-task-focused screen directing the caregiver to the next required action.
- **Who can access it:** Caregiver.
- **Main actions:** Mark medication as Taken, Remind Me Later, mark Unable to Take; access emergency contacts.
- **Main information shown:** The next-due medication (name, dosage, instructions, due time, pending/success status), a confirmation state once logged, and the assigned loved one's identity.
- **Navigation links:** Sidebar — Today, Loved One, Activity, Alerts, Profile, Emergency Center, Settings.
- **Possible next screens:** Update Care Status, Loved One Status, Emergency SOS.

### Care Circle (Admin/Caregiver view) — `CareCirclePage`
- **Purpose:** Manage and review everyone participating in the loved one's care.
- **Who can access it:** Family Admin (also reused when `CareCircleRoutePage` doesn't match Family Member).
- **Main actions:** View member roles/contact info, invite new members (implied navigation to Invite Member), manage per-member options (`EllipsisVertical` menu).
- **Main information shown:** Member cards (name, role badge, online/offline status, email/phone/location, last contact).
- **Navigation links:** "Invite" action → Invite Member page.
- **Possible next screens:** Invite Member.

### Care Circle (Family Member view) — `FamilyMemberCareCirclePage`
- **Purpose:** Let a family member see who else is involved in care, with lighter-weight actions.
- **Who can access it:** Family Member.
- **Main actions:** View member cards; per-member menu.
- **Main information shown:** Member cards with admin/standard role badges, contact info, and status (online/offline/check-in/last-contact).
- **Navigation links:** None beyond the member list itself (no invite affordance shown).
- **Possible next screens:** *(none explicit — terminal screen within this flow)*

### Invite Member — `InviteMemberPage`
- **Purpose:** Add a new person (Caregiver or Family Member) to the Care Circle.
- **Who can access it:** Family Admin (`inviteMember` permission).
- **Main actions:** Choose invitee role ("who"), choose invitation delivery method ("how"), fill name/email/phone, submit invite.
- **Main information shown:** Step-numbered form (`StepHeader`), role selection cards, input fields.
- **Navigation links:** Back arrow (`ArrowLeft`) to Care Circle.
- **Possible next screens:** Care Circle (on success).

### Loved One Profile (Admin) — `LovedOneProfilePage`
- **Purpose:** Comprehensive medical and personal record for the loved one.
- **Who can access it:** Family Admin.
- **Main actions:** Edit personal info, refresh health profile, manage medications, add a care note, call emergency contacts, invite a caregiver, view reports, send a check-in.
- **Main information shown:** Header (name, priority badge, pulse, location), Personal Information, Health Profile (conditions/allergies), Medication Summary, Care Notes, Emergency Contacts, Care Circle roster, Recent Activity.
- **Navigation links:** "View Reports," "Manage All" (medications), "Manage Emergency Protocol," "Manage" (Care Circle).
- **Possible next screens:** Medications, Care Circle, Emergency Center.

### Loved One Profile (Family Member) — `FamilyMembersDesktopLovedOneScreenPage`
- **Purpose:** Same profile depth as the admin view, framed for a family member's actions (check-ins, reports) rather than clinical edits.
- **Who can access it:** Family Member.
- **Main actions:** View Reports, Send Check-in, edit personal info, sync health profile, add care note, call emergency contacts, invite caregiver.
- **Main information shown:** Identical structure to the Admin loved-one profile (personal info, health profile, medication summary, care notes, emergency contacts, care circle, recent activity).
- **Navigation links:** "Manage All," "Manage Emergency Protocol," "Invite Caregiver."
- **Possible next screens:** Send Check-in, Invite Member, Emergency Center.

### Loved One Status (Caregiver) — `LovedOneStatusScreenPage`
- **Purpose:** At-a-glance operational state of the loved one for whoever is providing direct care.
- **Who can access it:** Caregiver (also default fallback in `LovedOneRoutePage` for other roles when relevant).
- **Main actions:** Add Care Note, trigger Emergency Alert, call emergency contacts, manage Care Circle.
- **Main information shown:** Three state cards (Wellness, Medication progress, Activity), a Care Notes list, Emergency Contacts, Care Resources, Care Circle avatar stack.
- **Navigation links:** "Manage" (Care Circle), "View All Historical Notes."
- **Possible next screens:** Emergency Center/SOS, Care Circle.

### Check-in — `CheckInPage`
- **Purpose:** Send or review a wellness check-in for/about the loved one.
- **Who can access it:** Family Member and Caregiver (`sendCheckIn` permission; Family Admin also holds this permission).
- **Main actions:** Submit a check-in **(Assumption based on file naming; full body not enumerated here — see UpdateCareStatusPage for the caregiver equivalent)**.
- **Main information shown:** Check-in form fields.
- **Navigation links:** *(inferred back-navigation to Dashboard)*
- **Possible next screens:** Dashboard.

### Update Care Status — `UpdateCareStatusPage`
- **Purpose:** Let a caregiver formally log the loved one's current condition and the care actions performed.
- **Who can access it:** Caregiver (`updateCareStatus` permission; also Family Admin, who holds all permissions).
- **Main actions:** Select current state (Doing Well / Needs Attention / Immediate Help), write an optional observation, toggle care-action checkboxes (ate, medication, water, rested, needs attention), Save Update or Cancel.
- **Main information shown:** Modal-style card header ("How is [Loved One] doing?"), state selector, textarea, checkbox grid, a note that updates are shared with the Care Circle.
- **Navigation links:** Close (`X`) button; footer banner links back toward the Care Circle sharing context.
- **Possible next screens:** Returns to the previous screen (Dashboard or Loved One Status) on save/cancel.

### Medications — `MedicationsPage`
- **Purpose:** Central list of the loved one's active medications and their status.
- **Who can access it:** Family Admin and Caregiver (`viewMedication`/`editMedication`).
- **Main actions:** View schedule/status per medication; navigate to Add Medication.
- **Main information shown:** Medication list with dosage, schedule, and taken/next status.
- **Navigation links:** "Add Medication."
- **Possible next screens:** Add Medication, Medication Task Detail (not yet routed).

### Add Medication — `AddMedicationPage`
- **Purpose:** Register a new medication in the loved one's regimen.
- **Who can access it:** Family Admin (`editMedication` permission; Caregiver also holds this permission).
- **Main actions:** Fill out medication form fields, submit.
- **Main information shown:** Step-structured form (`StepHeader`-style pattern consistent with Invite Member).
- **Navigation links:** Back to Medications.
- **Possible next screens:** Medications (on success).

### Medication Task Detail — `MedicationTaskDetailPage`
- **Purpose (assumed):** Show details of a single scheduled medication task/dose.
- **Who can access it:** Caregiver / Family Admin (`viewMedicationTaskDetail` permission exists in the permission set).
- **Status:** File exists but is **empty** and **not wired into `app.routes.tsx`** — this screen is a planned/incomplete feature.

### Emergency Center — `EmergencyCenterPage`
- **Purpose:** Coordinate response to an active or potential emergency.
- **Who can access it:** Family Admin and Family Member (`manageEmergencyCenter`), rendered via `EmergencyRoutePage` when role is not Caregiver.
- **Main actions:** Mark "I'm responding," call the loved one, call the Family Admin, dispatch emergency services, open live location in maps, add a Care Circle member.
- **Main information shown:** Red alert banner (who needs help, priority, elapsed time), Alert Progress timeline (SOS triggered → caregiver notified → family notified → response pending), Live Location map, Immediate Actions, Active Care Circle presence, an Important Note (medical conditions to be aware of).
- **Navigation links:** "Open in Maps."
- **Possible next screens:** Care Circle, Loved One Profile.

### Emergency SOS — `EmergencySOSPage`
- **Purpose:** Caregiver-facing version of the same emergency event.
- **Who can access it:** Caregiver, rendered via `EmergencyRoutePage` when role is Caregiver, for both `emergency-center` and `emergency-sos` routes.
- **Main actions:** Same as Emergency Center — respond, call contacts, dispatch services.
- **Main information shown:** Same structural content as `EmergencyCenterPage` (this appears to be effectively the same screen serving the Caregiver route path — see Part 11, Duplicate Screens).
- **Navigation links:** Same as Emergency Center.
- **Possible next screens:** Care Circle, Loved One Status.

### Messages — `MessagesPage`
- **Purpose:** Shared communication channel for the Care Circle.
- **Who can access it:** All roles (`viewMessages` permission — held by Family Admin and Family Member explicitly; Caregiver does not hold `viewMessages` in the permission list, see Part 9 note).
- **Main actions:** Read/send messages **(inferred from page purpose and header)**.
- **Main information shown:** Message list/thread interface headed "Messages."
- **Navigation links:** *(inferred conversation selection)*
- **Possible next screens:** Individual conversation view (not present as a separate route).

### Notification Center — `NotificationCenterPage`
- **Purpose:** Full alert and notification management for the admin.
- **Who can access it:** Family Admin (`viewAlerts`), rendered via `NotificationsRoutePage`.
- **Main actions:** Review/manage notifications **(inferred from page purpose)**.
- **Main information shown:** Notification list, headed with an `h1`.
- **Navigation links:** *(inferred links into related alert sources — medication, emergency, care circle)*
- **Possible next screens:** Emergency Center, Medications, Care Circle.

### Caregiver Alerts — `CaregiverAlertsPage`
- **Purpose:** Show a caregiver what currently needs action and what has already been resolved.
- **Who can access it:** Caregiver.
- **Main actions:** Mark all as read; per-alert primary/secondary actions (e.g., "View Emergency"/"Dismiss," "Mark as Taken"/"Snooze 15m"); "Manage Circle."
- **Main information shown:** Active Alerts section (emergency and medication alert cards with time/location), Resolved Alerts section (completed items, Care Circle informed status).
- **Navigation links:** Implicit links to Emergency and Medication actions.
- **Possible next screens:** Emergency SOS, Medications.

### Family Member Alerts — `FamilyMemberAlertsPage`
- **Purpose:** Surface anything requiring a family member's attention, plus a lighter activity feed.
- **Who can access it:** Family Member.
- **Main actions:** Call the loved one, Notify Caregiver, View All updates.
- **Main information shown:** "Attention Required" card (e.g., missed check-in), Recent Updates feed (medication taken, check-in completed, caregiver update, device battery status), an empty/"all caught up" state.
- **Navigation links:** "View All."
- **Possible next screens:** Messages (Notify Caregiver), Loved One Profile (Call).

### Insights — `HealthInsightsPage`
- **Purpose:** Present trends and analysis of the loved one's health/care data over time.
- **Who can access it:** Family Admin (`viewInsights` is exclusive to Family Admin in the permission set).
- **Main actions:** Review charts/metrics **(inferred)**.
- **Main information shown:** Health insight sections headed by an `h2`.
- **Navigation links:** *(inferred)*
- **Possible next screens:** Loved One Profile, Activity Timeline.

### Activity Timeline — `CareActivityTimelinePage`
- **Purpose:** Chronological audit trail of everything that has happened in a care period.
- **Who can access it:** Caregiver (`viewActivityTimeline`; Family Admin also holds this permission).
- **Main actions:** Filter by Today/Yesterday/This Week, Filter by Type, Add Historical Event, View Full Profile.
- **Main information shown:** Timeline of medication confirmations, care notes, and wellness check-ins (with heart rate/blood pressure/mood metadata), a Today's Summary sidebar, and the loved one's status card.
- **Navigation links:** "View Full Profile" → Loved One Profile.
- **Possible next screens:** Loved One Profile.

### Profile (Admin) — `ProfilePage`
- **Purpose:** Manage the Family Admin's own account.
- **Who can access it:** Family Admin (default branch of `ProfileRoutePage`).
- **Main actions:** Account/profile management **(inferred; file delegates by role rather than defining unique admin content itself)**.
- **Main information shown:** Role-conditional rendering via `useMockUser`.
- **Navigation links:** *(inferred to Settings)*
- **Possible next screens:** Settings.

### Caregiver Profile — `CaregiverProfilePage`
- **Purpose:** Manage a caregiver's own account and see how their access is scoped.
- **Who can access it:** Caregiver.
- **Main actions:** Open Personal Information, Notifications, Password & Security, view WhatsApp connection status, Leave Care Circle.
- **Main information shown:** Header (photo, name, "Primary Caregiver" badge, assigned loved one), settings menu list, a Care Circle Access explainer noting access is managed by the Family Admin.
- **Navigation links:** Each settings row (chevron-based, targets not defined as separate routes).
- **Possible next screens:** *(none further routed — settings sub-pages are not implemented)*

### Family Member Profile — `FamilyMemberProfilePage`
- **Purpose:** Manage a family member's own account, Care Circle link, and preferences.
- **Who can access it:** Family Member.
- **Main actions:** View/manage Care Circle connection, toggle Notifications/WhatsApp/Quiet Hours, open Personal Information/Password & Security/Privacy, Leave Care Circle.
- **Main information shown:** Profile header (photo, name, "Family Member" label), Care Circle card, Preferences section, Account section.
- **Navigation links:** Chevron rows into account sub-settings (not separately routed).
- **Possible next screens:** *(none further routed)*

### Settings — `SettingsPage`
- **Purpose:** Application-wide configuration, shared across roles.
- **Who can access it:** All roles (`viewSettings`).
- **Main actions:** Adjust app-wide settings **(inferred from page purpose)**.
- **Main information shown:** Settings sections/list.
- **Navigation links:** *(inferred)*
- **Possible next screens:** *(terminal screen)*

---

## Part 4 — User Roles

### Family Admin

**Responsibilities**
- Owns and organizes the Care Circle
- Manages the loved one's full profile, medications, and health insights
- Invites and removes Caregivers and Family Members
- Coordinates the emergency response process

**Goals**
- Keep the loved one safe and well cared for
- Have full visibility into care activity across everyone involved
- Delegate day-to-day tasks to Caregivers while staying informed

**Permissions** (`rolePermissions.family-admin`)
`viewDashboard`, `viewCareCircle`, `manageCareCircle`, `viewMedication`, `editMedication`, `inviteMember`, `sendCheckIn`, `viewMessages`, `viewInsights`, `manageEmergencyCenter`, `viewSettings`, `viewLovedOneProfile`, `viewAlerts`, `viewProfile`, `viewActivityTimeline`, `viewLovedOneStatus`, `viewMedicationTaskDetail`, `updateCareStatus` — the Family Admin holds every permission in the system.

**Sidebar navigation**
Dashboard, Care Circle, Medication, Check-ins, Insights, Messages, and (bottom section) Emergency Center, Settings.

**Typical daily workflow**
1. Open Dashboard for the loved one's morning status.
2. Check Medications for adherence.
3. Review Insights for any concerning trends.
4. Check Messages/Notifications for updates from Caregivers or Family Members.
5. Manage Care Circle membership as needed (invite/remove people).
6. Respond immediately via Emergency Center if an alert fires.

### Family Member

**Responsibilities**
- Stay informed about the loved one's wellbeing
- Send check-ins and read care updates
- Escalate to the Caregiver or Family Admin if something looks wrong

**Goals**
- Peace of mind that the loved one is safe
- Low-friction visibility without needing to manage operational details

**Permissions** (`rolePermissions.family-member`)
`viewDashboard`, `sendCheckIn`, `viewMessages`, `viewSettings`, `viewLovedOneProfile`, `viewAlerts`, `viewProfile`, `viewLovedOneStatus`, `viewCareCircle`.

**Sidebar navigation**
Home, Care Circle, Loved One, Messages, Alerts, Profile, and (bottom section) Emergency Center, Settings.

**Typical daily workflow**
1. Open Home dashboard to see the loved one's mood/check-in and today's care metrics.
2. Review Recent Updates and Alerts for anything needing attention.
3. Visit Loved One profile for more detail if something stands out.
4. Send a check-in or message if reaching out directly.
5. Use Emergency Center only if an urgent situation arises.

### Caregiver

**Responsibilities**
- Administer and log medications on schedule
- Record the loved one's current wellness state
- Maintain the activity timeline with care notes
- Trigger or respond to emergencies directly

**Goals**
- Complete care tasks accurately and on time
- Keep the Family Admin and Family Members informed without extra effort
- Respond quickly if the loved one needs urgent help

**Permissions** (`rolePermissions.caregiver`)
`viewDashboard`, `viewMedication`, `editMedication`, `sendCheckIn`, `manageEmergencyCenter`, `viewLovedOneProfile`, `viewAlerts`, `viewProfile`, `viewActivityTimeline`, `viewLovedOneStatus`, `viewMedicationTaskDetail`, `updateCareStatus`. Notably, the Caregiver role does **not** include `viewCareCircle`, `viewMessages`, or `viewInsights` in the permission set (see Part 9 for the resulting access gaps against the sidebar).

**Sidebar navigation**
Today, Loved One, Activity, Alerts, Profile, and (bottom section) Emergency Center, Settings.

**Typical daily workflow**
1. Open "Today" to see the next medication due.
2. Mark medication as Taken / Remind Later / Unable to Take.
3. Log a care status update (Doing Well / Needs Attention / Immediate Help) with observations and care actions.
4. Check Loved One status cards and add care notes.
5. Review the Activity Timeline to confirm the day's log is complete.
6. Escalate via Emergency SOS if immediate help is required.

---

## Part 5 — Complete User Journey

### Shared Entry Journey (Family Admin path, as implemented)

```
Welcome
  ↓
Create Account
  ↓
Verify Email
  ↓
Care Circle Setup (Intro)
  ↓
Create Care Circle
  ↓
Setup Complete
  ↓
Dashboard
```

*(Note: per `AUTH.md`, a returning user goes Welcome → Login → into the Care Circle Setup flow rather than directly to Dashboard, because post-login redirect-to-dashboard is not yet implemented — see Part 11 for related notes.)*

---

## Family Admin Journey

```
Welcome
  ↓
Create Account
  ↓
Verify Email
  ↓
Care Circle Setup (Intro)
  ↓
Create Care Circle
  ↓
Setup Complete
  ↓
Invite Family (optional branch)
  ↓
Dashboard
  ↓
Add Medication
  ↓
View Health Insights
  ↓
Messages
  ↓
Emergency Center
  ↓
Settings
```

- **Welcome:** Landing page; chooses to register.
- **Create Account:** Registers name/email/password.
- **Verify Email:** Confirms identity via OTP.
- **Care Circle Setup (Intro):** Introductory screen before building the Care Circle.
- **Create Care Circle:** Enters the loved one's profile (name, relationship, age, medication status, check-in needs).
- **Setup Complete:** Confirms setup; can proceed to Dashboard or invite more people.
- **Invite Family:** Optionally invites Caregivers/Family Members before entering the dashboard.
- **Dashboard:** Lands on the admin overview.
- **Add Medication:** Registers medications for ongoing tracking.
- **View Health Insights:** Reviews trends to catch issues early.
- **Messages:** Checks in on Care Circle communication.
- **Emergency Center:** Available at any time if an alert fires.
- **Settings:** Adjusts account/app configuration.

---

## Family Member Journey

```
Invitation Email
  ↓
Accept Invitation (Family Member)
  ↓
Create Password
  ↓
Login
  ↓
Dashboard (Family Member)
  ↓
Loved One Profile
  ↓
Messages
  ↓
Alerts
  ↓
Profile
```

- **Invitation Email:** Receives an invite link with prefilled name/email query parameters.
- **Accept Invitation:** Lands on `FamilyMemberInvitationAcceptancePage`; details are prefilled from the URL.
- **Create Password:** Sets and confirms a password as part of the same acceptance form.
- **Login:** Authenticates for subsequent sessions.
- **Dashboard (Family Member):** Sees the loved one's status snapshot.
- **Loved One Profile:** Reviews fuller detail when something needs a closer look.
- **Messages:** Communicates with the rest of the Care Circle.
- **Alerts:** Reviews anything flagged as needing attention.
- **Profile:** Manages personal preferences and Care Circle link.

---

## Caregiver Journey

```
Invitation
  ↓
Accept Invitation (Caregiver)
  ↓
Verify Email
  ↓
Login
  ↓
Today's Dashboard
  ↓
Medication Tasks
  ↓
Update Care Status
  ↓
Activity Timeline
  ↓
Emergency SOS
  ↓
Profile
```

- **Invitation:** Receives an invite link with a token parameter.
- **Accept Invitation:** Lands on `CaregiverInvitationAcceptancePage`; invitation details are looked up by token. Fills name, password, accepts terms; sees a permission notice explaining that access is admin-managed.
- **Verify Email:** Per `AUTH.md`, submission of this form navigates to `VerifyEmailPage` next.
- **Login:** Authenticates for subsequent sessions.
- **Today's Dashboard:** Opens directly to the next required medication task.
- **Medication Tasks:** Marks medication Taken / Remind Later / Unable to Take.
- **Update Care Status:** Logs the loved one's current state and care actions performed.
- **Activity Timeline:** Confirms the day's actions are recorded; can add historical events.
- **Emergency SOS:** Used if the loved one needs urgent help, or to respond to an SOS.
- **Profile:** Reviews caregiver-specific account settings and Care Circle access scope.

---

## Part 6 — Navigation Map

### Family Admin
```
Dashboard
├── Care Circle
│   └── Invite Member
├── Medication
│   ├── Add Medication
│   └── Medication Task Detail (not yet routed)
├── Check-ins
│   └── Update Care Status
├── Insights
├── Messages
├── Notifications
├── Emergency Center
├── Profile
└── Settings
```

### Family Member
```
Dashboard (Home)
├── Care Circle
├── Loved One
├── Messages
├── Alerts (Notifications)
├── Emergency Center
├── Profile
└── Settings
```

### Caregiver
```
Dashboard (Today)
├── Loved One (Status)
│   └── Update Care Status
├── Activity
├── Alerts (Notifications)
├── Emergency SOS
├── Profile
└── Settings
```

---

## Part 7 — Screen Relationships

```
Dashboard
├── Loved One
│   ├── Medication
│   │   └── Add Medication
│   ├── Check-ins
│   │   └── Update Care Status
│   ├── Activity Timeline
│   └── Emergency Center / Emergency SOS
├── Care Circle
│   └── Invite Member
├── Messages
├── Notifications (Alerts)
│   ├── → Emergency Center / SOS (from emergency alerts)
│   └── → Medication (from medication alerts)
├── Insights
└── Profile
    └── Settings
```

Key relationships:
- **Loved One** is the hub most other operational screens branch from — medication, check-ins, activity, and emergency all reference the same loved-one context.
- **Notifications/Alerts** act as a router: each alert card's primary action leads into Emergency or Medication.
- **Care Circle** and **Invite Member** form a closed pair — invitation is only reachable from Care Circle (Family Admin).
- **Profile** and **Settings** are always reachable from the sidebar bottom section, independent of the main task flow.

---

## Part 8 — Feature Groups

**Dashboard**
- *Purpose:* Role-appropriate daily landing screen.
- *Screens:* `DashboardPage`, `FamilyMemberDashboardPage`, `CaregiverDashboardPage`, `RoleBasedDashboardPage` (router).
- *Related features:* Loved One, Medication, Check-ins (all summarized here).

**Care Circle**
- *Purpose:* Manage who is involved in the loved one's care.
- *Screens:* `CareCirclePage`, `FamilyMemberCareCirclePage`, `InviteMemberPage`, `CareCircleRoutePage` (router).
- *Related features:* Profile (Leave Care Circle action), Emergency (Active Care Circle panel).

**Loved One**
- *Purpose:* Central profile and status record for the person being cared for.
- *Screens:* `LovedOneProfilePage`, `FamilyMembersDesktopLovedOneScreenPage`, `LovedOneStatusScreenPage`, `LovedOneRoutePage` (router).
- *Related features:* Medication, Check-ins, Activity Timeline, Emergency, Care Circle.

**Medication**
- *Purpose:* Track and log the medication regimen.
- *Screens:* `MedicationsPage`, `AddMedicationPage`, `MedicationTaskDetailPage` (unrouted).
- *Related features:* Dashboard (Caregiver's primary task), Activity Timeline, Alerts.

**Check-ins**
- *Purpose:* Capture the loved one's current wellness state.
- *Screens:* `CheckInPage`, `UpdateCareStatusPage`.
- *Related features:* Loved One (state cards), Activity Timeline, Alerts.

**Activity Timeline**
- *Purpose:* Chronological audit of everything logged for the day/period.
- *Screens:* `CareActivityTimelinePage`.
- *Related features:* Medication, Check-ins, Loved One.

**Emergency**
- *Purpose:* Coordinate urgent response.
- *Screens:* `EmergencyCenterPage`, `EmergencySOSPage`.
- *Related features:* Care Circle (notification fan-out), Alerts, Loved One.

**Messages**
- *Purpose:* Care Circle communication.
- *Screens:* `MessagesPage`, `MessagesRoutePage` (router), `FamilyMembersMessagePage` (unrouted placeholder).
- *Related features:* Alerts (e.g., "Notify Caregiver" action), Care Circle.

**Notifications**
- *Purpose:* Surface anything needing attention, filtered by role.
- *Screens:* `NotificationCenterPage`, `CaregiverAlertsPage`, `FamilyMemberAlertsPage`, `AlertsPage` (alternate router), `NotificationsRoutePage` (router).
- *Related features:* Emergency, Medication, Messages.

**Insights**
- *Purpose:* Health trend reporting.
- *Screens:* `HealthInsightsPage`.
- *Related features:* Loved One, Activity Timeline.

**Profile**
- *Purpose:* Individual account management.
- *Screens:* `ProfilePage`, `CaregiverProfilePage`, `FamilyMemberProfilePage`, `ProfileRoutePage` (router).
- *Related features:* Settings, Care Circle (Leave Care Circle).

**Settings**
- *Purpose:* Application-wide configuration.
- *Screens:* `SettingsPage`.
- *Related features:* Profile.

---

## Part 9 — Role Access Matrix

Based on `rolePermissions` in `permissions.ts`. ✓ = permission granted (Full Access), — = permission not granted (No Access). Because the codebase's permission model is binary (a role either has a permission or doesn't — there is no partial/read-only permission level defined), no screens are marked **R** or **L** below; those columns are reserved for future refinement if the product introduces scoped access.

| Screen / Capability | Family Admin | Family Member | Caregiver |
|---|:---:|:---:|:---:|
| Dashboard | ✓ | ✓ | ✓ |
| Care Circle (view) | ✓ | ✓ | — |
| Care Circle (manage/invite) | ✓ | — | — |
| Loved One Profile / Status | ✓ | ✓ | ✓ |
| Medication (view) | ✓ | — | ✓ |
| Medication (add/edit) | ✓ | — | ✓ |
| Medication Task Detail | ✓ | — | ✓ |
| Check-ins (send) | ✓ | ✓ | ✓ |
| Update Care Status | ✓ | — | ✓ |
| Insights | ✓ | — | — |
| Activity Timeline | ✓ | — | ✓ |
| Messages | ✓ | ✓ | — |
| Notifications / Alerts | ✓ | ✓ | ✓ |
| Emergency Center / SOS | ✓ | — | ✓ |
| Profile | ✓ | ✓ | ✓ |
| Settings | ✓ | ✓ | ✓ |

**Notable gaps surfaced by this matrix (documented as-is, not redesigned):**
- The Caregiver's sidebar does not include a Care Circle or Messages link (consistent with the permission set), so Caregivers have no in-app path to view the roster or use Messages even though other roles do.
- The Family Member's sidebar includes "Emergency Center," and the permission set does grant `manageEmergencyCenter` in the sidebar config — but `manageEmergencyCenter` is **not** listed among Family Member's permissions in `permissions.ts`. This is a mismatch between `sidebar.ts` (which shows the link to everyone) and `permissions.ts` (which would block a direct `ProtectedRoute` check) — flagged here as an inconsistency in the current implementation, not a designed behavior.

---

## Part 10 — Recommended User Flow

*(Proposed ordering through existing screens only — no new screens invented.)*

**First-time Family Admin**
1. Welcome → Create Account → Verify Email
2. Care Circle Setup (Intro) → Create Care Circle
3. Setup Complete → Invite Family (caregiver + family members)
4. Dashboard → Add Medication → Insights

*Why:* A first-time admin needs the loved one's profile to exist before anything else is useful, and inviting the Care Circle immediately means Caregivers can start logging care right away rather than the admin working alone. Medication setup follows because it is the most frequent recurring task other roles depend on.

**Returning Family Admin**
1. Login → Dashboard
2. Notifications (check anything missed) → Messages
3. Loved One Profile / Insights as needed

*Why:* A returning admin's first need is "what happened since I was last here" — the dashboard and notifications answer that immediately, before deeper review screens.

**Family Member**
1. Accept Invitation → Login
2. Dashboard (Family Member) → Alerts
3. Loved One Profile (only if something needs a closer look) → Messages

*Why:* Family Members want reassurance with minimal effort; the dashboard and alerts cover that in two screens, with deeper detail only a click away when actually needed.

**Caregiver**
1. Accept Invitation → Verify Email → Login
2. Today's Dashboard (immediate task) → Update Care Status
3. Activity Timeline (confirm logging) → Loved One Status

*Why:* A caregiver's day is task-driven. Starting on the single most urgent action (the next medication) rather than a general overview reduces friction and matches how `CaregiverDashboardPage` is already built — as a single-task hero screen rather than a dashboard of widgets.

---

## Part 11 — Notes

### Duplicate Screens

- **`/dashboard/*` and `/app/*`** — `app.routes.tsx` defines the *entire* dashboard route tree twice, once under `/app/*` and once under `/dashboard/*`, pointing at the exact same page components. These are not different screens but a duplicated route mount; they should be treated as one feature with two entry paths (and ideally consolidated to avoid maintenance drift).
- **Emergency Center vs. Emergency SOS** — `EmergencyRoutePage` serves `EmergencySOSPage` to Caregivers and `EmergencyCenterPage` to everyone else, for *both* the `emergency-center` and `emergency-sos` URL paths. Structurally these two pages present the same information (alert banner, progress timeline, live location, immediate actions, Care Circle, important note) with different framing/copy for the caregiver audience. They should remain one logical feature ("Emergency") with a caregiver-specific presentation, not two separate features.
- **`AlertsPage` and `NotificationsRoutePage`** — Two separate router components (`AlertsPage.tsx` and `NotificationsRoutePage.tsx`) both exist to select between `CaregiverAlertsPage`, `FamilyMemberAlertsPage`, and (in `NotificationsRoutePage` only) `NotificationCenterPage`. Only `NotificationsRoutePage` is wired into the route tree; `AlertsPage` is a redundant, unused duplicate of the same routing logic and should be treated as one "Notifications/Alerts" feature.
- **`LovedOneStatusScreenPage`** is reachable at two routes (`/dashboard/loved-one` for Caregivers via `LovedOneRoutePage`, and directly at `/dashboard/loved-one/status`) — same screen, two paths into it.

### Shared Screens

The following should be understood as one shared feature per route, with role-based content variation rather than separate products:

- **Messages** — one route (`/dashboard/messages`) currently serves the same `MessagesPage` to all roles (no role-branching router exists here, unlike Profile/Notifications/Care Circle/Loved One). If Caregiver-specific messaging behavior is intended, it is not yet implemented — Caregivers can reach this route by URL even though it is absent from their sidebar.
- **Profile** — shared route, three role-specific components (`ProfilePage`, `CaregiverProfilePage`, `FamilyMemberProfilePage`) selected by `ProfileRoutePage`. Each keeps the same route and purpose (manage my account) while adapting content to what's relevant for that role (e.g., "Care Circle Access" framing for Caregivers vs. "Leave Care Circle" for Family Members).
- **Notifications** — shared route, three role-specific components selected by `NotificationsRoutePage`, adapting urgency framing (Caregiver: active/resolved task alerts; Family Member: attention-required + recent updates; Family Admin: full notification center).
- **Settings** — single shared component (`SettingsPage`) across all roles; no role branching currently exists, so it presumably shows the same content to everyone today.
- **Emergency** — shared routes (`emergency-center`, `emergency-sos`), role-branched by `EmergencyRoutePage` (Caregiver gets `EmergencySOSPage`; others get `EmergencyCenterPage`).
- **Care Circle** and **Loved One** — both shared routes, role-branched by their respective `RoutePage` components as described above.

Keeping these as single routes with role-conditional rendering (the pattern already used for Care Circle, Loved One, Notifications, Profile, and Emergency) is consistent with how the rest of the app is structured, and is the recommended approach for any screen that currently lacks this branching (e.g., Messages, Settings) if role-specific content is ever required there.

### Other Implementation Notes (observed, not design recommendations)

- `MedicationTaskDetailPage.tsx` and `FamilyMembersLovedOnePage.tsx` are empty files with no exported component and are not referenced by any route.
- `FamilyMemberHomeDesktopOverviewPage.tsx` and `FamilyMembersMessagePage.tsx` are explicitly marked as placeholder pages in their own source ("Placeholder page for the new ... screen") and are not wired into the route tree.
- The invitation-acceptance pages (`CaregiverInvitationAcceptancePage`, `FamilyMemberInvitationAcceptancePage`, `MemberAccessReadyPage`) exist as fully built pages but have no corresponding entries in `invitation.routes.tsx` — per `AUTH.md`, they are intended to live at `/member/caregiver-invite` and `/member/family-invite`, but those routes are not currently registered in the router.