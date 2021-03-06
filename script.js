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
const cardsData = getCardsData()


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

    // Add event listner to flip card
    card.addEventListener('click',() => card.classList.toggle('show-answer'))


    // Add to cardsEL 
    cardsEl.push(card)

    cardsContainer.appendChild(card)

    // Update current text
    updateCurrentText()

}

// Show number of cards
function updateCurrentText() {
    currentEl.innerText = `
    ${ currentActiveCard + 1} / ${cardsEl.length}
    `
}

// Get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'))
    return cards === null ? [] : cards
}

// set card data in local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards))
    window.location.reload()
}

createCards()

// Event listners

// Next button
nextButton.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left'

    currentActiveCard = currentActiveCard+1

    if(currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1
    }

    cardsEl[currentActiveCard].className = 'card active'

    updateCurrentText()
})

// previous button
prevButton.addEventListener('click',() => {
    cardsEl[currentActiveCard].className = 'card right'

    currentActiveCard = currentActiveCard-1

    if(currentActiveCard < 0) {
        currentActiveCard = 0
    }

    cardsEl[currentActiveCard].className = 'card active'

    updateCurrentText()
})

// show form button
showBtn.addEventListener('click', () => addContainer.classList.add('show'))

// hide form button
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'))

// add a new card to local storage
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value
    const answer = answerEl.value

    if(question.trim() && answer.trim()) {
        const newCard = { question, answer }

        createCard(newCard)

        questionEl.value = ''
        answerEl.value = ''

        addContainer.classList.remove('show')

        cardsData.push(newCard)
        setCardsData(cardsData)
    }
})

// clear all cards from local storage button
clearBtn.addEventListener('click', () => {
    localStorage.clear()
    cardsContainer.innerHTML = ''
    window.location.reload()
})
