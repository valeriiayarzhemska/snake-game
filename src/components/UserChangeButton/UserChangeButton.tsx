import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../store';
import * as userActions from '../../store/slices/userSlice';
import { Box, CloseButton } from '@chakra-ui/react';

import { updateUser } from '../../api/requests';
import { normalizeValueInStorage } from '../../utils';

import { PrimaryButton } from '../PrimaryButton';
import { FormValues, UserNameForm } from '../UserNameForm';
import { Loader } from '../Loader';
import { Notification } from '../Notification';
import useStickyState from '../../hooks/useStickyState';

export const UserChangeButton = () => {
  const [changeUserName, setChangeUserName] = useState(false);
  const [isUserNameLoading, setIsUserNameLoading] = useState(false);
  const [hasUserChangeError, setHasUserChangeError] = useState(false);
  const [userName, setUserName] = useStickyState<string>('', 'userName');
  const dispatch = useAppDispatch();

  const handleUsernameChange = async (data: FormValues) => {
    const userId = localStorage.getItem('userId');
    const { name } = data;

    if (userId && userId !== '') {
      setIsUserNameLoading(true);

      const playerId = normalizeValueInStorage(userId);
      
      try {
        const updatedUser = await updateUser(playerId, { name: name });

        if (updatedUser) {
          setChangeUserName(!changeUserName);
          dispatch(userActions.setUsername(name));
          setUserName(name);

          window.location.reload();
        }
      } catch {
        setHasUserChangeError(true);
      }

      setIsUserNameLoading(false);
      setHasUserChangeError(false);
    }
  };
  
  const toggleChangeUserName = () => {
    setChangeUserName(!changeUserName);
  };

  const render = () => {
    if (isUserNameLoading) {
      return (
        <Loader />
      )
    }

    if (hasUserChangeError) {
      return (
        <Notification
          mainText='Sorry, something went wrong :c'
        />
      )
    }

    return (
      <>
        <UserNameForm
          handleSubmitUsername={handleUsernameChange}
          inputLabel='Your new name?'
        />

        <CloseButton
          onClick={toggleChangeUserName}
          position="absolute"
          top={1}
          right={1}
          p={2}
        />
      </>
    )
  };

  useEffect(() => {
    if (!changeUserName) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }, [changeUserName]);

  return (
    <>
      <PrimaryButton
        text='Change username'
        handleClick={toggleChangeUserName}
      />
      
      {changeUserName && (
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
          <Box position="relative">
            {render()}
          </Box>       
        </Box>
      )}      
    </>
)};
