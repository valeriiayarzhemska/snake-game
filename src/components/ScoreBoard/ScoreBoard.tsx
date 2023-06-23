import {
  Box,
  Flex,
  Heading,
  Kbd,
  Text,
} from '@chakra-ui/react';
import { Loader } from '../Loader';
import { User } from '../../types/User';

export interface IScoreBoard {
  topUsers: User[];
  isTopLoading: boolean;
  hasTopError: boolean;
}

export const ScoreBoard = ({
  topUsers,
  isTopLoading,
  hasTopError,
}: IScoreBoard) => {
  return (
    <Box p={5} bg="white" borderRadius="md" maxWidth="600px">
      <Heading as="h6" size="lg">
        Top Players:
      </Heading>

      {isTopLoading && !hasTopError && (
        <Flex
          flexDirection="column"
          mt={3}
          alignItems="center"
        >
          <Loader />
        </Flex>
      )}

      {!isTopLoading && hasTopError && (
        <Flex
          flexDirection="row"
          mt={3}
          alignItems="center"
          justifyContent="space-between"
        >            
          <Text>
            Oops, something went wrong
          </Text>
        </Flex>
      )}

      {topUsers.length > 0 && !hasTopError && !isTopLoading && (
        <Flex flexDirection="column">
          {topUsers.map(user => {
            const { name, score, id } = user;

            return (            
              <Flex
                flexDirection="row"
                mt={2}
                alignItems="center"
                justifyContent="space-between"
                key={id}
              >
                <Text>
                  {name}:
                </Text>

                <Text>
                  <Kbd>{score}</Kbd>
                </Text>
              </Flex>
            )
            })}
        </Flex>
      )}
    </Box>
  );
};
