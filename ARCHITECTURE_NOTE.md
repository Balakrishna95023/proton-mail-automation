# Proton Mail Automation Assessment — Architecture Note

## 1. Objective

The framework is designed as a small, production-minded Playwright automation suite that prioritizes maintainability, reliable synchronization, meaningful assertions, and clear separation between test intent and UI implementation.

## 2. Architecture

```text
                    Playwright Test Runner
                             |
                +------------+------------+
                |                         |
          Authentication             Test Specs
          setup project          (business scenarios)
                |                         |
                v                         v
       .auth/sender.json          Page Objects / Actions
                                          |
                         +----------------+----------------+
                         |                |                |
                    LoginPage       ComposePage       InboxPage
                         |                |                |
                         +----------------+----------------+
                                          |
                                   Proton Mail Web
```

## 3. Project Structure

```text
proton-mail-automation/
├── pages/
│   ├── LoginPage.js
│   ├── ComposePage.js
│   ├── DraftsPage.js
│   ├── InboxPage.js
│   ├── SearchPage.js
│   ├── FilterPage.js
│   └── ScheduledPage.js
├── tests/
│   ├── auth.setup.js
│   ├── auth.spec.js
│   ├── compose.spec.js
│   ├── drafts.spec.js
│   ├── inbox.spec.js
│   ├── folders.spec.js
│   ├── search.spec.js
│   ├── filters.spec.js
│   ├── async.spec.js
│   └── attachments.spec.js
├── test-data/
│   ├── mailData.json
│   └── sample.txt
├── .auth/
├── playwright.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

`ScheduledPage.js` backs the scheduling assertions used inside `async.spec.js` (ASYNC-002); there is no separate `scheduled.spec.js` file — scheduling is a scenario within the async spec, consistent with treating it as an asynchronous/state-dependent workflow rather than its own category.

## 4. Page Object Model

Application-specific locators and reusable actions are encapsulated in page objects.

Example test intent:

```javascript
const subject = await inboxPage.getFirstMessageSubject();
await inboxPage.starMessage(subject);
```

This keeps tests focused on business behavior instead of DOM implementation details. Assertions live on the page objects too (e.g. `expectMessageStarred`, `expectMessageNotInInbox`), so spec files stay free of raw `expect()` calls — confirmed across all 9 spec files.

## 5. Authentication Design

Authentication is separated from normal tests.

The setup project (`tests/auth.setup.js`):
1. Opens Proton Mail.
2. Logs in using environment-provided credentials.
3. Verifies successful authentication.
4. Saves browser storage state to `.auth/sender.json`.

The main Chromium project consumes this state through Playwright `storageState`.

This avoids logging in through the UI before every test and improves execution time.

**Open item:** in the current implementation, `auth.setup.js` logs in with `RECEIVER_EMAIL` / `RECEIVER_PASSWORD`, and that session is what gets written to `.auth/sender.json`. If the intent was for the sender account to run the main suite, this should be corrected to `SENDER_EMAIL` / `SENDER_PASSWORD` before final submission; if the two-account model works differently than the naming suggests, the README/architecture note should say so explicitly so another engineer isn't misled by the file name.

## 6. Synchronization

The framework uses Playwright's auto-waiting and explicit state assertions.

Preferred patterns include:

```javascript
await expect(locator).toBeVisible();
```

and state-based waits/assertions.

Unnecessary fixed sleeps such as:

```javascript
await page.waitForTimeout(5000);
```

are avoided — confirmed by inspection: `waitForTimeout` does not appear anywhere in `tests/` or `pages/` except as an explanatory comment in `async.spec.js`.

Asynchronous workflows use observable UI state rather than arbitrary delays wherever possible.

## 7. Test Isolation and Parallelism

Independent test files can be distributed across Playwright workers (`fullyParallel: true` in `playwright.config.js`).

Where tests inside a file require ordering, serial mode is used — currently only in `tests/inbox.spec.js`:

```javascript
test.describe.configure({ mode: 'serial' });
```

Important limitation: serial mode controls execution order; it does not automatically share browser state between tests. Each test still receives Playwright's normal isolated context unless a deliberate shared fixture is introduced.

## 8. Locator Strategy

The preferred locator order is:
1. Stable `data-testid` attributes.
2. Accessible roles/names.
3. User-facing labels/text where stable.
4. CSS selectors when appropriate.
5. XPath only when necessary for relationships not conveniently expressed otherwise.

Long generated DOM paths are avoided because they are highly coupled to implementation details. In practice, the page objects mostly follow this: `getByRole`/`getByText`/`getByLabel` dominate (e.g. `LoginPage`, most of `ComposePage`). A few locators fall back to XPath even for `data-testid` attributes (e.g. `page.locator('//*[contains(@data-testid,"composer:close-button")]')` in `ComposePage.js`) where Playwright's `getByTestId()` would be more consistent with the stated priority order — a small cleanup opportunity rather than a structural issue.

## 9. Assertions

Assertions validate application state, not merely that a click was possible.

Examples:
- Message appears in the expected folder.
- Draft data persists after reopening.
- Message star state changes.
- Invalid recipient prevents an incorrect send.
- Scheduled message appears in the scheduled state.
- Attachment remains associated with a draft.

## 10. Reporting and Diagnostics

Playwright HTML reporting is used for readable execution results, configured to output to `reports/html` in `playwright.config.js`.

Failure evidence configured in `playwright.config.js`:
- Screenshots: `only-on-failure`
- Video: `retain-on-failure`
- Trace: `retain-on-failure`

The objective is to make failures actionable for another QA engineer.

## 11. Configuration and Security

Credentials are supplied through environment variables rather than source code, loaded via `dotenv` in `playwright.config.js`.

**This is currently not enforced by `.gitignore`:** `.env` is not listed alongside `.auth/`, `test-results/`, `playwright-report/`, `reports/`, and `screenshots/`, and it is present in the repository history with real account credentials. This needs to be fixed (add `.env` to `.gitignore`, remove it from git history, rotate the credentials) before the repository is treated as a clean submission — see `DEFECT_REPORT.md` (FIND-002).

## 12. Scalability to 200+ Tests

To scale:
- Keep page objects focused on reusable application behavior.
- Introduce component objects for repeated UI components.
- Centralize selectors and test-data builders.
- Use fixtures for authenticated roles and common setup.
- Separate smoke, regression, and feature suites using tags/projects.
- Prefer API/direct-data setup where safe and available.
- Keep tests independent and deterministic.
- Avoid duplicating business workflows across specs.

## 13. Key Design Trade-offs

The framework favors a focused set of reliable end-to-end tests over a large number of brittle scripts. Some broad exploratory, visual, accessibility, and long-running time-dependent checks are intentionally left outside the core automated regression suite.
