# MTU Exeat Management System

## Project Overview
This project is a web-based Exeat Management System for Mountain Top University (MTU). It streamlines the process of applying for, approving, and tracking exeat requests for students, parents, HODs, and Deans. The system leverages Firebase for real-time data storage and EmailJS for notifications, providing a seamless, paperless workflow.

## Features
- **Student Registration & Login:** Secure sign-up and login for students, with parent email association.
- **Exeat Application:** Students can apply for exeat, which is routed through parent, HOD, and Dean for approval.
- **Approval Workflow:** Each role (Parent, HOD, Dean) has a dedicated approval interface. Approvals and rejections are tracked in real time.
- **Notifications:** Email notifications are sent at each stage using EmailJS.
- **History & Progress:** Students can view the real-time status and history of their applications. Dean and HOD can view approval history.
- **Admin Dashboard:** Admins can view, filter, and manage all requests.

## File Structure & Descriptions

- **index.html**: Landing page for the application, introducing the system and providing access to registration.
- **registration.html / registration.css**: Student registration and login UI. Handles toggling between forms and user input validation.
- **register.js / login.js**: Handles registration and login logic, including Firebase authentication and user session management.
- **exeat_page.html**: Student application form for exeat requests.
- **admin.html / admin.js**: Admin dashboard for managing all requests. Displays pending, approved, and rejected requests. Sends requests to parents and shows formal letters.
- **hod_approval.html**: HOD's interface for reviewing and acting on parent-approved requests. Only shows relevant columns. HOD can approve or reject with remarks.
- **dean_approval.html**: Dean's interface for reviewing HOD-approved requests, approving/rejecting, and viewing approval history.
- **parent_approval.html**: Parent's interface for approving or rejecting student requests via email link.
- **dynamic_history.html / dynamic_history.css**: Student's history page, showing all past requests, their statuses, and a progress tracker modal.
- **notification.html**: Notification center for students, showing approval/rejection updates.
- **profile.html**: Student profile page (basic info and settings).
- **z-images/**: Contains all images used in the UI.
- **functions/**: Serverless backend logic (if used).
- **firebase.js / firebase.json**: Firebase configuration and settings.
- **package.json**: Project dependencies and scripts.

## How Each File Works

### index.html
- Landing page with a call-to-action for students to apply for exeat.

### registration.html / registration.css
- Provides a modern, responsive UI for student registration and login.
- Comments in the HTML and CSS explain each section and style block.

### register.js / login.js
- Handles form validation, Firebase authentication, and session management.
- Well-commented to explain each function and event handler.

### exeat_page.html
- Allows students to submit new exeat requests.
- Explains each form field and submission logic.

### admin.html / admin.js
- Admin dashboard for managing all requests.
- Comments explain table rendering, event handlers, and EmailJS integration.

### hod_approval.html
- HOD's approval interface.
- Only shows Matric Number, Status, and Action for clarity.
- Comments explain the approval/rejection workflow.

### dean_approval.html
- Dean's approval interface and history table.
- Comments explain the approval workflow, EmailJS notifications, and history rendering.

### parent_approval.html
- Parent's approval interface, accessed via email link.
- Comments explain the approval/rejection process.

### dynamic_history.html / dynamic_history.css
- Student's history page with real-time updates and a progress tracker modal.
- Comments explain the rendering logic and modal behavior.

### notification.html
- Notification center for students.
- Comments explain notification rendering and clearing logic.

### profile.html
- Student profile page (basic info and settings).

### z-images/
- Contains all images used in the UI.

### functions/
- Serverless backend logic (if used).

### firebase.js / firebase.json
- Firebase configuration and settings.

### package.json
- Project dependencies and scripts.

## Setup & Usage
1. Clone the repository.
2. Set up Firebase and EmailJS credentials in the relevant files.
3. Open `index.html` in your browser to start the application.
4. Use the provided login pages for Admin, HOD, and Dean roles.

## Academic Note
This project was developed as a student project for Mountain Top University. It demonstrates the use of modern web technologies (HTML, CSS, JS, Firebase, EmailJS) to solve a real-world administrative problem in a university setting. All code is thoroughly commented for clarity and maintainability.

---

For any questions or contributions, please contact the project maintainer.
