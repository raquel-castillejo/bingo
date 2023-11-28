// https://doriandesings.github.io/bingo-vanilla/

/*
LÓGICA
======
- ✅ generar los cartones
    - ✅ función para los DOS cartones de jugadores 
    - ✅ función para generar 99 números
    - ✅ función para el cartón de números

- ✅ función que genere numeros aleatorios de 1 a 99 y los mete en un array
- la función para si uno de los cartones se ha completado

- con otra función recorres el array y
    - los vas pintando en el cartón de 99 números
    - compruebas si está en cada cartón y lo pintas
*/

// DOM
// ===
const playerOneElement = document.getElementById('player-1');
const playerTwoElement = document.getElementById('player-2');
const numbersCardElement = document.getElementById('numbers-cardboard');
const startButton = document.getElementById('start');

// FUNCIONES
// =========
// random
const randomNumber = max => {
	return Math.floor(Math.random() * max);
};

// generar números del 1 al 99
let numbersToPlay = Array(99)
	.fill()
	.map((_, index) => index + 1);

// imprimir todos los números en el cartón de números
const printNumbersCardboard = numbersToPlay => {
	const fragment = document.createDocumentFragment();

	numbersToPlay.forEach(number => {
		const numberElement = document.createElement('span');
		numberElement.classList.add('cell');
		numberElement.dataset.number = number;
		numberElement.textContent = number;
		fragment.append(numberElement);
	});

	numbersCardElement.append(fragment);
};

// generar 15 números aleatorios para los cartones
const generatePlayerNumbers = () => {
	const numbersArr = [];

	while (numbersArr.length < 15) {
		const newNumber = randomNumber(99);
		if (!numbersArr.includes(newNumber)) {
			numbersArr.push(newNumber);
		}
	}
	return numbersArr;
};

// imprimir los cartones de jugadores
const printPlayerCard = playerCard => {
	const fragment = document.createDocumentFragment();
	const playerNumbers = generatePlayerNumbers();

	for (let index = 0; index < playerNumbers.length; index++) {
		const newSpan = document.createElement('span');
		newSpan.classList.add('cell-player');
		newSpan.dataset.number = playerNumbers[index];
		newSpan.textContent = playerNumbers[index];

		fragment.append(newSpan);
	}

	playerCard.append(fragment);
	return playerNumbers;
};

// imprimir el juego
const printBingo = () => {
	printNumbersCardboard(numbersToPlay);

	const playerOneNumbers = printPlayerCard(playerOneElement);
	const playerTwoNumbers = printPlayerCard(playerTwoElement);

	console.log(playerOneNumbers);
	console.log(playerTwoNumbers);
};

printBingo();

// selecciona un número aleatorio de la lista de números
const selectNumber = numbersList =>
	numbersList[randomNumber(numbersList.length)];

// comprobar si ha ganado alguien
const isWinner = player => {
	const playerCardNumbers = [...player.children];
	const winner = playerCardNumbers.every(number =>
		number.classList.contains('check')
	);
	return winner;
};

// pintar números sacados en el bingo
const paintBingoNumbers = numberToPaint => {
	const elements = document.querySelectorAll(
		`span[data-number='${numberToPaint}']`
	);
	elements.forEach(element => {
		element.classList.add('check');
	});
};

// sacar un número del bingo
const pickBingoNumber = () => {
	const selectedNumber = selectNumber(numbersToPlay);
	const selectedNumberIndex = numbersToPlay.indexOf(selectedNumber);
	numbersToPlay.splice(selectedNumberIndex, 1);

	paintBingoNumbers(selectedNumber);
};

// juego
const startGame = () => {
	const pickingNumbers = setInterval(() => {
		pickBingoNumber();

		if (isWinner(playerOneElement)) {
			clearInterval(pickingNumbers);
			console.log('PLAYER ONE');
		}

		if (isWinner(playerTwoElement)) {
			clearInterval(pickingNumbers);
			console.log('PLAYER TWO');
		}
	}, 700);
};

// EVENTOS
// =======
startButton.addEventListener('click', startGame);
