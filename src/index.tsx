import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { store } from './store';
import App from './App';
import { blueColor, pinkColor } from './constants';

const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        fontFamily: "'VT323', monospace",
        color: blueColor,
      },
    },
    Kbd: {
      baseStyle: {
        color: pinkColor,
      },
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
