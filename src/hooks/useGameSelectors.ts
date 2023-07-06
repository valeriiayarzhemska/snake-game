import { RootState, useAppSelector } from '../store';

export const useSnakeBody = () => {
  return useAppSelector((state: RootState) => state.game.snake);
};

export const useDisallowedDirection = () => {
  return useAppSelector((state: RootState) => state.game.disallowedDirection);
};

export const useScore = () => {
  return useAppSelector((state: RootState) => state.game.score);
};
