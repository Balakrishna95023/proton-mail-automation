# Proton Mail Automation Assessment — Defect / Findings Report

Exploratory testing across the full flow (sign-in through every mailbox menu) surfaced one genuine, reproducible product defect, documented as DEF-001 below. No other product defects were found across the complete flow — everything else observed during this assessment is an automation/environment finding (Section 4), not a product defect.

### DEF-001 — No message count shown against Inbox/Drafts/Sent/Starred/Archive (and other) menu items

**Environment**
- Browser: Chromium (Desktop Chrome), consistent with the automation environment used elsewhere in this assessment
- OS: `<Windows/Linux/macOS — fill in the machine used for exploratory testing>`
- Viewport: 1440 x 900
- Application/build/date: Proton Mail Web, observed `<YYYY-MM-DD>`

**Severity / Priority**
- Severity: Low
- Priority: P3
- Reason: Purely a usability/informational gap — it does not block sending, receiving, organizing, or any other core mail workflow. Impact is discoverability: users can't tell at a glance how many messages (or unread messages) sit in Inbox, Drafts, Sent, Starred, Archive, etc. without opening each folder, which is a convention most mail clients (including Proton's own mobile/desktop apps) otherwise follow.

**Preconditions**
1. A valid Proton Mail account with messages in more than one folder (Inbox, Drafts, Sent, Starred, Archive) is available.

**Steps to Reproduce**
1. On the Proton Mail sign-in page, enter a valid username and password.
2. Click the submit button to log in.
3. Click the mail icon to open Proton Mail.
4. Check each of the left-hand menu items (Inbox, Drafts, Sent, Starred, Archive, and other folders/labels).

**Expected**
Each menu item shows a count (total and/or unread) next to its label, so the number of messages in each folder is visible without opening it.

**Actual**
No count is displayed next to any of the menu items (Inbox, Drafts, Sent, Starred, Archive, etc.); the folder must be opened to see how many messages it contains.

**Evidence**
- Screenshot: `![alt text](image.png)`
- Trace: n/a (manual exploratory finding, not part of the automated suite)
- Logs: n/a

**Reproducibility**
Always

**Classification**
`Product defect`