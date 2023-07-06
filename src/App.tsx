import { useEffect, useState } from 'react';
import { User } from './types/User';
import { getTopUsers } from './api/requests';
import { Container, Heading } from '@chakra-ui/react';


import { CanvasBoard } from './components/CanvasBoard';
import { ScoreBoard } from './components/ScoreBoard';
import { UserForm } from './components/UserForm/UserForm';
import { UserChangeButton } from './components/UserChangeButton';

function App() {
  const [topUsers, setTopUsers] = useState<User[]>([]);
  const [isTopLoading, setIsTopLoading] = useState(false);
  const [hasTopError, setTopHasError] = useState(false);
  
  const loadTopUsers = async () => {
    setIsTopLoading(true);

    try {
      const topUsersFromServer = await getTopUsers();

      setTopUsers(topUsersFromServer);
    } catch {
      setTopHasError(true);
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

      <CanvasBoard
        height={600}
        width={1000}
        loadTopUsers={loadTopUsers}
      />
      
      <UserForm />
      
      <ScoreBoard
        topUsers={topUsers}
        isTopLoading={isTopLoading}
        hasTopError={hasTopError}
      />

      <UserChangeButton />
    </Container>
  );
}

export default App;
