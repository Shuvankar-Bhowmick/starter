'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const curr0El = document.getElementById('current--0');
const curr1E1 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
//Starting conditions: sets the content of the scores to 0
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currScore = 0;
let activePlayer = 0;
let playing = true; //to tell the status about if the game is being played or not

const switchPlayer = function () {
  document.getElementById('current--' + activePlayer).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //Add dice number to the current score
      currScore += dice;
      document.getElementById('current--' + activePlayer).textContent = currScore;
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's current score
    scores[activePlayer] += currScore;
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  if (!playing) playing = true;

  scores[0] = 0;
  scores[1] = 0;
  currScore = 0;
  if (!diceEl.classList.contains('hidden')) {
    diceEl.classList.add('hidden');
  }
  // 1. Remove the winner desing
  document.querySelector(`.player--${activePlayer}`).classList.remove(`player--winner`);
  // 2. Add the active player desing to player 0
  activePlayer = 0;
  document.querySelector(`.player--${activePlayer}`).classList.add(`player--active`);

  //set all the parameters to zero
  score0El.textContent = 0;
  score1El.textContent = 0;
  curr0El.textContent = 0;
  curr1E1.textContent = 0;
});
