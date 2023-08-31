import type {CoordsDto} from '../../types';

export class Coords {
	constructor(
		private readonly _x: number,
		private readonly _y: number
	) {}

	getX() {
		return this._x;
	}

	getY() {
		return this._y;
	}

	toDto(): CoordsDto {
		return {
			x: this._x,
			y: this._y
		};
	}

	static fromDto(dto: CoordsDto) {
		return new Coords(dto.x, dto.y);
	}
}
