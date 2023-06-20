import { Provider } from 'react-redux';
import { ChakraProvider, Container, Heading } from '@chakra-ui/react';
import { CanvasBoard } from './components/CanvasBoard';
import { ScoreCard } from './components/ScoreCard';
import { store } from './store';
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "'VT323', monospace",
        color: "#00bbf9",
      },
    },
    Kbd: {
      baseStyle: {
        color: "#f15bb5",
      },
    }
  },
});

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Container maxW="container.lg" p={3} centerContent>
          <Heading as="h1" size="xl">SNAKE GAME</Heading>
          <ScoreCard />
          <CanvasBoard height={600} width={1000} />
        </Container>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
