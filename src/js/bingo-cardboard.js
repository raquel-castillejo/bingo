import { numbersCardElement } from './dom';

// generar números del 1 al 99
/* let numbersToPlay = Array(99)
	.fill()
	.map((_, index) => index + 1); */
export const numbersToPlay = () => {
	return Array(99)
		.fill()
		.map((_, index) => index + 1);
};

// imprimir todos los números en el cartón de números
export const printNumbersCardboard = numbersToPlay => {
	const fragment = document.createDocumentFragment();

	numbersToPlay.forEach(number => {
		const numberElement = document.createElement('span');
		numberElement.classList.add('numbers-card__cell');
		numberElement.dataset.number = number;
		numberElement.textContent = number;
		fragment.append(numberElement);
	});

	numbersCardElement.append(fragment);
};
