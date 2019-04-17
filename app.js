/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, previousDice, winningScore;

winningScore = 100;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDOM = document.querySelector('.dice');

        if (diceDOM.style.display === 'none') {
            diceDOM.style.display = 'block';
        }

        diceDOM.src = 'dice-' + dice + '.png';

        if (dice !== 1) {
            if (dice === previousDice && previousDice === 6) {
                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = '0';
                nextPlayer();
            }
            else {
                roundScore += dice;
                previousDice = dice;
                document.getElementById('current-' + activePlayer).textContent = roundScore;
            }
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.dice').style.display = 'none';

            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', newGame);

document.querySelector('.btn-settings').addEventListener('click', function() {
    document.querySelector('.game').style.display = 'none';
    document.querySelector('.settings').style.display = 'block';
    document.querySelector('.winning-score__input').value = winningScore;
});

document.querySelector('.btn-close').addEventListener('click', function() {
    document.querySelector('.settings').style.display = 'none';
    document.querySelector('.game').style.display = 'block';
});

document.querySelector('.btn-validate').addEventListener('click', function() {
    winningScore = document.querySelector('.winning-score__input').value;
    document.querySelector('.settings').style.display = 'none';
    document.querySelector('.game').style.display = 'block';
    newGame();
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // classList.toggle() -> remove the class if it is present, or add it if not
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

function newGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;    
    previousDice = 0;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';

    gamePlaying = true;
}