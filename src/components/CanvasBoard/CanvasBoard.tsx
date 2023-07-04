import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import {
  IObjectBody,
  clearBoard,
  drawObject,
  generateRandomFeed,
  generateRandomPosition,
  handleSnakesBite,
} from '../../utils';

import {
  increaseSnake,
  makeMove,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  RESET_SCORE,
  resetGame,
  scoreResets,
  scoreUpdates,
  stopGame,
} from '../../store/actions';

import { Rules } from '../Rules';
import { GameButtons } from '../GameButtons';
import { getUser, updateUser } from '../../api/requests';
import { feedTypes, mintColor, pinkColor, purpleColor } from '../../constants';
import { ScoreCard } from '../ScoreCard';
import { FeedType } from '../../types/FeedType';
import { Heading } from '@chakra-ui/react';
import { RootState, useAppDispatch, useAppSelector } from '../../store';

export interface ICanvasBoard {
  height: number;
  width: number;
  loadTopUsers: () => void;
}

export const CanvasBoard = ({ height, width, loadTopUsers }: ICanvasBoard) => {
  const snakeBody = useAppSelector((state: RootState) => state.game.snake);
  const disallowedDirection = useAppSelector(
    (state: RootState) => state.game.disallowedDirection
  );
  const score = useAppSelector((state: RootState) => state.game.score);
  const userName = useAppSelector((state: RootState) => state.user.username);
  const dispatch = useAppDispatch();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [position, setPosition] = useState<IObjectBody>(
    generateRandomPosition(width - 20, height - 20)
	);

  const [feed, setFeed] = useState<FeedType>(feedTypes[0]);
  const isEatenRef = useRef<boolean>(false);
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
        switch (e.code) {
          case 'KeyW':
          case 'KeyW'.toLowerCase():
            moveSnake(0, -20, disallowedDirection);
            break;

          case 'KeyS':
          case 'KeyS'.toLowerCase():
            moveSnake(0, 20, disallowedDirection);
            break;

          case 'KeyA':
          case 'KeyA'.toLowerCase():
            moveSnake(-20, 0, disallowedDirection);
            break;

          case 'KeyD':
          case 'KeyD'.toLowerCase():
            e.preventDefault();
            moveSnake(20, 0, disallowedDirection);
            break;
        }
      } else {
        if (
          disallowedDirection !== 'LEFT' &&
          disallowedDirection !== 'UP' &&
          disallowedDirection !== 'DOWN' &&
          (e.code === 'KeyD' || e.code === 'KeyD'.toLowerCase())
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
    dispatch(scoreResets(RESET_SCORE));
    clearBoard(context);

    drawObject(context, snakeBody, mintColor);
    drawObject(
      context,
      [generateRandomPosition(width - 20, height - 20)],
      feed.color,
    );

    window.addEventListener("keypress", handleKeyEvents);
  }, [context, dispatch, handleKeyEvents, height, snakeBody, width, feed]);

  const findPlayer = useCallback(async (id: string) => {
    try {
      const user = await getUser(id);

      return user;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const updateScore = useCallback(async () => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      const playerId = userId.replace(/"/g, '');
      const player = await findPlayer(playerId);

      if (player) {
        if (player.score < score) {
          try {
            await updateUser(playerId, { score });
            console.log(playerId);
  
            loadTopUsers();
          } catch (error) {  
            console.log(error);
          }       
        } 
      }

      return;
    }
  }, [score, findPlayer, loadTopUsers]);

  useEffect(() => {
    if (isEatenRef.current) {
      const fruitPosition = generateRandomPosition(width - 20, height - 20);
      setPosition(fruitPosition);
      isEatenRef.current = false;
  
      dispatch(increaseSnake());
      dispatch(scoreUpdates(feed.points));
  
      const randomFeed = feedTypes[generateRandomFeed(feedTypes.length)];
      setFeed(randomFeed);
    }
  }, [isEatenRef, feed.points, position, snakeBody, height, width, dispatch]);  

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext('2d'));
  
    clearBoard(context);
    drawObject(context, snakeBody, mintColor);
    drawObject(context, [position], feed.color);

    if (snakeBody[0].x === position?.x && snakeBody[0].y === position?.y) {
      isEatenRef.current = true;
    }

    if (handleSnakesBite(snakeBody, snakeBody[0])
      || snakeBody[0].x > width - 20
      || snakeBody[0].x < 0
      || snakeBody[0].y < 0
      || snakeBody[0].y > height - 20
    ) {
      setIsGameEnded(true);
      dispatch(stopGame());
      updateScore();

      window.removeEventListener("keypress", handleKeyEvents);
    } else {
      setIsGameEnded(false)
    };
  }, [context, position, snakeBody, height, width, dispatch, handleKeyEvents, updateScore, feed.color]);

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
      
      <ScoreCard />

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

      {userName && (
        <Heading as="h2" size="md" mt={3} color={pinkColor}>
          Are you the biggest snake, {userName}?
        </Heading>
      )}
    </>
  );
};
