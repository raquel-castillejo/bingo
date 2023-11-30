// https://doriandesings.github.io/bingo-vanilla/

// DOM
// ===
const playerOneElement = document.getElementById('player-1');
const playerTwoElement = document.getElementById('player-2');
const numbersCardElement = document.getElementById('numbers-cardboard');
const bingoContainer = document.getElementById('bingo-container');
const startButton = document.getElementById('start');

// final
const whatNumber = document.createElement('span');
const winnerTxt = document.createElement('span');
const loserTxt = document.createElement('span');
const restartButton = document.createElement('button');

// FUNCIONES
// =========
// random
const randomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
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
		numberElement.classList.add('numbers-card__cell');
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
		const newNumber = randomNumber(1, 99);
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
		newSpan.classList.add('player-card__cell');
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
const pickBingoNumber = () => {
	const selectedNumber = selectNumber(numbersToPlay);
	const selectedNumberIndex = numbersToPlay.indexOf(selectedNumber);
	numbersToPlay.splice(selectedNumberIndex, 1);

	paintBingoNumbers(selectedNumber);
	return selectedNumber;
};

// comprobar si ha ganado alguien
const isWinner = player => {
	/*
	const playerCardNumbers = [...player.children];
	const winner = playerCardNumbers.every(number =>
		number.classList.contains("check")
	);
	*/

	const checked = player.querySelectorAll('span[class$="--check"]');

	if (checked.length === 15) {
		return player;
	}
};

// imprimir ganador
const printWinnerLoser = (winner, loser) => {
	winnerTxt.textContent = `Winner`;
	winnerTxt.classList.add('player-card__result');
	winner.append(winnerTxt);

	loserTxt.textContent = `Loser`;
	loserTxt.classList.add('player-card__result');
	loser.append(loserTxt);

	restartButton.textContent = 'restart';
	restartButton.classList.add('bingo__restart');
	bingoContainer.append(restartButton);
};

// juego
const startGame = () => {
	bingoContainer.append(whatNumber);
	whatNumber.classList.add('bingo__number');
	startButton.remove();

	const pickingNumbers = setInterval(() => {
		whatNumber.textContent = `Number: ${pickBingoNumber()}`;
		console.log(numbersToPlay);

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
const restartGame = () => {
	restartButton.remove();
	playerOneElement.textContent = '';
	playerTwoElement.textContent = '';
	numbersCardElement.textContent = '';

	numbersToPlay = Array(99)
		.fill()
		.map((_, index) => index + 1);
	printBingo();

	startGame();
};

// EVENTOS
// =======
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
