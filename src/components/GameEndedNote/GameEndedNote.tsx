import { Box, Heading } from '@chakra-ui/react';
import { mintColor, pinkColor } from '../../constants';

export const GameEndedNote = () => {
  return (
    <Box
      position="absolute"
      top="45%"
      left="50%"
      p={3}
      transform="translate(-50%, -50%)"
      textAlign="center"
      bg="white"
      borderRadius="md"
      border={"5px dashed" + pinkColor}
    >
      <Heading as="h2" size="lg" color={mintColor}>
        GAME OVER
      </Heading>

      <Heading size="md" color={pinkColor}>
        You lose
      </Heading>
    </Box>
  );
};
