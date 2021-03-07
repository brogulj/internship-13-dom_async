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

function hash(s) {
    var a = 1, c = 0, h, o;
    if (s) {
        a = 0;
        for (h = s.length - 1; h >= 0; h--) {
            o = s.charCodeAt(h);
            a = (a<<6&268435455) + o + (o<<14);
            c = a & 266338304;
            a = c!==0?a^c>>21:a;
        }
    }
    return String(a);
};