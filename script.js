const cardsContainer = document.getElementById('cards-container')
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const currentEl = document.getElementById('current')
const showBtn = document.getElementById('show')
const hideBtn = document.getElementById('hide')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const addCardBtn = document.getElementById('add-card')
const clearBtn = document.getElementById('clear')
const addContainer = document.getElementById('add-container')

// Keep track of current card
let currentActiveCard = 0

// Store DOM cards
const cardsEl = []

// Store card data
const cardsData = [
    {
        question: "What must a variable begin with?",
        answer: "A letter, $ or _"
    },
    {
        question: "What is a variable?",
        answer: "A container for a piece of data"
    },
    {
        question: "Example of a case sensitive variable",
        answer: "aCaseSensitiveExample"
    }
]


// Create all cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index))
}

// Create a single card
function createCard(data,index) {
    const card = document.createElement('div')
    card.classList.add('card')

    if(index === 0) {
        card.classList.add('active')
    }

    card.innerHTML = `
    <div class="inner-card">
                <div class="inner-card-front">
                    <p>${data.question}</p>
                </div>
                <div class="inner-card-back">
                    <p>${data.answer}</p>
                </div>
            </div>
    `

    // Add to cardsEL 
    cardsEl.push(card)

    cardsContainer.appendChild(card)

}

createCards()