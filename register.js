// This script handles user registration using Firebase Authentication.
// It initializes Firebase, listens for form submissions, and creates new user accounts.

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase configuration for the project
const firebaseConfig = {
  apiKey: "AIzaSyDFmMEwnonld5xKQHrJKy4Hj2i8WtlpbH8",
  authDomain: "project-9d53b.firebaseapp.com",
  projectId: "project-9d53b",
  storageBucket: "project-9d53b.firebasestorage.app",
  messagingSenderId: "601936680387",
  appId: "1:601936680387:web:05864c5b721e709c281976",
};

// Initialize Firebase app and authentication
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Function to display success or error alerts to the user
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

  // Remove the alert after 3 seconds
  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}

// Fix "Remember Me" functionality
const rememberMeCheckbox = document.getElementById("register-check");
const emailField = document.getElementById("register_email");

// Load saved email if "Remember Me" was checked
if (localStorage.getItem("rememberedEmail")) {
  emailField.value = localStorage.getItem("rememberedEmail");
  rememberMeCheckbox.checked = true;
}

rememberMeCheckbox.addEventListener("change", () => {
  if (rememberMeCheckbox.checked) {
    localStorage.setItem("rememberedEmail", emailField.value);
  } else {
    localStorage.removeItem("rememberedEmail");
  }
});

// Listen for the "Sign Up" button click event
const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Collect user input from the registration form
  const email = document.getElementById("register_email").value;
  const password = document.getElementById("register_password").value;
  const firstname = document.getElementById("first_name").value;
  const lastName = document.getElementById("last_name").value;
  const parentEmail = document.getElementById("parent_email").value;

  // Create a new user account in Firebase Authentication
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user; // The newly created user object
      // Save registration info to Firebase Database under 'Registration'
      const db = getDatabase();
      const regRef = ref(db, 'Registration');
      const regData = {
        name: firstname + ' ' + lastName,
        email: email,
        parentEmail: parentEmail,
        uid: user.uid,
        createdAt: new Date().toISOString()
      };
      push(regRef, regData)
        .then(() => {
          showAlert("User Created & Registered Successfully", true); // Notify the user of success
          window.location.href = "registration.html#login"; // Redirect to the login section
        })
        .catch((err) => {
          showAlert("Registration data save failed: " + err.message, false);
        });
    })
    .catch((error) => {
      const errorMessage = error.message; // Firebase error message
      showAlert(errorMessage, false); // Notify the user of the error
    });
});

