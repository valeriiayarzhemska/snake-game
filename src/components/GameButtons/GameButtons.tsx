import { Box, Button, Flex, Heading, Kbd } from '@chakra-ui/react';

export interface IRulesProps {
  resetBoard: () => void;
  toggleRules: () => void;
}

export const GameButtons = ({ resetBoard, toggleRules }: IRulesProps) => (
  <Box>
    <Heading
      as="h5"
      size="sm"
      mt={1}
      textAlign="center"
    >
      Start the game by pressing <Kbd>d</Kbd>
    </Heading>

    <Flex flexDirection="row" mt={3}>
      <Flex flexDirection="column" mr={4}>
        <Button onClick={() => toggleRules()}>How to Play</Button>
      </Flex>

      <Flex flexDirection="column">
        <Button onClick={() => resetBoard()}>Reset game</Button>
      </Flex>
    </Flex> 
  </Box>
);
