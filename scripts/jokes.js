const jokePrompt = document.querySelector("div.joke__prompt");
const gradeJoke = document.querySelector("div.grade__joke");
const getJokeButton = document.querySelector("button.get__joke");
const jokeText = document.querySelector("p.joke__text");
const jokeId = document.querySelector("p.joke__id");
const reviewButton = document.querySelector("button.review__button");
const jokeReview = document.querySelector("div.joke__review");
const reviewText = document.querySelector("p.review__text");
const reviewInfo = document.querySelector("p.review__info");
const confirmModal = document.querySelector("div.confirm__modal");
const overlay = document.querySelector("div.overlay");
let confirmDeletion = false;
let reviewIndex = 0;
let jokes = localStorage.getItem("jokes");
let currentJoke;
let reviewJoke;
getJoke();
overlay.style.display = "none";

function getJokeClickHandler() {
    hide(getJokeButton);
    show(jokePrompt);
    getJoke();
}

function saveClickHandler() {
    currentJoke = JSON.parse(localStorage.getItem("currentJoke"));
    show(gradeJoke);
}

function gradeClickHandler(event) {
    let grade = event.target.textContent;
    if (localStorage.getItem("jokes") === null) {
        let jokes = JSON.stringify([
            { id: currentJoke.id, joke: currentJoke.joke, grade: grade },
        ]);
        localStorage.setItem("jokes", jokes);
        displayReviewJoke(0);
    } else {
        let jokes = getJokesFromStorage();
        jokes.push({
            id: currentJoke.id,
            joke: currentJoke.joke,
            grade: grade,
        });
        jokes = JSON.stringify(jokes);
        localStorage.setItem("jokes", jokes);
    }
    
    getJoke();
    hide(gradeJoke);
}

function reviewClickHandler() {
    hide(reviewButton);
    show(jokeReview);
    reviewIndex = 0;
    displayReviewJoke(reviewIndex);
}

function previousClickHandler() {
    reviewIndex -= 1;
    if (reviewIndex < 0) {
        reviewIndex = getJokesFromStorage().length - 1;
    }

    displayReviewJoke(reviewIndex);
}

function nextClickHandler() {
    reviewIndex += 1;
    if (reviewIndex >= getJokesFromStorage().length) {
        reviewIndex = 0;
    }

    displayReviewJoke(reviewIndex);
}

function deleteClickHandler() {
    show(confirmModal);
    overlay.style.display = "block";
}

function stopReviewClickHandler() {
    show(reviewButton);
    hide(jokeReview);
}

function displayReviewJoke(index) {
    let jokes = getJokesFromStorage().sort((a, b) =>
        a.grade > b.grade ? -1 : b.grade > a.grade ? 1 : 0
    );

    if (jokes[0] == null) {
        reviewIndex = 0;
        reviewText.innerHTML = "There are no saved jokes";
        reviewInfo.innerHTML = "Please save some jokes so you can review them";
    } else {
        reviewJoke = jokes[index];
        reviewText.innerHTML = reviewJoke.joke;
        reviewInfo.innerHTML = `ID: ${reviewJoke.id} <br>Grade: ${reviewJoke.grade}`;
    }
}

function confirmDeletionClickHandler(event) {
    console.log(event)
    if (event.target.id == "Yes") {
        let jokes = getJokesFromStorage();
        if (jokes.length > 0) {
            jokes.splice(reviewIndex, 1);
            localStorage.setItem("jokes", JSON.stringify(jokes));
            nextClickHandler();
        }
    }

    hide(confirmModal);

    overlay.style.display = "none";
}
