Exeat Management App Documentation

Welcome!

This project is designed to make the exeat process at Mountain Top University easy and stress-free for students and administrators. Here’s what you can do and how it all works:

What Can You Do With This App?

As a Student:
- Register and log in with your email and password. Your data is private and only you can see your exeat history.
- Apply for exeat by filling out a simple form with your matric number, email, and reason. No more paperwork!
- Track your requests and instantly see the status of every exeat you’ve applied for—pending, approved, or rejected.
- Get notified by email and in-app when your exeat is approved or rejected. If rejected, you’ll see the reason in your history.
- Download or print your formal exeat letter as a PDF if your request is approved.
- Reset your password easily if you forget it.
- Enjoy a modern, mobile-friendly interface that works on any device.
- Receive real-time updates and notifications without needing to refresh the page.
- View a detailed history of all your past exeat requests, including dates and statuses.
- Access a secure and private dashboard where only your data is visible to you.
- Experience fast and reliable performance, even with a large number of requests.
- Get help and support through clear error messages and feedback throughout the app.
- Benefit from a simple and intuitive navigation system for easy access to all features.
- Use the notification dropdown to see all recent updates at a glance.
- Print your exeat letter directly from the browser for physical submission if needed.
- See the exact reason for any rejected request, so you know what to fix next time.
- Logout securely from any device.

As an Admin:
- Log in securely as an admin.
- View all exeat requests in a sortable, filterable table.
- Approve or reject requests with one click. If rejecting, you must provide a reason (students will see this).
- Instantly notify students by email and in-app when their status changes.
- Search and filter requests by matric number, email, status, or date range.
- Preview the formal exeat letter for any request.
- (Planned) Generate reports for requests over any period.
- Access a responsive admin dashboard that works on desktop and mobile.
- Use advanced search to quickly find any request.
- Filter requests by status (pending, approved, rejected) for efficient management.
- View detailed information for each request, including student details and message.
- See the date and time of every submission for accurate record-keeping.
- Download or print any student's exeat letter for administrative purposes.
- Get visual feedback and alerts for every action you take.
- Enjoy a clean and organized interface that makes managing requests easy.
- Benefit from secure authentication and role-based access control.
- Plan for future features like analytics and reporting tools.

How It Works (Behind the Scenes)

- Firebase Authentication handles all user and admin logins, registration, and password resets.
- Firebase Realtime Database stores every exeat request, its status, and all user/admin actions.
- Email notifications are sent to students when an admin updates a request.
- After login, users are routed to the right dashboard (student or admin) automatically.
- Every action is logged, so students and admins always have a clear record.
- Approved exeat letters can be downloaded as PDFs for easy printing.
- The app works great on desktop and mobile.
- All sensitive data is encrypted and securely stored.
- The system is designed for scalability and can handle many users at once.
- Error handling and validation are built-in to prevent mistakes and guide users.
- The codebase is modular and easy to maintain or extend.
- The UI is built with accessibility in mind, supporting keyboard navigation and screen readers.
- The app is optimized for fast loading and smooth transitions.
- All user actions are confirmed with visual feedback or alerts.
- The notification system ensures you never miss an important update.
- The database structure is organized for efficient queries and updates.
- The app is compatible with all modern browsers.

File Guide (What’s Where)

HTML:
registration.html – Registration and login forms (with password reset)
index.html – Landing page, intro to the app
home.html – Student dashboard after login
exeat_page.html – Exeat application form
dynamic_history.html – Student’s exeat request history
admin.html – Admin dashboard
notification.html – Notification system UI

JavaScript:
register.js – Handles registration logic
login.js – Handles login, password reset, and role-based redirects
firebase.js – Submits exeat requests to Firebase
admin.js – Admin dashboard logic (approve/reject, notifications, search/filter)

CSS:
application.css – Styles for the exeat form
dynamic_history.css – Styles for the history page
admin.css – Styles for the admin dashboard
registration.css – Styles for registration and login
style.css – General styles

Other Folders:
exeatmailreq/ – Email request handling (Node.js backend)
functions/ – Cloud functions and backend logic
my-firebase-emails/ – Email logs and debug files
z-images/ – All images used in the app

How To Use It

1. Start at index.html in your browser.
2. Register or log in (students and admins have separate flows).
3. Apply for exeat (students) or manage requests (admins).
4. Check your email for notifications, or see them in-app.
5. Track your history and download letters as needed.
6. Admins: Use the dashboard to search, filter, and manage all requests.
7. Use the notification dropdown to stay updated on all changes.
8. Print or download letters as needed for submission or records.
9. Logout when done to keep your account secure.

What Makes This Special?

- Status updates, notifications, and history are all live—no refresh needed.
- Students always know where they stand, and admins can give clear reasons for rejections.
- All sensitive actions are protected by Firebase Auth. Passwords are never stored in plain text.
- Clean, modern UI with helpful feedback and error messages everywhere.
- The app is fully responsive and works on any device.
- The notification system is robust and keeps you informed at all times.
- The code is well-documented and easy to extend for future needs.
- Security and privacy are top priorities throughout the app.
- The app is designed to be intuitive and easy for anyone to use.
- All features are tested for reliability and performance.
- The system is ready for future enhancements and scaling.

What’s Next? (Planned Features)

- Push notifications for even more instant updates.
- Admin reports to export and analyze exeat trends.
- Two-factor authentication for extra security for admins.
- Mobile app for even easier access on the go.
- Analytics dashboard for admins to track trends and statistics.
- Bulk actions for admins to approve or reject multiple requests at once.
- Improved accessibility features for all users.
- Integration with other university systems for seamless data flow.
- Customizable notification preferences for users.
- Multi-language support for a diverse student body.
- Enhanced search and filtering options for large datasets.
- Scheduled email summaries for admins and students.
- User profile management and customization.
- In-app help and support resources.
- Dark mode for comfortable viewing at night.
- Offline support for submitting requests without internet.
- QR code generation for quick verification of approved exeats.
- Export history as CSV or PDF for personal records.
- More detailed audit logs for transparency and accountability.

Conclusion

This app is built to make life easier for students and staff at MTU. Every feature is designed to save time, reduce confusion, and keep everyone in the loop.