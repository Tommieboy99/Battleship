import './styles.css';
import { Game } from './game';

const game = new Game();
game.init();

/*
Stappen voor mezelf uitgeschreven:
1. Maak 2 spelers aan, "real" en "computer".
2. Laad de Gameboard board in de user interface. Voor elke index(boardCell) in de board array maak een html element aan.
3. Maak de boardCells met een schip erop voor de realPlayer zichtbaar en voor de computerPlayer niet.
4. Maak de missedShots en hitShots voor zowel de realPlayer als de comuterPlayer zichtbaar op het board.
5. Als je op het computer Board klikt moet er een aanval worden geregistreerd.
6. Zet een eventListener op de computerPlayerBoardContainer. Bij een klik gaat er een "attack" naar de computerPlayer gameboard.
7. Hoe weet de eventListener welke div(cell) is aangeklikt? Fixed.
8. De realPlayer mag maar 1x per ronde een cell aanvallen. Daarna is de computer aan de beurt.
9. De computer moet daarna een cell aanvallen.

*/
