import { Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { IGlobalState } from '../../store/reducers';
import { pinkColor } from '../../utils/constants.ts';

export const ScoreCard = () => {
  const score = useSelector((state: IGlobalState) => state.score);
  
  return (
    <Heading as="h2" size="md" mt={3} color={pinkColor}>
      Current Score: {score}
    </Heading>
  );
}
