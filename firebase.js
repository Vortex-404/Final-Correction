// This script handles Firebase database operations for exeat submissions.
// It initializes Firebase, listens for form submissions, saves data to the database, and handles push notifications.

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getMessaging, onMessage } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js";

// Firebase configuration for the project
const firebaseConfig = {
  apiKey: "AIzaSyCVTheN4w8M0blhuMY07AfDOri8Sb3-hzI",
  authDomain: "exeatregister.firebaseapp.com",
  databaseURL: "https://exeatregister-default-rtdb.firebaseio.com",
  projectId: "exeatregister",
  storageBucket: "exeatregister.firebasestorage.app",
  messagingSenderId: "572897522310",
  appId: "1:572897522310:web:8c588bb399825e360ad707",
};

// Initialize Firebase app and database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

// Request permission for push notifications
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    console.log("Notification permission granted.");
  } else {
    console.error("Notification permission denied.");
  }
});

// Handle incoming messages
onMessage(messaging, (payload) => {
  console.log("Message received: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  // Show notification
  new Notification(notificationTitle, notificationOptions);
});

// Add an event listener to the form submission
document.getElementById("contactForm").addEventListener("submit", submitForm);

// Removed the first popup when a form is submitted
function submitForm(e) {
  e.preventDefault(); // Prevent the default form submission behavior

  // Collect user input from the form
  const matricNumber = getElementVal("matricNo");
  const studentEmail = getElementVal("studentEmail");
  const parentEmail = getElementVal("parentEmail");
  const message = getElementVal("message");

  // Save the collected data to Firebase
  saveMessages(matricNumber, studentEmail, parentEmail, message)
    .then(() => {
      showExeatPopup("Exeat submitted successfully"); // Show styled popup
      document.getElementById("contactForm").reset(); // Reset the form
      window.location.href = "dynamic_history.html"; // Redirect to the history page
    })
    .catch((error) => {
      console.error("Error submitting exeat:", error); // Log the error
      alert("Failed to submit exeat. Please try again."); // Notify the user of failure
    });
}

// Function to save messages to Firebase
function saveMessages(matricNumber, studentEmail, parentEmail, message) {
  const newContactForm = push(ref(db, "contactForm")); // Create a new entry in the database
  return set(newContactForm, {
    matricNo: matricNumber,
    studentEmail: studentEmail,
    parentEmail: parentEmail,
    message: message,
  });
}

// Helper function to get the value of an input field by its ID
function getElementVal(id) {
  return document.getElementById(id).value;
}

// Function to listen for real-time updates to exeat status
function listenForStatusUpdates() {
  const statusRef = ref(db, "contactForm");

  onValue(statusRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      // Assuming the status is stored in the database
      // const latestStatus = Object.values(data).pop().status; // Removed unused variable
    }
  });
}

// Function to show styled popup when exeat is submitted
function showExeatPopup(message) {
  const popup = document.createElement("div");
  popup.textContent = message;
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.padding = "15px";
  popup.style.borderRadius = "8px";
  popup.style.color = "#fff";
  popup.style.backgroundColor = "#4caf50";
  popup.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
  popup.style.zIndex = "1000";
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 3000);
}

// Call the function to start listening for updates
listenForStatusUpdates();