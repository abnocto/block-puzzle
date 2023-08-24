import {FIGURE_PATTERNS} from '../../constants';
import {Cell} from './Cell';
import {Coords} from './Coords';
import type {FigureDto} from '../../types';

export class Figure {
	private static ID = 1;

	constructor(
		private readonly _id: number,
		private readonly _cells: Cell[][],
		private readonly _score: number
	) {}

	static getRandom() {
		const pattern = FIGURE_PATTERNS[Math.floor(Math.random() * FIGURE_PATTERNS.length)];

		return Figure._parse(pattern);
	}

	private static _parse(pattern: string) {
		const cells = pattern
			.split('/')
			.map((linePattern, y) =>
				linePattern
					.split('')
					.map((cellFilledFlag, x) =>
						new Cell(x, y, Boolean(Number(cellFilledFlag)))
					)
			);

		const score = pattern.match(/1/g)!.length;

		return new Figure(Figure.ID++, cells, score);
	}

	getMappedCoords(coords: Coords) {
		return this._cells
			.reduce((allCells, line) => [...allCells, ...line], [])
			.filter((cell) => cell.isFilled())
			.map((filledCell) =>
				new Coords(
					coords.getX() + filledCell.getX(),
					coords.getY() + filledCell.getY()
				)
			);
	}

	getId() {
		return this._id;
	}

	getScore() {
		return this._score;
	}

	toDto(): FigureDto {
		return {
			id: this._id,
			cells: this._cells.map((line) =>
				line.map((cell) => cell.toDto())
			),
			score: this._score
		};
	}

	static fromDto(dto: FigureDto) {
		return new Figure(
			dto.id,
			dto.cells.map((line) =>
				line.map((cell) => Cell.fromDto(cell))
			),
			dto.score
		);
	}
}
