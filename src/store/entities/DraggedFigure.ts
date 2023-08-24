import {Coords} from './Coords';
import {Figure} from './Figure';
import type {DraggedFigureDto} from '../../types';

export class DraggedFigure {
	constructor(
		private readonly _figure: Figure,
		private readonly _coords: Coords
	) {}

	getShiftedCoords(coords: Coords) {
		return this._figure.getMappedCoords(coords)
			.map((coords) =>
				new Coords(
					coords.getX() - this._coords.getX(),
					coords.getY() - this._coords.getY()
				)
			);
	}

	compareFigure(figure: Figure) {
		return this._figure.getId() === figure.getId();
	}

	getScore() {
		return this._figure.getScore();
	}

	static fromDto(dto: DraggedFigureDto) {
		return new DraggedFigure(
			Figure.fromDto(dto.figure),
			Coords.fromDto(dto.coords)
		);
	}
}
