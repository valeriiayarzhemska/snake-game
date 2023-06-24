import { useEffect } from 'react';
import {
  Box,
  CloseButton,
  Flex,
  Heading,
  Kbd,
} from '@chakra-ui/react';
import { feedTypes, gameInstructions } from '../../constants';
import { RulesHeading } from '../RulesHeading';

export interface IRules {
  toggleRules: () => void;
}

export const Rules = ({ toggleRules }: IRules) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);

  return (
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

        <RulesHeading
          headingText='Start the game by pressing '
          kbdText='d'
        />

        <Flex flexDirection="column" mt={3}>
          {gameInstructions.map(({ key, instruction }, index) => (
            <span key={index}>
              <Kbd>{key}</Kbd> {instruction}
            </span>
          ))}
        </Flex>

        <RulesHeading
          headingText='To start the game again when you lose, press '
          kbdText='Reset Game'
        />

        <RulesHeading
          headingText='Feed types:'
        />

        <Flex flexDirection="column" mt={3}>
          {feedTypes.map(({ points, color }, index) => (
            <span key={index}>
              <Kbd color={color}>■</Kbd> {points} point(s)
            </span>
          ))}
        </Flex>
      </Box>
    </Box>
)};
