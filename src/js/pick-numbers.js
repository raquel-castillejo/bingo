import { randomNumber } from './utils';

// selecciona un número aleatorio de la lista de números
const selectNumber = numbersList =>
	numbersList[randomNumber(0, numbersList.length - 1)];

// pintar números sacados en el bingo
const paintBingoNumbers = numberToPaint => {
	const elements = document.querySelectorAll(
		`span[data-number='${numberToPaint}']`
	);
	elements.forEach(element => {
		if (element.parentElement.id === 'numbers-cardboard') {
			element.classList.add('numbers-card__cell--check');
		} else {
			element.classList.add('player-card__cell--check');
		}
	});
};

// sacar un número del bingo
export const pickBingoNumber = numbersList => {
	const selectedNumber = selectNumber(numbersList);
	const selectedNumberIndex = numbersList.indexOf(selectedNumber);
	numbersList.splice(selectedNumberIndex, 1);

	paintBingoNumbers(selectedNumber);
	return selectedNumber;
};
