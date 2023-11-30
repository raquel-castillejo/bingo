import { restartGame } from './buttons';
import { bingoContainer, loserTxt, restartButton, winnerTxt } from './dom';

// comprobar si ha ganado alguien
export const isWinner = player => {
	const checked = player.querySelectorAll('span[class$="--check"]');

	if (checked.length === 15) {
		return player;
	}
};

// imprimir ganador
export const printWinnerLoser = (winner, loser) => {
	winnerTxt.textContent = `Winner`;
	winnerTxt.classList.add('player-card__result');
	winner.append(winnerTxt);

	loserTxt.textContent = `Loser`;
	loserTxt.classList.add('player-card__result');
	loser.append(loserTxt);

	restartButton.textContent = 'restart';
	restartButton.classList.add('bingo__restart');
	bingoContainer.append(restartButton);

	restartButton.addEventListener('click', restartGame);
};
