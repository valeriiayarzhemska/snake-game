import { INotificationLoader, NotificationLoader } from "../components/NotificationLoader";
import { blueColor } from "./constants.ts";

export const clearBoard = (context: CanvasRenderingContext2D | null) => {
  if (context) {
    context.clearRect(0, 0, 1000, 600);
  }
};

export interface IObjectBody {
  x: number;
  y: number;
}

export const drawObject = (
  context: CanvasRenderingContext2D | null,
  objectBody: IObjectBody[],
  fillColor: string,
  strokeStyle = blueColor,
) => {
  if (context) {
    objectBody.forEach((object: IObjectBody) => {
      context.fillStyle = fillColor;
      context.strokeStyle = strokeStyle;
      context?.fillRect(object.x, object.y, 20, 20);
      context?.strokeRect(object.x, object.y, 20, 20);
    });
  }
};

function randomNumber(min: number, max: number) {
  let random = Math.random() * max;
  return random - (random % 20);
}

export const generateRandomPosition = (width: number, height: number) => {
  return {
    x: randomNumber(0, width),
    y: randomNumber(0, height),
  };
};

export const handleSnakesBite = (
  snake: IObjectBody[],
  headPosition: IObjectBody,
) => {
  let point = false;

  snake.forEach((position: IObjectBody, index: number) => {
    if (
      position.x === headPosition.x &&
      position.y === headPosition.y &&
      index !== 0
    ) {
      point = true;
    }
  });

  return point;
}

export const generateNotification = ({ text, type }: INotificationLoader) => {
  <NotificationLoader text={text} type={type} />
}
