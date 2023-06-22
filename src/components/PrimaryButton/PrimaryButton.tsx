import { Button, Flex } from '@chakra-ui/react';

export interface IPrimaryButton {
  text: string;
  handleClick: () => void;
}

export const PrimaryButton = ({ text, handleClick }: IPrimaryButton) => (
  <Flex flexDirection="column">
    <Button onClick={() => handleClick()}>
      {text}
    </Button>
  </Flex>
);
