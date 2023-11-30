import { numbersToPlay } from './bingo-cardboard';
import {
	bingoContainer,
	numbersCardElement,
	playerOneElement,
	playerTwoElement,
	restartButton,
	startButton,
	whatNumber
} from './dom';
import { pickBingoNumber } from './pick-numbers';
import { printBingo } from './print-bingo';
import { isWinner, printWinnerLoser } from './winner';

// juego
export const startGame = () => {
	const numbersCopy = numbersToPlay();

	bingoContainer.append(whatNumber);
	whatNumber.classList.add('bingo__number');
	startButton.remove();

	const pickingNumbers = setInterval(() => {
		whatNumber.textContent = `Number: ${pickBingoNumber(numbersCopy)}`;

		if (isWinner(playerOneElement)) {
			clearInterval(pickingNumbers);
			printWinnerLoser(playerOneElement, playerTwoElement);
		}

		if (isWinner(playerTwoElement)) {
			clearInterval(pickingNumbers);
			printWinnerLoser(playerTwoElement, playerOneElement);
		}
	}, 500);
};

// reiniciar el juego
export const restartGame = () => {
	restartButton.remove();
	playerOneElement.textContent = '';
	playerTwoElement.textContent = '';
	numbersCardElement.textContent = '';

	printBingo();
	startGame();
};
