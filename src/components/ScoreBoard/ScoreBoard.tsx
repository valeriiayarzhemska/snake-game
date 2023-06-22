import {
  Box,
  Flex,
  Heading,
  Kbd,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { getTopUsers } from '../../api/requests';
import { Loader } from '../Loader';

export const ScoreBoard = React.memo(() => {
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [isTopLoading, setIsTopLoading] = useState(false);
  const [hasTopError, setTopHasError] = useState(false);
  
  useEffect(() => {
    const loadData = async () => {
      setIsTopLoading(true);

      try {
        const topUsersFromServer = await getTopUsers();

        setTopUsers(topUsersFromServer);
      } catch (error) {
        setTopHasError(true);
        console.log(error);
      }

      setIsTopLoading(false);
      setTopHasError(false);
    };

    loadData();
  }, []);

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
});
