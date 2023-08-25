export type Theme = 'light' | 'dark';

export type CoordsDto = {
	x: number;
	y: number;
};

export type CellDto = {
	coords: CoordsDto;
	filled: boolean;
	droppable: boolean;
};

export type BoardDto = {
	cells: CellDto[][];
};

export type FigureDto = {
	id: number;
	cells: CellDto[][];
	score: number;
};

export type DraggedFigureDto = {
	figure: FigureDto;
	coords: CoordsDto;
};

export type State = {
	highScore: number;
	score: number;
	board: BoardDto;
	figures: FigureDto[];
	isGameOver: boolean;
};
