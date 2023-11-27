// https://doriandesings.github.io/bingo-vanilla/

/*
LÓGICA
======
- generar los cartones
    - función para los DOS cartones de jugadores 
    - función para generar 99 números
    - función para el cartón de números

- función que genere numeros aleatorios de 1 a 99 y los mete en un array
- la función para si uno de los cartones se ha completado

- con otra función recorres el array y
    - los vas pintando en el cartón de 99 números
    - compruebas si está en cada cartón y lo pintas

- 
*/

// DOM
// ===
const playerOneElement = document.getElementById('player-1');
const playerTwoElement = document.getElementById('player-2');
const numbersCardElement = document.getElementById('player-2');

// FUNCIONES
// =========
// generar números del 1 al 99
const numbersToPlay = Array(99)
	.fill()
	.map((_, index) => index + 1);

// pintar todos los números en el cartón de números
const printNumbersCardboard = numbersToPlay => {
	const fragment = document.createDocumentFragment();

	numbersToPlay.forEach(number => {
		const numberElement = document.createElement('span');
		numberElement.textContent = number;
		fragment.append(numberElement);
	});

	numbersCardElement.append(fragment);
};
printNumbersCardboard(numbersToPlay);

// seleccionar un número específico de los cartones
/*
// usar este método:
const generateRandomNumber = () => {
    return Math.floor(Math.random() * 11);
}
const selectedNumber = generateRandomNumber();
const element = document.querySelector(`span[data-number='${selectedNumber}']`)
element.classList.add("red")
*/
