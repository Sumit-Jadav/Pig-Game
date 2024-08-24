'use strict';

//! ========== selecting elements ==========
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score_0 = document.getElementById('score--0');
const score_1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btn_new = document.querySelector('.btn--new');
const btn_hold = document.querySelector('.btn--hold');
const btn_roll = document.querySelector('.btn--roll');
const current_0 = document.getElementById('current--0');
const current_1 = document.getElementById('current--1');

//! ========== Starting Condition ==========
score_0.textContent = 0;
score_1.textContent = 0;
current_0.textContent = 0;
current_1.textContent = 0;

//! ========== variable declaring ==========

let currentScore, playing, activePlayer, finalScores;

//! ========== Functions=============
const changePlayer = () => {
  //todo:- when changing the player currentscore should br changed to 0 and previous player score should also be 0.

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  //todo :- changing active player

  activePlayer = activePlayer === 0 ? 1 : 0;

  //todo :- after changing the active player we also need to visually focus on the new active player to do that :-
  player0.classList.toggle('player--active'); //! toggle method will revome the class "player--active" if that is present in player0 and add it if it is not present.
  player1.classList.toggle('player--active'); //! We should change visual appearence of both the player so we also need to change class "player--active" for player1
};

const init = () => {
  activePlayer = 0; //! 0 means player-1 and 1 means player-2 is active
  finalScores = [0, 0]; //! holds the total final scores
  playing = true; //! to stop the user from using hold and roll button when game is finished
  currentScore = 0;
  score_0.textContent = 0;
  score_1.textContent = 0;
  current_0.textContent = 0;
  current_1.textContent = 0;
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

init(); //! declaring all the initial condition

//! ========== Manin Logic ==========
btn_roll.addEventListener('click', () => {
  if (playing) {
    //todo generating dice number

    const diceNum = Math.trunc(Math.random() * 6 + 1);

    //todo displaying dice

    dice.src = `dice-${diceNum}.png`;
    dice.classList.remove('hidden');

    //todo checking if it is 1 : if true then switch player

    if (diceNum !== 1) {
      //todo add dice number to current score
      currentScore += diceNum;

      //todo :- change score of active player dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }
  }
});

btn_hold.addEventListener('click', () => {
  if (playing) {
    //todo:- To add currentScore to the totalScore
    finalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      finalScores[activePlayer];
    //todo :- If currentscore>=100 finish the game

    if (finalScores[activePlayer] >= 100) {
      playing = false;
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //todo :- Change the active player
      changePlayer();
    }
  }
});

//todo :- To reset the game
btn_new.addEventListener('click', init);
