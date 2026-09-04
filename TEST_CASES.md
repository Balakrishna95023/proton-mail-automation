# Proton Mail Automation Assessment — Test Cases

All 19 IDs below exist as implemented tests with matching titles, and the file/category mapping in Section 2 matches `auth.spec.js`, `compose.spec.js`, `drafts.spec.js`, `inbox.spec.js`, `folders.spec.js`, `search.spec.js`, `filters.spec.js`, `async.spec.js`, and `attachments.spec.js`. No changes were needed to the matrix itself.

## 1. Test Strategy

### Scope
The suite focuses on high-value end-to-end Proton Mail Web workflows across authentication, compose/send, drafts, inbox/message actions, folders/labels, search, filters, asynchronous workflows, and attachments.

The assessment requires approximately 15–20 high-value automated scenarios and minimum category coverage. This suite contains 19 selected scenarios.

### Prioritization
- **P0 — Critical:** Core functionality or a failure that blocks a major user journey.
- **P1 — High:** Significant functionality with high business/user impact.
- **P2 — Medium:** Useful regression coverage with lower immediate risk.
- **P3 — Low:** Edge/cosmetic/low-risk coverage.

### Automation classification
- **Automate:** Stable, repeatable, high-value regression coverage.
- **Manual / Exploratory:** Human observation or changing behavior provides more value.
- **Not worth automating:** Low-value, brittle, redundant, or expensive-to-maintain checks.

### Key risks
- UI changes can affect locators.
- Mailbox state can create test-data collisions.
- Authentication/session expiry can interrupt execution.
- Asynchronous mail operations depend on eventual UI state.
- Parallel tests can interfere when they modify the same mailbox.

### Test level
Primarily end-to-end UI testing using Playwright Test.

### Test-data approach
Repeatable test data is parameterized in `test-data/mailData.json` (subjects/bodies for valid send, CC/BCC, and invalid-recipient scenarios) and `test-data/sample.txt` (the attachment fixture). Unique subjects can be generated using a timestamp to reduce collisions during parallel execution.

### Key exclusions
The assessment suite does not attempt to exhaustively cover every Proton Mail feature. Security-sensitive flows requiring special account configuration, exhaustive browser/device combinations, visual/cosmetic testing, and long-running time-dependent scenarios are better suited to targeted manual/exploratory or separate specialized suites.

## 2. Detailed Test Case Matrix

## 1. Authentication

### AUTH-001 – Login with Valid Credentials

**Priority:** P0  
**Classification:** Automate

**Description:**  
Verify that a registered user can successfully log in to Proton Mail using valid credentials.

**Preconditions:**
- A valid Proton Mail account is available.
- The application is accessible.
- The user is currently logged out.

**Test Steps:**
1. Navigate to the Proton Mail login page.
2. Enter a valid email address.
3. Enter the corresponding valid password.
4. Click the **Sign in** button.
5. Wait for the mailbox to load.

**Expected Result:**  
The user should be successfully authenticated and redirected to the Proton Mail mailbox. The inbox and authenticated user interface should be visible.

---

### AUTH-002 – Login with Invalid Credentials

**Priority:** P1  
**Classification:** Automate

**Description:**  
Verify that Proton Mail prevents authentication when invalid login credentials are provided.

**Preconditions:**
- The Proton Mail login page is accessible.
- Invalid credentials are available for testing.

**Test Steps:**
1. Navigate to the login page.
2. Enter an invalid email address or password.
3. Click **Sign in**.
4. Observe the authentication response.

**Expected Result:**  
The login attempt should fail and an appropriate authentication error should be displayed. The user should not be granted access to the mailbox.

---

## 2. Compose and Send

### MAIL-001 – Send Email to a Valid Recipient

**Priority:** P0  
**Classification:** Automate

**Description:**  
Verify that an authenticated user can compose and successfully send an email to a valid recipient.

**Preconditions:**
- User is logged in.
- A valid recipient email address is available.

**Test Steps:**
1. Open the **Compose** window.
2. Enter a valid recipient.
3. Enter a unique subject.
4. Enter the email body.
5. Click **Send**.
6. Verify the send confirmation.
7. Verify the sent message from the **Sent** folder if required.

**Expected Result:**  
The email should be successfully sent to the recipient and the appropriate success/send confirmation should be displayed.

---

### MAIL-002 – Send Email with CC and BCC Recipients

**Priority:** P1  
**Classification:** Automate

**Description:**  
Verify that an email can be composed and sent successfully with recipients added to the **CC** and **BCC** fields.

**Preconditions:**
- User is logged in.
- Valid recipient, CC, and BCC email addresses are available.

**Test Steps:**
1. Open the **Compose** window.
2. Enter the primary recipient.
3. Add a recipient in the **CC** field.
4. Add a recipient in the **BCC** field.
5. Enter the subject and message body.
6. Send the email.
7. Verify that the email is successfully sent.

**Expected Result:**  
The email should be sent successfully with the configured To, CC, and BCC recipients.

---

### MAIL-003 – Send Email with Invalid Recipient

**Priority:** P1  
**Classification:** Automate

**Description:**  
Verify that the compose window validates an incorrectly formatted recipient email address and prevents an invalid message from being sent.

**Preconditions:**
- User is logged in.

**Test Steps:**
1. Open the **Compose** window.
2. Enter an invalid email address.
3. Enter a subject and message.
4. Attempt to send the email.

**Expected Result:**  
The application should identify the invalid recipient and prevent the email from being sent until the recipient information is corrected.

---

## 3. Draft and Persistence

### DRAFT-001 – Verify Automatic Draft Saving

**Priority:** P1  
**Classification:** Automate

**Description:**  
Verify that Proton Mail automatically saves an email being composed as a draft.

**Preconditions:**
- User is logged in.

**Test Steps:**
1. Open the **Compose** window.
2. Enter a recipient.
3. Enter a unique subject.
4. Enter some message content.
5. Wait for the draft to be automatically saved.
6. Close the compose window.
7. Navigate to **Drafts**.

**Expected Result:**  
The composed email should appear in the Drafts folder with the entered recipient, subject, and message content preserved.

---

### DRAFT-002 – Verify Draft Persistence After Reopening

**Priority:** P1  
**Classification:** Automate

**Description:**  
Verify that information stored in a draft remains available when the draft is reopened.

**Preconditions:**
- A draft containing recipient, subject, and body content exists.

**Test Steps:**
1. Navigate to the **Drafts** folder.
2. Locate the previously created draft.
3. Open the draft.
4. Verify the recipient.
5. Verify the subject.
6. Verify the message body.

**Expected Result:**  
All previously entered draft information should remain intact after reopening the draft.

---

## 4. Inbox and Organization

### INBOX-001 – Mark Email as Read/Unread

**Priority:** P1  
**Classification:** Automate

**Description:**  
Verify that a user can change the read/unread state of an email from the inbox.

**Preconditions:**
- User is logged in.
- At least one email is available in the inbox.

**Test Steps:**
1. Locate an email in the inbox.
2. Open or select the email.
3. Verify that it becomes read.
4. Perform the action to mark the email as unread.
5. Verify the resulting state.

**Expected Result:**  
The email should correctly transition between **Read** and **Unread** states, and the inbox UI should reflect the current state.

---

### INBOX-002 – Star and Unstar an Email

**Priority:** P1  
**Classification:** Automate

**Description:**  
Verify that an email can be added to and removed from the user's starred messages.

**Preconditions:**
- User is logged in.
- An email is available in the inbox.

**Test Steps:**
1. Locate an email.
2. Select the star action for the email.
3. Verify that the email is marked as starred.
4. Select the star action again.
5. Verify that the email is no longer starred.

**Expected Result:**  
The email should correctly transition between starred and unstarred states.

---

### INBOX-003 – Archive an Email

**Priority:** P1  
**Classification:** Automate

**Description:**  
Verify that a user can archive an email and that the email is removed from the inbox while remaining accessible through the appropriate mailbox location.

**Preconditions:**
- User is logged in.
- An email exists in the inbox.

**Test Steps:**
1. Locate the target email.
2. Select the email.
3. Click the **Archive** action.
4. Verify the inbox.

**Expected Result:**  
The email should no longer appear in the inbox after being archived and should remain available through the appropriate archived/all-mail location.

---

### INBOX-004 – Delete, Verify in Trash, and Restore Email

**Priority:** P1  
**Classification:** Automate

**Description:**  
Verify the complete email deletion workflow, including moving an email to Trash and restoring it.

**Preconditions:**
- User is logged in.
- An email exists in the inbox.

**Test Steps:**
1. Locate the target email.
2. Delete the email.
3. Navigate to **Trash**.
4. Verify that the deleted email is present.
5. Restore the email.
6. Navigate to the appropriate mailbox location.
7. Verify that the email has been restored.

**Expected Result:**  
The email should move to Trash after deletion and should be successfully restored when the restore operation is performed.

---

## 5. Folders and Labels

### FOLDER-001 – Apply Label to an Email

**Priority:** P2  
**Classification:** Automate

**Description:**  
Verify that a label can be applied to an email and that the applied label is correctly reflected in the mailbox.

**Preconditions:**
- User is logged in.
- An email is available.
- A suitable label exists.

**Test Steps:**
1. Locate the target email.
2. Select the email.
3. Open the label/organization action.
4. Select the required label.
5. Apply the label.
6. Verify the email's label.

**Expected Result:**  
The selected label should be successfully applied to the email and should be visible when viewing the email or corresponding label/folder.

---

## 6. Search

### SEARCH-001 – Search Email by Keyword or Sender

**Priority:** P1  
**Classification:** Automate

**Description:**  
Verify that users can locate emails using the search functionality based on a keyword or sender.

**Preconditions:**
- User is logged in.
- Relevant emails exist in the mailbox.

**Test Steps:**
1. Enter a known keyword or sender into the search field.
2. Execute the search.
3. Review the returned messages.
4. Verify that the expected email is present.

**Expected Result:**  
The search results should contain emails matching the provided keyword or sender criteria.

---

### SEARCH-002 – Advanced Multi-Condition Search

**Priority:** P1  
**Classification:** Automate

**Description:**  
Verify that Proton Mail can return the correct results when multiple search conditions are combined.

**Preconditions:**
- User is logged in.
- Emails satisfying the required search conditions exist.

**Test Steps:**
1. Open the search functionality.
2. Enter multiple search conditions.
3. Execute the search.
4. Review the returned messages.
5. Validate the result against the specified conditions.

**Expected Result:**  
Only emails matching the specified search conditions should be returned.

---

## 7. Filters

### FILTER-001 – Create and Verify an Email Filter

**Priority:** P1  
**Classification:** Automate

**Description:**  
Verify that a filter can be configured and that incoming/matching emails are processed according to the filter rules.

**Preconditions:**
- User is logged in.
- The user has permission to create filters.
- Test email data is available.

**Test Steps:**
1. Navigate to the filter/settings section.
2. Create a filter based on the required condition.
3. Configure the expected action.
4. Save the filter.
5. Trigger or receive an email matching the filter condition.
6. Verify the resulting email state/action.

**Expected Result:**  
The filter should be successfully created and matching emails should be processed according to the configured rule.

---

## 8. Asynchronous Workflows

### ASYNC-001 – Undo Send

**Priority:** P1  
**Classification:** Automate

**Description:**  
Verify that the user can cancel an email immediately after sending it when the Undo Send option is available.

**Preconditions:**
- User is logged in.
- Undo Send functionality is configured/enabled.

**Test Steps:**
1. Open the Compose window.
2. Enter a valid recipient, subject, and message.
3. Send the email.
4. Immediately select **Undo** when the notification/action is displayed.
5. Verify the resulting state.

**Expected Result:**  
The send operation should be cancelled successfully and the message should not be delivered to the recipient.

---

### ASYNC-002 – Schedule an Email

**Priority:** P2  
**Classification:** Automate

**Description:**  
Verify that an email can be scheduled for delivery at a future date and time.

**Preconditions:**
- User is logged in.
- A valid recipient is available.

**Test Steps:**
1. Open the Compose window.
2. Enter the recipient, subject, and message.
3. Open the send scheduling option.
4. Select a future date and time.
5. Confirm the scheduled send.
6. Navigate to the scheduled messages area.
7. Verify the scheduled email.

**Expected Result:**  
The email should be scheduled successfully and should appear in the scheduled messages area with the configured delivery date and time.

---

## 9. Attachments

### ATTACH-001 – Send Email with Attachment

**Priority:** P1  
**Classification:** Automate

**Description:**  
Verify that a user can attach a file to an email and successfully send the email with the attachment.

**Preconditions:**
- User is logged in.
- A valid test attachment is available.

**Test Steps:**
1. Open the Compose window.
2. Enter a valid recipient.
3. Enter a subject and message.
4. Attach the test file.
5. Verify that the attachment is displayed in the compose window.
6. Send the email.
7. Verify successful sending.

**Expected Result:**  
The email should be sent successfully and the attachment should remain associated with the sent message.

---

### ATTACH-002 – Verify Attachment Persistence in Draft

**Priority:** P1  
**Classification:** Automate

**Description:**  
Verify that an attachment remains associated with an automatically saved draft after closing and reopening the draft.

**Preconditions:**
- User is logged in.
- A valid test attachment is available.

**Test Steps:**
1. Open the Compose window.
2. Enter a recipient and subject.
3. Enter message content.
4. Attach the test file.
5. Wait for the draft to be saved.
6. Close the compose window.
7. Navigate to **Drafts**.
8. Reopen the draft.
9. Verify the attachment.

**Expected Result:**  
The draft should retain the attached file after being closed and reopened, along with the previously entered email information.

---

## 3. Coverage Rationale

The 19 scenarios satisfy the assessment's minimum category expectations:
- Authentication: 2, including a negative case.
- Compose/send: 3, including invalid-recipient validation.
- Draft/persistence: 2.
- Inbox/organization: 4.
- Search: 2, including advanced multi-condition search.
- Filters: 1.
- Async behavior: 2.
- Attachments: 2.

The selection emphasizes core user journeys, negative validation, state transitions, persistence, and asynchronous behavior rather than maximizing raw test count.

## 4. Non-Automated / Exploratory Scenarios

The following are deliberately better suited to manual/exploratory coverage for this assessment:
- Broad visual/UI consistency across many viewport sizes.
- Exhaustive keyboard-navigation and accessibility review.
- CAPTCHA/MFA/security challenges that may require account-specific setup or human interaction.
- Exhaustive cross-browser/device combinations.
- Long-running scheduled-email delivery verification where waiting hours/days would make UI automation inefficient.
- Exploratory security/privacy testing requiring threat-model-driven investigation.

These exclusions are not statements that the functionality is unimportant; they reflect the time-boxed, risk-based scope of this assessment.
