// =========================
//  ADMIN.JS - Admin Dashboard Logic
//  This script manages the admin dashboard for the MTU Exeat System.
//  It fetches, displays, and manages all exeat requests, including sending to parents and rendering formal letters.
//  All major functions and event handlers are commented for clarity.
// =========================

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, onValue, update } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Firebase configuration for the project
const firebaseConfig = {
    apiKey: "AIzaSyCVTheN4w8M0blhuMY07AfDOri8Sb3-hzI",
    authDomain: "exeatregister.firebaseapp.com",
    databaseURL: "https://exeatregister-default-rtdb.firebaseio.com/",
    projectId: "exeatregister",
    storageBucket: "exeatregister.firebasestorage.app",
    messagingSenderId: "572897522310",
    appId: "1:572897522310:web:8c588bb399825e360ad707",
};

// Initialize Firebase app and database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Initialize EmailJS (call this once, e.g. after your imports)
if (window.emailjs) {
    window.emailjs.init('g7tceHPlJ69ldxZZ1'); // Provided EmailJS user ID
} else {
    // EmailJS library not loaded
}

// Reference to the submissions table in the admin dashboard
const submissionsTableEl = document.getElementById("submissionsTable");
const approvedTableEl = document.getElementById("approvedTable");
const rejectedTableEl = document.getElementById("rejectedTable");
const submissionsTable = submissionsTableEl ? submissionsTableEl.querySelector("tbody") : null;
const approvedTable = approvedTableEl ? approvedTableEl.querySelector("tbody") : null;
const rejectedTable = rejectedTableEl ? rejectedTableEl.querySelector("tbody") : null;
const submissionsRef = ref(db, "contactForm");

// Fetch submissions from Firebase and display them in the table
onValue(submissionsRef, (snapshot) => {
    if (!submissionsTable || !approvedTable || !rejectedTable) {
        return;
    }
    submissionsTable.innerHTML = "";
    approvedTable.innerHTML = "";
    rejectedTable.innerHTML = "";
    snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val() || {};
        const status = (data.status || '').toLowerCase();
        // Approved requests
        if (["parent-approved","hod-approved","dean-approved"].includes(status)) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${data.matricNo || ''}</td>
                <td>${data.status || ''}</td>
                <td>${data.email || ''}</td>
                <td>${data.parentEmail || ''}</td>
            `;
            approvedTable.appendChild(row);
        } else if (["parent-rejected","hod-rejected","dean-rejected"].includes(status)) {
            // Rejected requests
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${data.matricNo || ''}</td>
                <td>${data.status || ''}</td>
                <td>${data.email || ''}</td>
                <td>${data.parentEmail || ''}</td>
            `;
            rejectedTable.appendChild(row);
        } else {
            // Pending/active requests
            const row = document.createElement("tr");
            row.dataset.date = data.date || '';
            row.innerHTML = `
                <td>${data.matricNo || ''}</td>
                <td>${data.email || ''}</td>
                <td><button class="view-letter-btn" data-id="${childSnapshot.key}">View Letter</button></td>
                <td>${data.status || 'Submitted'}</td>
                <td>${data.parentEmail || ''}</td>
                <td><button class="send-parent-btn" data-id="${childSnapshot.key}">Send to Parent</button></td>
            `;
            submissionsTable.appendChild(row);
        }
    });

    // Add event listeners for view and send buttons
    document.querySelectorAll(".view-letter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const data = snapshot.child(id).val() || {};
            showLetterModal(data);
        });
    });

    document.querySelectorAll(".send-parent-btn").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const id = btn.dataset.id;
            const data = snapshot.child(id).val() || {};
            const parentEmail = data.parentEmail || '';
            if (!parentEmail) {
                alert("No parent email found for this student.");
                return;
            }
            // Update status in database
            const submissionRef = ref(db, `contactForm/${id}`);
            await update(submissionRef, { status: "Sent to Parent" });
            // EmailJS integration (using provided params)
            try {
                if (!window.emailjs) throw new Error('EmailJS not loaded');
                const serviceID = 'service_pnam5bu';
                const templateID = 'template_u63d3nc';
                const userID = 'g7tceHPlJ69ldxZZ1';
                // Generate approval and reject links using the request ID
                const approveLink = `http://127.0.0.1:5500/parent_approval.html?requestId=${id}&action=approve`;
                const rejectLink = `http://127.0.0.1:5500/parent_approval.html?requestId=${id}&action=reject`;
                const templateParams = {
                    to_email: parentEmail,
                    student_name: data.name && data.name.trim() ? data.name : 'Unknown Student',
                    student_email: data.email || 'N/A',
                    reason: data.message || 'N/A',
                    matric_no: data.matricNo || 'N/A',
                    approve_link: approveLink,
                    reject_link: rejectLink
                };
                // Send email to parent using EmailJS
                await window.emailjs.send(serviceID, templateID, templateParams, userID);
                alert('Email sent to parent successfully!');
            } catch (err) {
                alert('Error sending email: ' + (err.text || err.message || JSON.stringify(err)));
            }
        });
    });
});

// Function to show the formal letter in a modal
function showLetterModal(data) {
    const modal = document.getElementById("letterModal");
    const content = document.getElementById("modalLetterContent");
    content.innerHTML = `
        <div style="font-family: 'Poppins', sans-serif; color: #222;">
            <div style="text-align: right; margin-bottom: 12px;">
                <strong>From:</strong><br>
                ${data.name}<br>
                ${data.email}<br>
                Mountain Top University<br>
                KM 12, Lagos-Ibadan Expressway<br>
                Ogun State, Nigeria
            </div>
            <div style="text-align: left; margin-bottom: 12px;">
                <strong>To:</strong><br>
                The Chairman<br>
                Directorate of Student Affairs<br>
                Through:<br>
                The Head of Department<br>
                The Level Advisor
            </div>
            <div style="margin-bottom: 12px; text-align:left;">
                Dear Sir/Madam,<br><br>
                <div style="text-align:center;font-weight:bold;text-decoration:underline;">APPLICATION FOR EXEAT</div><br>
                I am writing to formally request an exeat for the following reason:<br>
                <strong>Reason:</strong> ${data.message}<br><br>
                I kindly request your approval for this exeat. I assure you that all necessary academic and administrative obligations have been fulfilled.<br><br>
                Thank you for your kind consideration.<br>
                Sincerely,<br><br>
                ${data.name}<br>
                ${data.email}
            </div>
        </div>
    `;
    modal.style.display = "flex";
}

// Modal close logic
const closeModalBtn = document.getElementById("closeModalBtn");
if (closeModalBtn) {
    closeModalBtn.onclick = () => {
        document.getElementById("letterModal").style.display = "none";
    };
}
window.onclick = function(event) {
    const modal = document.getElementById("letterModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Function to filter and search submissions
function filterAndSearchSubmissions() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filterStatus = document.getElementById("filterStatus").value;

    const rows = submissionsTable.querySelectorAll("tr");
    rows.forEach((row) => {
        const matricNumber = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
        const email = row.querySelector("td:nth-child(2)").textContent.toLowerCase();
        const status = row.querySelector("td:nth-child(4)").textContent;

        const matchesSearch = matricNumber.includes(searchInput) || email.includes(searchInput);
        const matchesFilter = !filterStatus || status === filterStatus;

        if (matchesSearch && matchesFilter) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Function to filter submissions by date
function filterByDate() {
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);

    if (isNaN(startDate) || isNaN(endDate)) {
        alert("Please select valid start and end dates.");
        return;
    }

    const rows = submissionsTable.querySelectorAll("tr");
    rows.forEach((row) => {
        const submissionDate = new Date(row.dataset.date); // Assuming each row has a data-date attribute
        if (submissionDate >= startDate && submissionDate <= endDate) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

// Add event listeners for search and filter inputs
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", filterAndSearchSubmissions);
}
const filterStatus = document.getElementById("filterStatus");
if (filterStatus) {
  filterStatus.addEventListener("change", filterAndSearchSubmissions);
}
const startDateInput = document.getElementById("startDate");
if (startDateInput) {
  startDateInput.addEventListener("change", filterByDate);
}
const endDateInput = document.getElementById("endDate");
if (endDateInput) {
  endDateInput.addEventListener("change", filterByDate);
}
