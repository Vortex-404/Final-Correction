// This script handles user login and password reset functionality.
// It uses Firebase Authentication to authenticate users and manage password resets.

import { getApps, initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVTheN4w8M0blhuMY07AfDOri8Sb3-hzI",
  authDomain: "exeatregister.firebaseapp.com",
  databaseURL: "https://exeatregister-default-rtdb.firebaseio.com/",
  projectId: "exeatregister",
  storageBucket: "exeatregister.firebasestorage.app",
  messagingSenderId: "572897522310",
  appId: "1:572897522310:web:8c588bb399825e360ad707",
};
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to display alerts to the user
function showAlert(message, isSuccess) {
  const alertBox = document.createElement("div");
  alertBox.textContent = message;
  alertBox.style.position = "fixed";
  alertBox.style.top = "20px";
  alertBox.style.right = "20px";
  alertBox.style.padding = "15px";
  alertBox.style.borderRadius = "8px";
  alertBox.style.color = "#fff";
  alertBox.style.backgroundColor = isSuccess ? "#60c258" : "#ff4d4d";
  alertBox.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  alertBox.style.zIndex = "1000";
  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}

// Listen for the "Login" button click event
const submit = document.getElementById("Login");
if (submit) {
  submit.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect user input from the login form
    const email = document.getElementById("login_email").value;
    const password = document.getElementById("login_password").value;

    // Authenticate the user with Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        showAlert("Login Successful", true); // Notify the user of success
        localStorage.setItem("loggedInUserEmail", email); // Store the user's email locally

        // Redirect the user based on their role
        if (email === "admin@mtu.edu") {
          setTimeout(() => {
            window.location.href = "admin.html";
          }, 1000);
        } else {
          setTimeout(() => {
            window.location.href = "home.html";
          }, 1000);
        }
      })
      .catch((error) => {
        const errorMessage = error.message || "Network error. Please try again."; // Handle errors
        showAlert(errorMessage, false); // Notify the user of the error
      });
  });
}

// Listen for the "Forgot Password" link click event
const resetPasswordButton = document.getElementById("resetPassword");
if (resetPasswordButton) {
  resetPasswordButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default action

    // Collect the email input for password reset
    const email = document.getElementById("login_email").value;

    if (!email) {
      showAlert("Please enter your email to reset the password.", false); // Notify the user if email is missing
      return;
    }

    // Send a password reset email using Firebase Authentication
    sendPasswordResetEmail(auth, email)
      .then(() => {
        showAlert("Password reset email sent successfully. Check your inbox.", true); // Notify the user of success
      })
      .catch((error) => {
        const errorMessage = error.message || "Failed to send password reset email. Please try again."; // Handle errors
        showAlert(errorMessage, false); // Notify the user of the error
      });
  });
}

