import {
  Box,
  CloseButton,
  Flex,
  Heading,
  Kbd,
} from '@chakra-ui/react';

export interface IRules {
  toggleRules: () => void;
}

export const Rules = ({ toggleRules }: IRules) => (
  <Box
    position="fixed"
    top={0}
    left={0}
    right={0}
    bottom={0}
    zIndex={999}
    display="flex"
    alignItems="center"
    justifyContent="center"
    bg="rgba(0, 0, 0, 0.6)"
  >
    <Box p={5} bg="white" borderRadius="md" maxWidth="600px">
      <Flex
        flexDirection="row"
        mt={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading as="h6" size="lg" mr={4}>
          How to Play
        </Heading>

        <CloseButton onClick={() => toggleRules()} />
      </Flex>

      <Heading as="h5" size="sm" mt={1}>
        Start the game by pressing <Kbd>d</Kbd>
      </Heading>

      <Flex flexDirection="column" mt={3}>
        <span>
          <Kbd>w</Kbd> Move Up
        </span>
        <span>
          <Kbd>a</Kbd> Move Left
        </span>
        <span>
          <Kbd>s</Kbd> Move Down
        </span>
        <span>
          <Kbd>d</Kbd> Move Right
        </span>
      </Flex>

      <Heading as="h5" size="sm" mt={3}>
        To start the game again when you loose, press <Kbd>Reset Game</Kbd>
      </Heading>
    </Box>
  </Box>
);
