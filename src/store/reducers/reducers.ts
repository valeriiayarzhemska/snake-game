import { Reducer } from 'redux';
import {
  DOWN,
  INCREASE_SNAKE,
  INCREMENT_SCORE,
  ISnakeCoord,
  LEFT,
  RESET,
  RESET_SCORE,
  RIGHT,
  SET_DIS_DIRECTION,
  UP,
} from '../actions';

export interface IGlobalState {
  snake: ISnakeCoord[] | [];
  disallowedDirection: string;
  score: number;
}

const globalState: IGlobalState = {
  snake: [
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ],
  disallowedDirection: "",
  score: 0,
};

export const gameReducer: Reducer<IGlobalState, any> = (state = globalState, action) => {
  switch (action.type) {
    case RIGHT:
    case LEFT:
    case UP:
    case DOWN: {
      let newSnake = [...state.snake];

      newSnake = [{
        x: state.snake[0].x + action.payload[0],
        y: state.snake[0].y + action.payload[1],
      }, ...newSnake];

      newSnake.pop();

      return {
        ...state,
        snake: newSnake,
      };
    }

    case SET_DIS_DIRECTION:
      return { ...state, disallowedDirection: action.payload };

    case INCREASE_SNAKE:
      const snakeLength = state.snake.length;
      const lastPart = state.snake[snakeLength - 1];
      const secondLastPart = state.snake[snakeLength - 2];

      let newPart;

      if (lastPart.x === secondLastPart.x) {
        if (lastPart.y > secondLastPart.y) {
          newPart = {
            x: lastPart.x,
            y: lastPart.y + 20,
          };
        } else {
          newPart = {
            x: lastPart.x,
            y: lastPart.y - 20,
          };
        }
      } else {
        if (lastPart.x > secondLastPart.x) {
          newPart = {
            x: lastPart.x + 20,
            y: lastPart.y,
          };
        } else {
          newPart = {
            x: lastPart.x - 20,
            y: lastPart.y,
          };
        }
      }

      return {
        ...state,
        snake: [...state.snake, newPart],
      };

    case INCREMENT_SCORE:
      return {
        ...state,
        score: state.score + action.payload,
      };

    case RESET:
        return {
          ...state,
          snake: [
            { x: 580, y: 300 },
            { x: 560, y: 300 },
            { x: 540, y: 300 },
            { x: 520, y: 300 },
            { x: 500, y: 300 },
          ],
          disallowedDirection: ""
        };

    case RESET_SCORE:
      return { ...state, score: 0 };

    default:
      return state;
  }
};
