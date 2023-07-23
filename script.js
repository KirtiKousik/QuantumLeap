const navMenu = document.getElementById("nav-menu");
const toggleMenu = document.getElementById("toggle-menu");
const closeMenu = document.getElementById("close-menu");

toggleMenu.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

closeMenu.addEventListener("click", () => {
  navMenu.classList.remove("show");
});

const scriptURL =
  "https://script.google.com/macros/s/AKfycbxFq1oYPfDq0YLfopfp3Nn4kh4dcjXbqQ6ctc7dKivAaamqNi4o0Dp0KmvJvmEnVrHr/exec";

const form = document.forms["google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Input validation
  const studentNameInput = document.getElementById("name");
  const parentNameInput = document.getElementById("parentName");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const addressInput = document.getElementById("address");

  if (studentNameInput.value.trim() === "") {
    alert("Please enter the Student's Name.");
    return;
  }

  if (parentNameInput.value.trim() === "") {
    alert("Please enter the Father's / Mother's Name.");
    return;
  }

  if (phoneInput.value.trim() === "") {
    alert("Please enter the Phone Number.");
    return;
  }

  // Validate phone number length (must be 10 digits)
  if (!/^\d{10}$/.test(phoneInput.value.trim())) {
    alert("Please enter a valid 10-digit Phone Number.");
    return;
  }

  // Validate email format if provided
  if (emailInput.value.trim() !== "") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      alert("Please enter a valid Email address.");
      return;
    }
  }

  if (addressInput.value.trim() === "") {
    alert("Please enter the address.");
    return;
  }
  // end of input validation

  // Add the current date and time to the form data
  const currentDateTime = new Date();
  const formattedDateTime = currentDateTime.toLocaleString();

  // Create a new hidden input field to hold the date and time value
  const dateTimeInput = document.createElement("input");
  dateTimeInput.type = "hidden";
  dateTimeInput.name = "Submission Date and Time";
  dateTimeInput.value = formattedDateTime;

  // Append the hidden input field to the form
  form.appendChild(dateTimeInput);

  // Fetch the form data with the submission date and time
  fetch(scriptURL, {
    method: "POST",
    body: new FormData(form),
  })
    .then((response) => {
      form.reset();
      alert("Your Response Has Been Submitted. We will contact you soon.");

      // Remove the hidden input field after form submission
      form.removeChild(dateTimeInput);
    })
    .catch((error) => console.error("Error!", error.message));
});

form.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    form.dispatchEvent(new Event("submit"));
  }
});
