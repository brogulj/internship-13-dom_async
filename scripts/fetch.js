const apiUrl = "https://icanhazdadjoke.com/";
async function getJoke() {
    let joke = fetch(apiUrl, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => (response = response.json()))
        .then((data) => {
            document.querySelector("p.joke__text").innerHTML = data.joke;
            document.querySelector("p.joke__id").innerHTML = data.id;
            localStorage.setItem(
                "currentJoke",
                JSON.stringify({ id: data.id, joke: data.joke })
            );
        });
    let result = await joke;
    return result;
}
