import { Container, Heading } from '@chakra-ui/react';
import { CanvasBoard } from './components/CanvasBoard';
import { ScoreCard } from './components/ScoreCard';
import { ScoreBoard } from './components/ScoreBoard';
import { UserForm } from './components/UserForm/UserForm';

function App() {
  return (
    <Container maxW="container.lg" p={3} centerContent>
      <Heading as="h1" size="xl">SNAKE GAME</Heading>
      
      <UserForm />
      
      <ScoreCard />

      <CanvasBoard height={600} width={1000} />
      
      <ScoreBoard />
    </Container>
  );
}

export default App;
