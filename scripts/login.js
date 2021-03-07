function registrationFormSubmit(form) {
    let errorMessage = document.querySelector("div.error__message");
    const username = form.querySelector("input[name = 'username']").value;
    const password = form.querySelector("input[name = 'password']").value;
    const repeatPassword = form.querySelector("input[name = 'repeatPassword']")
        .value;
    if (password === repeatPassword) {
        localStorage.setItem("username", username);
        localStorage.setItem("password", hash(password));
        if (window.confirm("Do you want to be redirected to the main site")) {
            location.href = "jokes.html";
        } else {
            location.reload();
        }
        localStorage.setItem("jokes", JSON.stringify([]));
    } else {
        if (errorMessage.classList.contains("hide")) {
            errorMessage.classList.remove("hide");
            errorMessage.classList.add("show");
        }
    }
}

function loginFormSubmit(form) {
    let errorMessage = document.querySelectorAll("div.error__message")[1];
    const username = form.querySelector("input[name = 'username']").value;
    const password = form.querySelector("input[name = 'password']").value;

    if (
        username === localStorage.getItem("username") &&
        hash(password) === localStorage.getItem("password")
    ) {
        location.href = "jokes.html";
    } else {
        if (errorMessage.classList.contains("hide")) {
            errorMessage.classList.remove("hide");
            errorMessage.classList.add("show");
        }
    }
}

(function determineDisplay() {
    const registration = document.querySelector("div.registration");
    const login = document.querySelector("div.login");
    if (localStorage.getItem("username") !== null) {
        registration.classList.remove("show");
        registration.classList.add("hide");
        login.classList.remove("hide");
        login.classList.add("show");
    }
})();
