import React, { useState, useEffect } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { mintColor, pinkColor } from '../../utils/constants.ts';

export interface INotificationLoader {
  text: string;
  type: string;
}

export const NotificationLoader = ({ text, type }: INotificationLoader) => {
  const [showNotification, setShowNotification] = useState(true);

  const loadingType = type === 'loading';

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Flex
      align="center"
      justify="flex-end"
      position="fixed"
      top={loadingType ? 4 : 20}
      right={4}
      zIndex={999}
      opacity={showNotification ? 1 : 0}
      transition="opacity 0.3s ease-in-out"
    >
      <Box
        p={3}
        bg={loadingType ? mintColor : pinkColor}
        borderRadius="md"
      >
        <Text>
          {text}
        </Text>
      </Box>
    </Flex>
  );
};
