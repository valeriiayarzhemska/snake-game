import { useScore } from '../../hooks/useGameSelectors';
import { Heading } from '@chakra-ui/react';
import { pinkColor } from '../../constants';

export const ScoreCard = () => {
  const score = useScore();
  
  return (
    <Heading as="h2" size="md" mt={3} color={pinkColor}>
      Current Score: {score}
    </Heading>
  );
}
