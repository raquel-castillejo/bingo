import { numbersToPlay, printNumbersCardboard } from './bingo-cardboard';
import { playerOneElement, playerTwoElement } from './dom';
import { printPlayerCard } from './player-cards';

// imprimir el juego
export const printBingo = () => {
	const numbers = numbersToPlay();
	printNumbersCardboard(numbers);

	printPlayerCard(playerOneElement);
	printPlayerCard(playerTwoElement);
};
