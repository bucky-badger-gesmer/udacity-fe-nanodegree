/*
 * Create a list that holds all of your cards
 */
let cardTypes = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function createCard(card) {
    return `<li class="card"><i class="fa ${card}"></i></li>`
}

function setThreeStars() {
    return `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>`
}

function setTwoStars() {
    return `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li>`
}

function setOneStar() {
    return `<li><i class="fa fa-star"></i></li><li><i class="fa fa-star-o"></i></li><li><i class="fa fa-star-o"></i></li>`
}

function resetTimer() {
    totalSeconds = 0;
    seconds.innerHTML = 00;
    minutes.innerHTML = 00;
}

function setTime() {
    ++totalSeconds;
    seconds.innerHTML = ':' + pad(totalSeconds % 60);
    minutes.innerHTML = pad(parseInt(totalSeconds / 60));
  }
  
function pad(val) {
    let valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function startGame() {
    clockId = setInterval(setTime, 1000);

    let deck = document.querySelector('.deck');
    let cardsHTML = shuffle(cardTypes).map(card => createCard(card));
    let starScore = document.querySelector('.stars');

    deck.innerHTML = cardsHTML.join('');
    starScore.innerHTML = setThreeStars();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let clockId;
startGame();
let cards = document.querySelectorAll('.card');
let movesDisplay = document.querySelector('.moves');
let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');

let openCards = [];
let matchedCards = [];
let totalSeconds = 0;
let moves = 0;
let stars = 3;

cards.forEach(card => {
    card.addEventListener('click', event => {
        // if card isn't opened or shown:
        if (!card.classList.contains('open') && !card.classList.contains('show')) {
            openCards.push(card);

            card.classList.add('open', 'show');

            // check if they match:
            if (openCards.length === 2) {
                setTimeout(() => {
                    moves += 1;
                    movesDisplay.innerHTML = moves;

                    if (moves > 10) {
                        const starScore = document.querySelector('.stars');
                        starScore.innerHTML = setTwoStars();
                        stars = 2;
                    }

                    if (moves > 16) {
                        const starScore = document.querySelector('.stars');
                        starScore.innerHTML = setOneStar();
                        stars = 1;
                    }

                    // if they don't match:
                    if (openCards[0].childNodes[0].classList[1] !== openCards[1].childNodes[0].classList[1]) {
                        openCards[0].classList.remove('open', 'show');
                        openCards[1].classList.remove('open', 'show');

                        openCards = [];
                    } else {
                        // they do match:
                        openCards[0].classList.add('match');
                        openCards[1].classList.add('match');

                        matchedCards.push(openCards[0]);
                        matchedCards.push(openCards[1]);

                        // matched all cards:
                        if (matchedCards.length === 16) {
                            modal.style.display = "block";
                            let timeResult = document.querySelector('.time-result');
                            timeResult.innerHTML = minutes.innerHTML + seconds.innerHTML;

                            let movesResult = document.querySelector('.moves-result');
                            movesResult.innerHTML = movesDisplay.innerHTML;

                            let starsResult = document.querySelector('.stars-result');
                            starsResult.innerHTML = stars;

                            clearInterval(clockId);
                        }

                        openCards = [];
                    }
                }, 500);
            }
        }
    });
});

let restart = document.querySelector('.restart');
restart.addEventListener('click', () => {
    location.reload();
});

// Get the modal
let modal = document.getElementById("myModal");

let playAgainBtn = document.querySelector('.play-again-btn');
playAgainBtn.addEventListener('click', () => {
    location.reload();
});
