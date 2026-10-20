const form = document.getElementById("loginForm");

const email = document.getElementById("email");
const password = document.getElementById("password");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const loginButton = document.getElementById("loginButton");
const successMessage = document.getElementById("successMessage");

const togglePassword = document.getElementById("togglePassword");


// Show / Hide Password
togglePassword.addEventListener("click", () => {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        password.type = "password";
        togglePassword.textContent = "Show";
    }

});


// Login Form
form.addEventListener("submit", (event) => {

    event.preventDefault();

    // Clear old messages
    emailError.textContent = "";
    passwordError.textContent = "";
    successMessage.style.display = "none";

    let isValid = true;


    // =========================
    // EMAIL VALIDATION
    // =========================

    if (email.value.trim() === "") {

        emailError.textContent = "Email is required.";
        isValid = false;

    } else if (!email.value.includes("@")) {

        emailError.textContent = "Enter a valid email address.";
        isValid = false;

    }


    // =========================
    // PASSWORD VALIDATION
    // =========================

    if (password.value.trim() === "") {

        passwordError.textContent = "Password is required.";
        isValid = false;

    } else if (password.value.length < 6) {

        passwordError.textContent =
            "Password must be at least 6 characters.";

        isValid = false;

    }


    // =========================
    // STOP IF INVALID
    // =========================

    if (!isValid) {
        return;
    }


    // =========================
    // LOADING
    // =========================

    loginButton.classList.add("loading");
    loginButton.disabled = true;


    // =========================
    // SIMULATED LOGIN
    // =========================

    setTimeout(() => {

        loginButton.classList.remove("loading");
        loginButton.disabled = false;

        successMessage.style.display = "block";


    }, 1200);

});