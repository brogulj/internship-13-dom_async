function hide(element) {
    element.classList.add("hide");
    element.classList.remove("show");
}

function show(element) {
    element.classList.add("show");
    element.classList.remove("hide");
}

function getJokesFromStorage() {
    return JSON.parse(localStorage.getItem("jokes"));
}
