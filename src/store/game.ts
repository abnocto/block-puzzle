import {writable} from 'svelte/store';
import {Game} from './entities/Game';
import {DraggedFigure} from './entities/DraggedFigure';
import {Coords} from './entities/Coords';
import type {DraggedFigureDto, CoordsDto, State} from '../types';

export const createGameStore = () => {
	const game = new Game();

	const {subscribe, set} = writable<State>(game.getState());

	return {
		subscribe,

		setDraggedFigure: (dto: DraggedFigureDto) => {
			game.setDraggedFigure(DraggedFigure.fromDto(dto));
			set(game.getState());
		},

		addDraggedFigureToBoard: (dto: CoordsDto) => {
			game.addDraggedFigureToBoard(Coords.fromDto(dto));
			set(game.getState());
		}
	};
};
