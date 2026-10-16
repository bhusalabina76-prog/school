# Project Review and Change Log

## Overall verdict

The ZIP is a useful **UI / workflow prototype**: it has a shared login page, six role areas, a responsive sidebar/table layout, CRUD-style modals, and browser-local persistence. It is **not a complete or production-ready school management system** because the data is mostly sample content and there is no backend/database or server-side security.

## What was expected vs. what is present

| Area | What a real system should do | What this project currently does |
|---|---|---|
| Authentication | Server validates credentials; passwords are hashed; sessions/tokens expire | Browser JavaScript checks account objects stored in `localStorage`; passwords are plaintext |
| Role permissions | Backend validates every request and resource | Sidebar and action buttons are role-aware, but frontend checks can be bypassed |
| Data | Persistent database, stable IDs, validation, relationships | Mostly hardcoded sample rows plus per-browser `localStorage` |
| Parent access | Explicit parent ID linked to student ID(s) | Mostly matches parent/student names; names can collide or change |
| Users & Roles | Add, view, edit, deactivate/reactivate, safely reset accounts | User table was mapped to the wrong columns; edit flow treated existing accounts as duplicates |
| Dashboard | Counts and activities calculated from real records | Fixed illustrative figures and activity messages |
| Finance | Validated invoices, payment ledger, reconciliation, permissions | UI rows only; no real payment or accounting workflow |
| Messaging/notices | Persisted delivery/read state and notifications | UI records only; no delivery service or real-time updates |
| Privacy/security | Server validation, output escaping, CSRF protection where relevant, logs, backups | No backend security controls; must not contain real personal data |

## Issues found and changes made

1. **Users table columns were wrong.** Account rows are represented as `[name, email, role, lastLogin, status]`, but the renderer used indices intended for a six-column array. The display now uses the actual row order.
2. **Editing users failed.** The old save path always attempted to create an account and rejected existing login IDs, so editing could not work. The user-save flow now distinguishes add from edit, preserves the existing password on edit, checks email format/duplicates, and updates the account key if the email changes.
3. **Users edit/view object mapping was inconsistent.** It now maps the five visible account fields explicitly.
4. **Account status actions were incomplete.** Admin activate/deactivate is now offered for parent and accountant records too.
5. **README instructions were misleading.** It listed teacher/student/parent demo credentials even though the current authentication code removes those legacy accounts. Documentation now identifies the only built-in account and explains how other accounts are created.

## Additional problems that remain

- Several modules have no meaningful record relationship or ID; editing/deleting records can break links.
- Parent-child filtering is name-based and can expose incorrect/missing data when names are duplicated or edited.
- Dashboard figures and “recent activity” are hardcoded, so they can disagree with module rows.
- The browser-side password generator is not a secure credential system; browser storage can be read or edited by the user.
- The code builds HTML using interpolated values. User-entered text should be escaped consistently or rendered using safe DOM APIs to reduce injection risk.
- The “Forgot / Change Password?” option asks for the current password; it is a change-password form, not a real account recovery flow.
- No automated browser tests or real database tests exist in this ZIP. JavaScript syntax checks pass, but that does not prove every UI workflow works.

## Validation performed

- Listed and inspected the ZIP contents and reviewed the main HTML, CSS, authentication script, and shared application script.
- Ran JavaScript syntax checks on `js/app.js` and `js/auth.js` after the changes; both pass.
- Did not claim a full end-to-end browser test, backend test, or security audit.

## Suggested production architecture

Use a frontend plus ASP.NET Core 8 Web API and PostgreSQL/SQL Server. Keep role checks and data filtering on the server. Create normalized tables with stable IDs, including `Users`, `Roles`, `Students`, `Parents`, `ParentStudents`, `Teachers`, `Staff`, `Classes`, `Enrollments`, `Subjects`, `Attendance`, `Homework`, `Exams`, `Results`, `Invoices`, `Payments`, `Expenses`, `Notices`, `Messages`, and `AuditLogs`. Hash passwords with a proven identity framework; do not store raw passwords in browser storage. Ask for the real database connection string before configuring migrations, rather than inventing one.
