import { RootState, useAppSelector } from '../../store';
import { Heading } from '@chakra-ui/react';
import { pinkColor } from '../../constants';
import { normalizeValueInStorage } from '../../utils';

export const UserName = () => {
  const userName = useAppSelector((state: RootState) => state.user.username);
  const userNameStorage = localStorage.getItem('userName');
  const userNameNormalised = normalizeValueInStorage(userNameStorage || '');
  const name = userName || userNameNormalised;

  return (
    <Heading as="h2" size="md" mt={3} color={pinkColor}>
      Are you the biggest snake, {name}?
    </Heading>
  );
};
