import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getTopUsers } from './api/requests';
import { Container, Heading } from '@chakra-ui/react';

import { CanvasBoard } from './components/CanvasBoard';
import { ScoreBoard } from './components/ScoreBoard';
import { UserForm } from './components/UserForm/UserForm';

function App() {
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [isTopLoading, setIsTopLoading] = useState(false);
  const [hasTopError, setTopHasError] = useState(false);
  
  const loadTopUsers = async () => {
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

  useEffect(() => {
    loadTopUsers();
  }, []);

  return (
    <Container maxW="container.lg" p={3} centerContent>
      <Heading as="h1" size="xl">SNAKE GAME</Heading>
      
      <UserForm />

      <CanvasBoard
        height={600}
        width={1000}
        loadTopUsers={loadTopUsers}

      />
      
      <ScoreBoard
        topUsers={topUsers}
        isTopLoading={isTopLoading}
        hasTopError={hasTopError}
      />
    </Container>
  );
}

export default App;
