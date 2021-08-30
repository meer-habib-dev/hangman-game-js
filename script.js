
//getting the all dom elements 
const wordEl = document.getElementById('word');
const wrongLetterEl = document.getElementById('wrong-letter');
const playAgain= document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['programming', 'codding', 'application', 'bugs', 'errors','interface','wizard'];
let selectedWords = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// display the words of game 
function displayWord() {

    wordEl.innerHTML = `
    ${selectedWords.split('').map(letter => `
    <span class = 'letter'>
    ${correctLetters.includes(letter) ? letter : ''}
    </span>
    `
    )
    .join('')}   
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');
    if (innerWord === selectedWords) {
        finalMessage.innerText = 'Congratulations! You Won!!!👏🙌';
        popup.style.display = 'flex';
    }
}

//update the wrong letters 
function updateWrongLetterEl() {

    // display wrong letters 
    wrongLetterEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `
    //display parts  
    figureParts.forEach((part, index) => {
        const error = wrongLetters.length;
        if (index < error) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    //check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Unfortunately you have Lost!!!'
        popup.style.display = 'flex'; 
    }
}

// show the notification 
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show')
    }, 2000)
}

//keydown letter press
window.addEventListener('keydown', (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;
        if (selectedWords.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetterEl();
            } else {
                showNotification();
            }
        }
    }
});

// reset game and play again 
playAgain.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWords = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLetterEl();
    popup.style.display = 'none';
})

displayWord()