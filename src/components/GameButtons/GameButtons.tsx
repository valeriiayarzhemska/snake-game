import {
  Box,
  Flex,
  Heading,
  Kbd,
} from '@chakra-ui/react';
import { PrimaryButton } from '../PrimaryButton';

export interface IGameButtons {
  resetBoard: () => void;
  toggleRules: () => void;
}

export const GameButtons = ({ resetBoard, toggleRules }: IGameButtons) => (
  <Box>
    <Heading
      as="h5"
      size="sm"
      mt={1}
      textAlign="center"
    >
      Start the game by pressing <Kbd>d</Kbd>
    </Heading>

    <Flex flexDirection="row" mt={3} gap={4}>
      <PrimaryButton
        text="How to Play"
        handleClick={toggleRules}
      />

      <PrimaryButton
        text="Reset game"
        handleClick={resetBoard}
      />
    </Flex> 
  </Box>
);
