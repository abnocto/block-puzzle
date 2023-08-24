import {Coords} from './Coords';
import type {CellDto} from '../../types';

export class Cell {
    private readonly _coords: Coords;

    constructor(
        x: number,
        y: number,
        private _filled: boolean = false,
		private _droppable: boolean = false
    ) {
        this._coords = new Coords(x, y);
    }

	getCoords() {
		return this._coords;
	}

	getX() {
		return this._coords.getX();
	}

	getY() {
		return this._coords.getY();
	}

	isFilled() {
		return this._filled;
	}

    fill() {
        this._filled = true;
    }

	clear() {
		this._filled = false;
	}

    setDroppable(droppable: boolean) {
        this._droppable = droppable;
    }

    toDto(): CellDto {
        return {
            coords: this._coords.toDto(),
            filled: this._filled,
            droppable: this._droppable
        };
    }

	static fromDto(dto: CellDto) {
		return new Cell(
			dto.coords.x,
			dto.coords.y,
			dto.filled,
			dto.droppable
		);
	}
}
