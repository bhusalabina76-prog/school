# School Management System — Role-Based Frontend Prototype

This project is a static HTML/CSS/JavaScript prototype for a school management system. It has one login page and separate dashboards/modules for Admin, Teacher, Student, Parent, Staff, and Accountant.

## Run it

1. Extract the ZIP.
2. Open the folder in VS Code and run it with Live Server (recommended), or serve it from any static web server.
3. Open `index.html` or `pages/login.html`.
4. Sign in with the initial administrator account below.

**Initial administrator:** `admin@school.com` / `admin123`

Other roles do not have default login accounts. The administrator must create them in **Users & Roles**, or create a record from the relevant Students/Teachers/Parents/Staff/Accountants module. Data is saved in this browser's `localStorage`; it does not sync between browsers or devices.

## Included roles and modules

- **Admin:** dashboard, students, teachers, parents, staff, accountants, classes, subjects, attendance, routine, homework, exams/results, fees, expenses, notices, messages, complaints, events, reports, users/roles, settings.
- **Teacher:** dashboard, classes, students, attendance, routine, homework, exams/results, messages, notices.
- **Student:** dashboard, profile, attendance, routine, homework, exams/results, fees, notices, messages.
- **Parent:** dashboard, linked child, attendance, routine, homework, exams/results, fees, notices, messages, complaints.
- **Staff:** dashboard, profile, attendance, routine, notices, messages, complaints.
- **Accountant:** dashboard, fees/payments, expenses, reports, messages, notices.

## Important limitations — not production-ready

- This is a **frontend-only prototype**, not a secure school information system. `localStorage` holds account records and plaintext passwords; browser users can inspect or alter them. Never use real student, parent, staff, financial, or credential data in this version.
- There is no backend API, database, server-side authorization, secure password hashing, audit log, backup, email/SMS service, real-time messaging, or payment integration.
- Many dashboard metrics, activities, and initial module rows are illustrative sample data. They are not connected to a live school database and must be replaced before a real deployment.
- Parent-child association currently relies mainly on names, which can be duplicated or edited. A real system needs stable IDs and an explicit parent–student relationship table.
- The UI's role-based navigation is not a security boundary. A production backend must enforce every permission on the server.
- Password generation uses browser-side JavaScript and should be replaced by secure server-side account provisioning and a forced password-reset flow.

## Changes in this reviewed build

- Fixed the Users & Roles table column mapping so role, last login, and status display in the correct columns.
- Fixed user account editing so existing accounts can be updated rather than being rejected as duplicates; changing a login email updates the account key.
- Corrected the Users & Roles record mapping used by view/edit flows.
- Extended the admin activate/deactivate action to parent and accountant records as well as students, teachers, and staff.
- Updated this README to remove outdated demo credentials for non-admin roles and clearly document prototype limitations.

## Recommended next steps before production

1. Choose a backend (for example ASP.NET Core 8 Web API) and database (for example PostgreSQL or SQL Server).
2. Model stable IDs and relationships for users, students, guardians, classes, enrollments, teachers, attendance, fees, payments, and academic records.
3. Implement hashed passwords, secure authentication, server-side role/permission checks, input validation, and audit logging.
4. Replace hardcoded sample rows and metrics with authenticated API data; add automated tests and backups.
5. Test all role flows on desktop, tablet, and mobile before deployment.

## Deploy on GitHub and Vercel

This is a static site: no package installation or build step is required.

### GitHub

1. Create an empty repository on GitHub (do not add a README or license if you plan to push this folder as-is).
2. From this project folder, initialize Git if needed, add the GitHub repository as `origin`, commit the files, and push the `main` branch.
3. The GitHub Actions workflow in `.github/workflows/verify-static-site.yml` checks the required entry files, JavaScript syntax, and Vercel configuration on pushes and pull requests.

### Vercel

1. Import the GitHub repository into Vercel and select this project folder as the project root if the repository contains additional folders.
2. Choose **Other** as the framework preset. Leave the build command and install command empty, and leave the output directory at the project root (or `.` if Vercel requires a value).
3. Deploy. Vercel reads `vercel.json`; the home page sends visitors to the login page.

Vercel can also deploy from this folder using its CLI after linking the project with your Vercel account. A successful GitHub push alone does not deploy to Vercel until the repository is connected to a Vercel project.

### Public deployment warning

This project is only a frontend prototype. Authentication and account data are handled in browser JavaScript and `localStorage`; the built-in demo administrator credentials are visible in the source. Do not use real student or staff data, or treat this deployment as a secure production system. Remove demo credentials and build server-side authentication and authorization before any real use.
