// https://doriandesings.github.io/bingo-vanilla/

import { startGame } from './buttons';
import { startButton } from './dom';
import { printBingo } from './print-bingo';

printBingo();
startButton.addEventListener('click', startGame);
