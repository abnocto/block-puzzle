import {BOARD_SIZE} from '../../constants';
import {Cell} from './Cell';
import {Coords} from './Coords';
import {DraggedFigure} from './DraggedFigure';
import type {BoardDto} from '../../types';

export class Board {
	private readonly _cells: Cell[][];

	constructor() {
		this._cells = this._initCells();
	}

	private _initCells(): Cell[][] {
		return Array(BOARD_SIZE).fill([]).map((_, y) =>
			Array(BOARD_SIZE).fill({}).map((_, x) =>
				new Cell(x, y)
			)
		);
	}

	areDroppableCells(draggedFigure: DraggedFigure) {
		return this._cells.some((line) =>
			line.some((cell) =>
				this._canCellBeDroppable(cell, draggedFigure)
			)
		);
	}

	setDroppableCells(draggedFigure: DraggedFigure) {
		this._cells.forEach((line) => {
			line.forEach((cell) => {
				cell.setDroppable(this._canCellBeDroppable(cell, draggedFigure));
			});
		});
	}

	private _canCellBeDroppable(cell: Cell, draggedFigure: DraggedFigure) {
		const shiftedCoords = draggedFigure.getShiftedCoords(cell.getCoords());

		return shiftedCoords.every((coords) =>
			this._checkBounds(coords)
				&& !this._cells[coords.getY()][coords.getX()].isFilled()
		);
	}

	private _checkBounds(coords: Coords) {
		const x = coords.getX();
		const y = coords.getY();

		return x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;
	}

	fillCells(dropCoords: Coords, draggedFigure: DraggedFigure) {
		const shiftedDropCoords = draggedFigure.getShiftedCoords(dropCoords);

		shiftedDropCoords.forEach((coords) =>
			this._checkBounds(coords)
				&& this._cells[coords.getY()][coords.getX()].fill()
		);
	}

	getScoreForFilledLines() {
		return BOARD_SIZE * this._getFilledLines().length;
	}

	clearFilledLines() {
		this._getFilledLines()
			.forEach((line) =>
				line.forEach((cell) => cell.clear())
			);
	}

	private _getFilledLines() {
		return [
			...this._cells,
			...Array(BOARD_SIZE).fill([]).map((_, y) => this._cells.map((line) => line[y]))
		]
			.filter((line) => line.every((cell) => cell.isFilled()));
	}

	clearAllCells() {
		this._cells.forEach((line) =>
			line.forEach((cell) =>
				cell.clear()
			)
		);
	}

	toDto(): BoardDto {
		return {
			cells: this._cells.map((line) =>
				line.map((cell) => cell.toDto())
			)
		};
	}
}
