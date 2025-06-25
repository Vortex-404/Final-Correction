const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp();

// Check if app is already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.database();
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "isaacakinyemiisatrun@gmail.com",
    pass: "qwerty",  // 🚨 Replace this!
  },
});

// Verify transporter (optional)
transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Nodemailer transporter is ready");
  }
});

// Send email to Admin
async function sendEmailToAdmin(name, message, email) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "isaacakinyemi66@gmail.com",  // Admin email
    subject: "New Form Submission",
    text: `A new submission has been created.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to admin successfully.");
  } catch (error) {
    console.error("Error sending email to admin:", error);
  }
}

// Send email to User
async function sendEmailToUser(email, status) {
  const mailOptions = {
    from: "isaacakinyemiisatrun@gmail.com",
    to: email,
    subject: "Your Request Status Update",
    text: `Your request status has been updated to: ${status}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to user successfully.");
  } catch (error) {
    console.error("Error sending email to user:", error);
  }
}

// Notify Admin on new submission
exports.notifyAdminNewSubmission = functions.database
  .ref("/submissions/{id}")
  .onCreate(async (snapshot) => {
    const submission = snapshot.val();
    const { name, message, email } = submission;
    await sendEmailToAdmin(name, message, email);
  });

// Notify User when status changes
exports.notifyUserStatusChange = functions.database
  .ref("/submissions/{id}/status")
  .onUpdate(async (change) => {
    const before = change.before.val();
    const after = change.after.val();

    if (before !== after) {
      const submissionSnapshot = await change.after.ref.parent.once("value");
      const submission = submissionSnapshot.val();
      const userEmail = submission.email;

      await sendEmailToUser(userEmail, after);
    }
