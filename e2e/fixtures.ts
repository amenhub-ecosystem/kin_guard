import { test as base, expect, type ConsoleMessage, type Page } from '@playwright/test';

type ConsoleAllowPattern = string | RegExp;

export interface MockApiRequestLogEntry {
  method: string;
  path: string;
  body: unknown;
  status: number;
  response: unknown;
  timestamp: number;
}

function matchesAllowPattern(text: string, patterns: ConsoleAllowPattern[]) {
  return patterns.some((pattern) =>
    typeof pattern === 'string' ? text.includes(pattern) : pattern.test(text),
  );
}

export const test = base.extend<{
  allowConsoleMessages: ConsoleAllowPattern[];
  getMockRequestLog: () => Promise<MockApiRequestLogEntry[]>;
  clearMockRequestLog: () => Promise<void>;
  expectFieldError: (fieldName: string, exactText: string) => Promise<void>;
}>({
  allowConsoleMessages: [],

  page: async ({ page, allowConsoleMessages }, use) => {
    const unexpected: string[] = [];
    const responseFailures: string[] = [];

    const consoleListener = (message: ConsoleMessage) => {
      const type = message.type();
      if (type !== 'error' && type !== 'warning') return;
      const text = message.text();
      if (!matchesAllowPattern(text, allowConsoleMessages)) {
        unexpected.push(`${type}: ${text}`);
      }
    };

    const pageErrorListener = (error: Error) => {
      const text = error.message;
      if (!matchesAllowPattern(text, allowConsoleMessages)) {
        unexpected.push(`pageerror: ${text}`);
      }
    };

    page.on('console', consoleListener);
    page.on('pageerror', pageErrorListener);
    page.on('response', async (response) => {
      if (response.status() >= 500) {
        const url = response.url();
        let body = '<unable to read body>';
        try {
          body = await response.text();
        } catch {
          // ignore
        }
        responseFailures.push(`${response.status()} ${url} ${body}`);
      }
    });

    await use(page);

    if (unexpected.length > 0) {
      throw new Error(`Unexpected console output during test:\n${unexpected.join('\n')}`);
    }

    if (responseFailures.length > 0) {
      throw new Error(`Unexpected HTTP 5xx responses during test:\n${responseFailures.join('\n')}`);
    }
  },

  getMockRequestLog: async ({ page }, use) => {
    await use(async () => {
      return page.evaluate(() => {
        return (window as any).__kinGuardMockApi?.__getRequestLog?.() ?? [];
      }) as Promise<MockApiRequestLogEntry[]>;
    });
  },

  clearMockRequestLog: async ({ page }, use) => {
    await use(async () => {
      await page.evaluate(() => {
        return (window as any).__kinGuardMockApi?.__clearRequestLog?.();
      });
    });
  },

  expectFieldError: async ({ page }, use) => {
    await use(async (fieldName: string, exactText: string) => {
      const field = page.locator(`input[name="${fieldName}"], textarea[name="${fieldName}"], select[name="${fieldName}"]`);
      await expect(field).toBeVisible();
      const describedBy = await field.getAttribute('aria-describedby');
      expect(describedBy).toBeTruthy();
      const errorLocator = page.locator(`#${describedBy}`);
      await expect(errorLocator).toHaveText(exactText);
    });
  },
});

export { expect };
