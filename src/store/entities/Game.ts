import {FIGURE_AMOUNT, STORAGE_HIGH_SCORE} from '../../constants';
import {Coords} from './Coords';
import {Board} from './Board';
import {Figure} from './Figure';
import {DraggedFigure} from './DraggedFigure';
import type {State} from '../../types';

export class Game {
	private _highScore: number;
	private _score: number;
	private _board: Board;
	private _figures: Figure[];
	private _draggedFigure: DraggedFigure | null;
	private _isGameOver: boolean;

	constructor() {
		this._highScore = this._loadHighScore();
		this._score = 0;
		this._board = new Board();
		this._figures = this._generateFigures();
		this._draggedFigure = null;
		this._isGameOver = false;
	}

	private _loadHighScore() {
		return Number(localStorage.getItem(STORAGE_HIGH_SCORE));
	}

	private _generateFigures() {
		return Array(FIGURE_AMOUNT).fill([])
			.map(() => Figure.getRandom());
	}

	setDraggedFigure(draggedFigure: DraggedFigure) {
		this._draggedFigure = draggedFigure;
		this._board.setDroppableCells(this._draggedFigure!);
	}

	addDraggedFigureToBoard(dropCoords: Coords) {
		this._board.fillCells(dropCoords, this._draggedFigure!);
		this._updateScore();
		this._updateHighScore();
		this._board.clearFilledLines();
		this._updateFigures();
		this._draggedFigure = null;
		this._checkGameEnd();
	}

	private _updateScore() {
		this._score += this._draggedFigure!.getScore();
		this._score += this._board.getScoreForFilledLines();
	}

	private _updateHighScore() {
		if (this._score > this._highScore) {
			this._highScore = this._score;
			localStorage.setItem(STORAGE_HIGH_SCORE, this._highScore.toString());
		}
	}

	private _updateFigures() {
		this._figures = this._figures.filter((figure) => !this._draggedFigure!.compareFigure(figure));

		if (!this._figures.length) {
			this._figures = this._generateFigures();
		}
	}

	private _checkGameEnd() {
		const isGameEnd = this._figures.every((figure) =>
			figure.getDraggedFigures()
				.every((draggedFigure) => !this._board.areDroppableCells(draggedFigure))
		);

		if (isGameEnd) {
			this._board.clearAllCells();
			this._figures.forEach((figure) => figure.clearAllCells());
			this._isGameOver = true;
		}
	}

	getState(): State {
		return {
			highScore: this._highScore,
			score: this._score,
			board: this._board.toDto(),
			figures: this._figures.map((figure) => figure.toDto()),
			isGameOver: this._isGameOver
		};
	}
}
