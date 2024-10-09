document.addEventListener('DOMContentLoaded', () => {
    const choices = document.querySelectorAll('.player-choice');
    const compThrowImg = document.getElementById('computer-throw');
    const resultHeading = document.querySelector('.outcome h3');
    const resultParagraph = document.getElementById('outcome');

    let compThinkingTimer;

    choices.forEach(option => {
        option.addEventListener('click', () => {
            resetGame();
            option.classList.add('selected');
            const playerPick = option.getAttribute('data-choice');

            startCompThinking(() => {
                const compPick = getCompChoice();
                compThrowImg.src = 'images/' + compPick + '.PNG';
                compThrowImg.alt = compPick;

                const result = findWinner(playerPick, compPick);
                resultHeading.textContent = 'Outcome: ' + result; 
            });
        });
    });

    function startCompThinking(callback) {
        const options = ['rock', 'paper', 'scissors'];
        let index = 0;
        const thinkingDuration = 3000;
        const shuffleSpeed = 500;

        compThrowImg.src = 'images/question-mark.png';
        compThrowImg.alt = 'question-mark';

        compThinkingTimer = setInterval(() => {
            compThrowImg.src = 'images/' + options[index] + '.PNG';
            compThrowImg.alt = options[index];
            index = (index + 1) % options.length;
        }, shuffleSpeed);

        setTimeout(() => {
            clearInterval(compThinkingTimer);
            callback();
        }, thinkingDuration);
    }

    function getCompChoice() {
        const options = ['rock', 'paper', 'scissors'];
        const randomPick = Math.floor(Math.random() * options.length);
        return options[randomPick];
    }

    function findWinner(player, computer) {
        if (player === computer) {
            return "It's a tie!";
        } else if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'You win!';
        } else {
            return 'You lose!';
        }
    }

    function resetGame() {
        choices.forEach(option => option.classList.remove('selected'));
        compThrowImg.src = 'images/question-mark.png';
        compThrowImg.alt = 'question-mark';
        resultHeading.textContent = 'Outcome';
        resultParagraph.textContent = 'Pick your move to start!';
    }
});

