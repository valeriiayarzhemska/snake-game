import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Kbd,
} from '@chakra-ui/react';

import { FiVolume2, FiVolumeX } from 'react-icons/fi';
import ReactHowler from 'react-howler'

import { PrimaryButton } from '../PrimaryButton';

export interface IGameButtons {
  resetBoard: () => void;
  toggleRules: () => void;
}

export const GameButtons = ({ resetBoard, toggleRules }: IGameButtons) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMusicEnd = () => {
    setIsPlaying(true);
  };

  return (
    <Box>
      <Heading
        as="h5"
        size="sm"
        mt={1}
        textAlign="center"
      >
        Start the game by pressing <Kbd>d</Kbd>
      </Heading>

      <Flex flexDirection="row" mt={3} gap={3}>
        <PrimaryButton
          text="How to Play"
          handleClick={toggleRules}
        />

        <Flex>
          <ReactHowler
            src={`${process.env.PUBLIC_URL}/music.mp3`}
            playing={isPlaying}
            onEnd={handleMusicEnd}
          />

          <Button
            onClick={() => setIsPlaying(!isPlaying)}
            justifyContent="center"
            alignItems="center"
            display="flex"
          >
            {isPlaying ? <FiVolume2 /> : <FiVolumeX />}
          </Button>
        </Flex>

        <PrimaryButton
          text="Reset game"
          handleClick={resetBoard}
        />
      </Flex> 
    </Box>
  )
};
