import {
  Box,
  Heading,
} from '@chakra-ui/react';

export interface INotification {
  mainText: string;
}

export const Notification = ({ mainText }: INotification) => (
  <Box>
    <Heading
      as="h5"
      size="lg"
      mt={1}
      textAlign="center"
    >
      {mainText}
    </Heading> 
  </Box>
);
