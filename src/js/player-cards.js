import { randomNumber } from './utils';

// generar 15 números aleatorios para los cartones
const generatePlayerNumbers = () => {
	const numbersArr = [];

	while (numbersArr.length < 15) {
		const newNumber = randomNumber(1, 99);
		if (!numbersArr.includes(newNumber)) {
			numbersArr.push(newNumber);
		}
	}
	return numbersArr;
};

// imprimir los cartones de jugadores
export const printPlayerCard = playerCard => {
	const fragment = document.createDocumentFragment();
	const playerNumbers = generatePlayerNumbers();

	for (let index = 0; index < playerNumbers.length; index++) {
		const newSpan = document.createElement('span');
		newSpan.classList.add('player-card__cell');
		newSpan.dataset.number = playerNumbers[index];
		newSpan.textContent = playerNumbers[index];

		fragment.append(newSpan);
	}

	playerCard.append(fragment);
	return playerNumbers;
};
