export const MOVE_RIGHT = 'MOVE_RIGHT';
export const MOVE_LEFT = 'MOVE_LEFT';
export const MOVE_UP = 'MOVE_UP';
export const MOVE_DOWN = 'MOVE_DOWN';

export const RIGHT = 'RIGHT';
export const LEFT = 'LEFT';
export const UP = 'UP';
export const DOWN = 'DOWN';

export const SET_DIS_DIRECTION = 'SET_DIS_DIRECTION';
export const RESET = 'RESET';
export const STOP_GAME = 'STOP_GAME';

export const INCREMENT_SCORE = 'INCREMENT_SCORE';
export const INCREASE_SNAKE = 'INCREASE_SNAKE';
export const RESET_SCORE = 'RESET_SCORE';

export interface ISnakeCoord {
  x: number;
  y: number;
}

export const setDisDirection = (direction: string) => ({
  type: SET_DIS_DIRECTION,
  payload: direction,
});

export const makeMove = (deltaX: number, deltaY: number, move: string) => ({
  type: move,
  payload: [deltaX, deltaY]
});

export const increaseSnake = () => ({ type: INCREASE_SNAKE });

export const scoreResets = (type: string) => ({ type });

export const scoreUpdates = (points: number) => ({
  type: INCREMENT_SCORE,
  payload: points,
});

export const stopGame = () => ({ type: STOP_GAME });

export const resetGame = () => ({ type: RESET });
