/*
Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
Superbonus 1
Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.
Superbonus 2
Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.

`<div class="square"></div>`
*/

const levelForm = document.getElementById('levelForm');
levelForm.addEventListener('submit', play);

//disegna le celle
function drawSquare(content, numSquares) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `calc(100% / ${numSquares})`;
    square.style.height = `calc(100% / ${numSquares})`;
    square.innerHTML = content;
    return square;
}

//genera numero random
function getRndNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//genera array delle bombe
function generateBombs(numbombs, max) {
    const bombs = [];
    while (bombs.length < numbombs){
        const bomb = getRndNumber(1, max);
        if (!bombs.includes(bomb)){
            bombs.push(bomb);
        }
    }
    return bombs;
}

function setMessage(message){
    const score = document.getElementById('score');
    score.innerHTML = message;
}

function play(e) {
    e.preventDefault();
    const playground = document.getElementById('playground');
    playground.innerHTML = '';
    let message = 'Seleziona la difficoltà e premi play';
    const NUM_BOMBS = 16;
    //prendo il livello
    const level = document.getElementById('level').value;
    //console.log(level)
    //impostare n celle a seconda del livello
    let squareNumbers;
    switch (level) {
        case 'easy':
            squareNumbers = 100;
            break;
        case 'medium':
            squareNumbers = 81;
            break;
        case 'hard':
            squareNumbers = 49;
            break;
    };
    //console.log(squareNumbers)

    //determino il n di celle per lato
    let squareForRow = Math.sqrt(squareNumbers);
    //console.log(squareForRow);
    //genera bombe
    const bombs = generateBombs(NUM_BOMBS, squareNumbers);
    //console.log(bombs);

    //per il numero di celle genero la cella
    for (let i = 1; i <= squareNumbers; i++) {
        const square = drawSquare(i, squareForRow);
        square.addEventListener('click', function () {
            if(bombs.includes(parseInt(this.innerHTML))){
                this.classList.add('unsafe');
                message = `HAI PERSO! Il tuo punteggio è: ${score}`;;        
            } else {
                this.classList.add('safe');
                score++;
                message = `Il tuo punteggio è: ${score}`;
            }
            setMessage(message);
        });
        playground.appendChild(square);
    }
}
