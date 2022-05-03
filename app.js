const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');
let playerLives = 6;

//link text 
playerLivesCount.textContent = playerLives

//generate the data
const getData = () => [
    { imgSrc: "./img/chewie.jpg", name: "chewie" },
    { imgSrc: "./img/fett.jpeg", name: "fett" },
    { imgSrc: "./img/han.jpg", name: "han" },
    { imgSrc: "./img/leia.jpg", name: "leia" },
    { imgSrc: "./img/luke.jpg", name: "luke" },
    { imgSrc: "./img/stormtrooper.jpg", name: "stormtrooper" },
    { imgSrc: "./img/vader.jpg", name: "vader" },
    { imgSrc: "./img/yoda.jpeg", name: "yoda" },
    { imgSrc: "./img/chewie.jpg", name: "chewie" },
    { imgSrc: "./img/fett.jpeg", name: "fett" },
    { imgSrc: "./img/han.jpg", name: "han" },
    { imgSrc: "./img/leia.jpg", name: "leia" },
    { imgSrc: "./img/luke.jpg", name: "luke" },
    { imgSrc: "./img/stormtrooper.jpg", name: "stormtrooper" },
    { imgSrc: "./img/vader.jpg", name: "vader" },
    { imgSrc: "./img/yoda.jpeg", name: "yoda" },
];

//randomize pictures
const randomize = () => {
    const cardData = getData();     //saves the array to cardData
    //randomize array
    cardData.sort(() => Math.random() - 0.5);
    return cardData;    //function runs and returns new version of cardData
};

//Card generator function HTML
const cardGenerator = () => {
    const cardData = randomize();   //returns randomized array
    //generate html
    //create an element for each image
    cardData.forEach(item => {      //item gives us access to each individual object in the array
        const card = document.createElement('div');     //div for a card
        const face = document.createElement('img');     //face of the card
        const back = document.createElement('img');     //back of the card
        //adding classes
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';
        //attach the img to the cards
        face.src = item.imgSrc;     //grabbing each face/img element from above and setting the src to the one from array 
        card.setAttribute('name', item.name);   //gives each item 'name' attribute. Lets us select a specific card
        back.setAttribute("src", "./img/backCard.jpg");    
        //attach the cards to the section
        section.appendChild(card);  //card is the child of section
        card.appendChild(face);     //face and back is the child of card div
        card.appendChild(back);
        //toggle card everytime you click on it. 'toggleCard' class added in css
        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            //function that checkes which card was clicked. Declared below
            checkCards(e);
        })
    });
};

//Check if cards match
const checkCards = (e) => {
    const clickedCard = e.target;   //'e' is going to capture some data and 'target' is the element we click on
    clickedCard.classList.add('flipped');   //changes the class of every card thats been flipped
    const flippedCards = document.querySelectorAll('.flipped');     //selects cards with class 'flipped' all the ones that were selected/flipped
    const toggleCard = document.querySelectorAll('.toggleCard');
    //logic
    if(flippedCards.length === 2) {     //if 2 cards are flipped then do...
        if(flippedCards[0].getAttribute('name') === flippedCards[1].getAttribute('name')){  //if 'name' of index0 is the same as 'name' of index1 then...
            //remove 'flipped' class from the card + add pointer event none - meaning that we wont be able to click on it again
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = 'none';
            });
        }   else {
            //remove 'flipped' class from the card. Flips them to back side if incorrect
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                setTimeout(() => card.classList.remove('toggleCard'), 1000);
            });
            //every time we are wrong, take one live down and update the UI
            playerLives--;
            playerLivesCount.textContent = playerLives;     
            //if lives0 then run restart function
            if(playerLives === 0){
                restart("Do, or do not, there is no try.");
            }
        }
    }
    //run a check if we won the game
    if(toggleCard.length === 16){
        restart("The force is strong with this one")
    }
};  //logic explained: every time we click on a card it changes its class to 'flipped' and adds it to 'flippedCards' variable. Then, if flippedCards length is 2 cards - meaning that if two cards are flipped, it checks if 'name' attribute is the same.
    //if name attribute is the same - remove flipped attribute and add pointer even none. Wont flip back - wont be able to click on it again.
    //if name attribute is not the same - removes 'toggleCard' after 1 sec. Flips it back to the back side.

//Restart Game
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    section.style.pointerEvents = 'none';
    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggleCard');
        //randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name);
            section.style.pointerEvents = 'all';
        }, 1000);

    });
    //update lives
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
};


cardGenerator();