/*Validacion del login, guardar mail en session storage*/
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Evita el envío normal del formulario

            const emailInput = document.getElementById("mail").value;

            if (emailInput) {
                sessionStorage.setItem("userEmail", emailInput); // Guarda el correo en sessionStorage
                window.location.href = "home.html"; // Redirige a la pantalla principal
            }
        });
    }
});

/*Mostrar el mail que se puso en el login en todo form que tenga id email*/
document.addEventListener("DOMContentLoaded", function () {
    const emailField = document.getElementById("email");
    const savedEmail = sessionStorage.getItem("userEmail");

    if (emailField && savedEmail) {
        emailField.value = savedEmail;
    }
});

/*Logout del usuario*/
document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout");

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            sessionStorage.clear(); // Elimina todo el session y local Storage
            localStorage.clear();
            window.location.href = "login.html"; // Redirige al login
        });
    }
});