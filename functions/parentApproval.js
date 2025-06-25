const functions = require("firebase-functions");
const admin = require('firebase-admin');
const nodemailer = require("nodemailer");

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.database();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "isaacakinyemiisatrun@gmail.com", // Replace with your admin email
    pass: "qwerty", // Replace with your app password
  },
});

// Send parent approval email with approve/reject links
exports.sendParentApprovalEmail = functions.database
  .ref("/contactForm/{id}/status")
  .onUpdate(async (change, context) => {
    const before = change.before.val();
    const after = change.after.val();
    if (before !== "admin-approved" || after !== "parent-pending") return null;
    const submissionSnapshot = await change.after.ref.parent.once("value");
    const submission = submissionSnapshot.val();
    const parentEmail = submission.parentEmail;
    const exeatId = context.params.id;
    const approveUrl = `https://yourdomain.com/parent-approve?id=${exeatId}&action=approve`;
    const rejectUrl = `https://yourdomain.com/parent-approve?id=${exeatId}&action=reject`;
    const mailOptions = {
      from: "isaacakinyemiisatrun@gmail.com",
      to: parentEmail,
      subject: "Exeat Approval Request for Your Child",
      html: `<p>Your child has requested an exeat. Please review and respond:</p>
             <p><b>Student:</b> ${submission.name || submission.matricNo}</p>
             <p><b>Reason:</b> ${submission.message || ''}</p>
             <a href="${approveUrl}" style="padding:10px 20px;background:#4caf50;color:#fff;text-decoration:none;border-radius:5px;">Approve</a>
             <a href="${rejectUrl}" style="padding:10px 20px;background:#d32f2f;color:#fff;text-decoration:none;border-radius:5px;margin-left:10px;">Reject</a>`
    };
    await transporter.sendMail(mailOptions);
    return null;
  });

// HTTP function to handle parent approval/rejection
exports.parentApprove = functions.https.onRequest(async (req, res) => {
  const { id, action } = req.query;
  if (!id || !action) return res.status(400).send("Invalid request");
  const status = action === "approve" ? "parent-approved" : "parent-rejected";
  // Set status as a top-level property (not nested)
  await admin.database().ref(`/contactForm/${id}`).update({ status });
  res.send(`<h2>Thank you! You have ${action === "approve" ? "approved" : "rejected"} the exeat request.</h2>`);
});
