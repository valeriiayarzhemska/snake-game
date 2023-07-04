import { RootState, useAppSelector } from '../../store';
import { Heading } from '@chakra-ui/react';
import { pinkColor } from '../../constants';

export const ScoreCard = () => {
  const score = useAppSelector((state: RootState) => state.game.score);
  
  return (
    <Heading as="h2" size="md" mt={3} color={pinkColor}>
      Current Score: {score}
    </Heading>
  );
}
