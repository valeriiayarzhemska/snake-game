import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IGlobalState } from '../../store/reducers';
import { IObjectBody, clearBoard, drawObject, generateNotification, generateRandomPosition, handleSnakesBite } from '../../utils/utils';
import {
  increaseSnake,
  INCREMENT_SCORE,
  makeMove,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  resetGame,
  RESET_SCORE,
  scoreUpdates,
  stopGame,
} from '../../store/actions';
import { Rules } from '../Rules';
import { GameButtons } from '../GameButtons';
import { updateUser } from '../../api/requests';
import { blueColor, mintColor, pinkColor, purpleColor } from '../../utils/constants.ts';

export interface ICanvasBoard {
  height: number;
  width: number;
}

export const CanvasBoard = ({ height, width }: ICanvasBoard) => {
  const snakeBody = useSelector((state: IGlobalState) => state.snake);
  const disallowedDirection = useSelector(
    (state: IGlobalState) => state.disallowedDirection
  );
  const score = useSelector((state: IGlobalState) => state.score);
  const dispatch = useDispatch();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [position, setPosition] = useState<IObjectBody>(
    generateRandomPosition(width - 20, height - 20)
	);
  const [isEaten, setIsEaten] = useState<boolean>(false);
  const [isGameEnded, setIsGameEnded] = useState<boolean>(false);
  const [showRules, setShowRules] = useState(false);

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  const moveSnake = useCallback(
    (x = 0, y = 0, direction: string) => {
      if (x > 0 && y === 0 && direction !== 'RIGHT') {
        dispatch(makeMove(x, y, MOVE_RIGHT));
      }

      if (x < 0 && y === 0 && direction !== 'LEFT') {
        dispatch(makeMove(x, y, MOVE_LEFT));
      }

      if (x === 0 && y < 0 && direction !== 'UP') {
        dispatch(makeMove(x, y, MOVE_UP));
      }

      if (x === 0 && y > 0 && direction !== 'DOWN') {
        dispatch(makeMove(x, y, MOVE_DOWN));
      }
    },
    [dispatch]
  );
  
  const handleKeyEvents = useCallback(
    (e: KeyboardEvent) => {
      if (disallowedDirection) {
        switch (e.key) {
          case 'w':
            moveSnake(0, -20, disallowedDirection);
            break;

          case 's':
            moveSnake(0, 20, disallowedDirection);
            break;

          case 'a':
            moveSnake(-20, 0, disallowedDirection);
            break;

          case 'd':
            e.preventDefault();
            moveSnake(20, 0, disallowedDirection);
            break;
        }
      } else {
        if (
          disallowedDirection !== 'LEFT' &&
          disallowedDirection !== 'UP' &&
          disallowedDirection !== 'DOWN' &&
          e.key === 'd'
        ) {
          moveSnake(20, 0, disallowedDirection);
        }
      }
    },
    [disallowedDirection, moveSnake]
  );

  const resetBoard = useCallback(() => {
    window.removeEventListener("keypress", handleKeyEvents);

    dispatch(resetGame());
    dispatch(scoreUpdates(RESET_SCORE));
    clearBoard(context);

    drawObject(context, snakeBody, mintColor);
    drawObject(
      context,
      [generateRandomPosition(width - 20, height - 20)],
      blueColor
    );

    window.addEventListener("keypress", handleKeyEvents);
  }, [context, dispatch, handleKeyEvents, height, snakeBody, width]);

  const updateScore = useCallback(async () => {
    const userId = localStorage.getItem('user');

    if (userId) {
      generateNotification({
        text: 'We are upgrading your score...',
        type: 'loading',
      });

      try {
        await updateUser(userId, { score });

        generateNotification({
          text: 'Score was upgraded!',
          type: 'success',
        });
        console.log('succes');
      } catch (error) {
        generateNotification({
          text: 'Something went wrong, score was not upgraded',
          type: 'success',
        });

        console.log(error);
      }
    }
  }, [score]);

  useEffect(() => {
    if (isEaten) {
      const fruitPosition = generateRandomPosition(width - 20, height - 20);
      
      setPosition(fruitPosition);
      setIsEaten(false);

      dispatch(increaseSnake());
      dispatch(scoreUpdates(INCREMENT_SCORE));
    }
  }, [isEaten, position, height, width, dispatch]);

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
  
    clearBoard(context);
    drawObject(context, snakeBody, mintColor);
    drawObject(context, [position], pinkColor);

    if (snakeBody[0].x === position?.x && snakeBody[0].y === position?.y) {
      setIsEaten(true);
    }

    if (handleSnakesBite(snakeBody, snakeBody[0])
      || snakeBody[0].x >= width
      || snakeBody[0].x <= 0
      || snakeBody[0].y <= 0
      || snakeBody[0].y >= height
    ) {
      setIsGameEnded(true);
      dispatch(stopGame());
      updateScore();

      window.removeEventListener("keypress", handleKeyEvents);
    } else {
      setIsGameEnded(false)
    };
  }, [context, position, snakeBody, height, width, dispatch, handleKeyEvents, updateScore]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyEvents);

    return () => {
      window.removeEventListener("keypress", handleKeyEvents);
    };
  }, [disallowedDirection, handleKeyEvents]);

  return (
    <>
      <GameButtons
        toggleRules={toggleRules}
        resetBoard={resetBoard}
      />

      {showRules && (
        <Rules toggleRules={toggleRules} />
      )}

      <canvas
        ref={canvasRef}
        style={{
          border: `3px solid ${isGameEnded ? pinkColor : purpleColor}`,
          marginTop: "20px"
        }}
        height={height}
        width={width}
      />
    </>
  );
};
