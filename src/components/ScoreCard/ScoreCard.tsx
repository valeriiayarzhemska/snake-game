import { Heading } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { IGlobalState } from '../../store/reducers';

export const ScoreCard = () => {
  const score = useSelector((state: IGlobalState) => state.score);
  
  return (
    <Heading as="h2" size="md" mt={3} color="#f15bb5">
      Current Score: {score}
    </Heading>
  );
}
