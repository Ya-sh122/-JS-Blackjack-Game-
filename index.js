let player = {
    name: "Yako",
    chips: 145
}

let cards = []
let sum = 0
let hasBlackjack = false
let isAlive = false
let message= ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")


let playerEl = document.getElementById("player-el")
playerEl.textContent = player.name +": $"+ player.chips


function getRandomCard() {
    const cardValue = Math.floor(Math.random() * 13) + 1; // Random number between 1 and 13

    // Card values for Blackjack
    let value = cardValue; 
    if (cardValue > 10) value = 10; // Face cards (Jack, Queen, King)
    if (cardValue === 1) value = 11; // Ace

    return {
        value: value,
        image: `images/cards/cards ${cardValue}.png` // Use image corresponding to the card value
    };
}

function startGame() {
    // Reset game state
    cards = [];
    sum = 0;
    hasBlackjack = false;
    isAlive = true;

    // Draw two new cards
    const firstCard = getRandomCard();
    const secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard.value + secondCard.value;

    renderGame();
}

function renderGame() {
    cardsEl.textContent = "Cards:";
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = ""; // Clear previous cards

    for (let i = 0; i < cards.length; i++) {
        // Display card value
        cardsEl.textContent += cards[i].value + " ";

        // Display card image
        const cardImg = document.createElement("img");
        cardImg.src = cards[i].image;
        cardImg.alt = `Cards ${cards[i].value}`; // Add alt text for debugging
        cardImg.onerror = () => console.error(`Failed to load ${cards[i].image}`); // Log errors
        cardsContainer.appendChild(cardImg);
    }

    sumEl.textContent = "Sum: " + sum;
    if (sum <= 20) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackjack = true;
    } else {
        message = "You're out of the game!";
        isAlive = false;
    }
    messageEl.textContent = message;
}

function newCard() {
    if (isAlive && !hasBlackjack) {
        const card = getRandomCard();
        sum += card.value;
        cards.push(card);
        renderGame();
    }
}


// function newCard(){
//     if(isAlive === true && hasBlackjack === false){
//     let card= getRandomCard();
//     sum += card
//     cards.push(card)
//     renderGame()
//     }
// }

 