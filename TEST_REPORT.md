# Proton Mail Automation Assessment — Test Report

## 1. Execution Summary

> Results below are taken directly from the Playwright HTML reports already included in this repository (`reports.zip`), decoded from their embedded report data. The suite was run as nine separate category executions (one per functional area) rather than a single `npx playwright test` invocation, so "Duration" is the sum across those runs rather than one wall-clock run. Re-run `npx playwright test` locally and replace this table if a single full-suite run is required for submission.

| Item | Result |
|---|---|
| Application | Proton Mail Web |
| Automation framework | Playwright Test (`@playwright/test` ^1.62.1) |
| Language | JavaScript |
| Planned automated scenarios | 19 |
| Browser | Chromium / Desktop Chrome |
| Execution date | 2026-09-04 |
| Environment | Node.js (per README prerequisite: 18+), Playwright 1.62.1, headless: false, viewport 1440×900 |
| Total executed | 19 |
| Passed | 19 |
| Failed | 0 |
| Skipped | 0 |
| Duration (summed across the 9 category runs) | ~7 min 9 s (428.6 s) |
| Overall status | **PASS** |

## 2. Execution Command

Full suite:

```bash
npx playwright test
```

Headed sanity run:

```bash
npx playwright test --headed
```

HTML report:

```bash
npx playwright show-report reports/html
```

The results below came from unzipping `reports.zip` and reading each `reports/results <area>/index.html` report.

## 3. Scenario Results

| ID | Scenario | Status | Duration | Evidence / Notes |
|---|---|---|---|---|
| AUTH-001 | Valid login | PASS | 13.6 s | `reports/results authentication/index.html` |
| AUTH-002 | Invalid login | PASS | 9.1 s | `reports/results authentication/index.html` |
| MAIL-001 | Valid send | PASS | 34.1 s | `reports/results compose and send/index.html` |
| MAIL-002 | CC/BCC | PASS | 47.9 s | `reports/results compose and send/index.html` |
| MAIL-003 | Invalid recipient | PASS | 37.1 s | `reports/results compose and send/index.html` |
| DRAFT-001 | Auto-save draft | PASS | 19.8 s | `reports/results draft persistence/index.html` |
| DRAFT-002 | Draft persistence/reopen | PASS | 20.4 s | `reports/results draft persistence/index.html` |
| INBOX-001 | Read/unread | PASS | 18.2 s | `reports/results inbox/index.html` |
| INBOX-002 | Star/unstar | PASS | 10.8 s | `reports/results inbox/index.html` |
| INBOX-003 | Archive | PASS | 10.5 s | `reports/results inbox/index.html` |
| INBOX-004 | Delete/restore | PASS | 47.1 s | `reports/results inbox/index.html` |
| FOLDER-001 | Apply label | PASS | 16.6 s | `reports/results label/index.html` |
| SEARCH-001 | Keyword/sender search | PASS | 14.3 s | `reports/reuslts search/index.html` *(note: folder is misspelled "reuslts" in the zip)* |
| SEARCH-002 | Advanced search | PASS | 15.7 s | `reports/reuslts search/index.html` |
| FILTER-001 | Create/verify filter | PASS | 15.5 s | `reports/results filters/index.html` |
| ASYNC-001 | Undo Send | PASS | 25.2 s | `reports/results send or undo send mail/index.html` |
| ASYNC-002 | Schedule email | PASS | 27.4 s | `reports/results send or undo send mail/index.html` |
| ATTACH-001 | Send attachment | PASS | 23.0 s | `reports/results attachments/index.html` |
| ATTACH-002 | Draft attachment persistence | PASS | 22.3 s | `reports/results attachments/index.html` |

19/19 scenarios passed, 0 failed, 0 skipped, across all nine report bundles.

## 4. Failure Evidence

No failures were present in the bundled reports. If a future run produces a failure, capture for each failed test:
- Screenshot
- Trace, when enabled
- Playwright error and call log
- Relevant console/network information where useful
- Exact test data and preconditions

| Test | Failure | Root Cause | Evidence | Classification |
|---|---|---|---|---|
| `<ID>` | `<failure summary>` | `<root cause>` | `<trace/screenshot>` | `<product defect / test issue / environment issue>` |

## 5. Observations

During development, an authentication/session-expiry state was encountered while debugging the suite. This is treated as an **automation/environment risk**, not automatically as a product defect (see `DEFECT_REPORT.md`, FIND-001). The framework uses Playwright storage state and the authentication setup project to reduce repeated UI login.

Two additional automation/environment findings were identified during a repository review on 2026-09-05, unrelated to the test results above but relevant to submission readiness: a committed `.env` file containing real credentials (FIND-002), and a possible account mismatch in `auth.setup.js` between the `RECEIVER_EMAIL` credentials used to log in and the `.auth/sender.json` file that session is saved to (FIND-003). See `DEFECT_REPORT.md` for details.

The category-level reports were generated at different times between 18:39 and 19:27 UTC on 2026-09-04, rather than in one full-suite execution — worth doing a single `npx playwright test` run before final submission so the report reflects one coherent execution.

## 6. Conclusion

Based on the bundled `reports.zip`, the last recorded execution of all 19 automated scenarios passed (19/19) on 2026-09-04, split across nine category runs. Before final submission, re-run the complete suite with `npx playwright test` in one pass, resolve the `.env` and `auth.setup.js` findings above, and replace this report with that single run's results if a strict "one full-suite execution" report is required.
