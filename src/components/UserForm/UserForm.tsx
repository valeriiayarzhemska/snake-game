import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import useStickyState from '../../hooks/useStickyState';

import { useAppDispatch } from '../../store';
import * as userActions from '../../store/slices/userSlice';

import { User } from '../../types/User';
import { getAllUsers } from '../../api/requests';
import { addNewUser } from '../../utils';

import { Loader } from '../Loader';
import { FormValues, UserNameForm } from '../UserNameForm';
import { Notification } from '../Notification';

export const UserForm = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [userId, setUserId] = useStickyState<string>('', 'userId');
  const [userName, setUserName] = useStickyState<string>('', 'userName');
  const dispatch = useAppDispatch();

  const createNewUser = async (name: string) => {
    setIsLoading(true);

    try {
      const currNewUser = await addNewUser(name);
  
      if (currNewUser) {
        setUserId(currNewUser.id);
        setUsers(prevUsers => [...prevUsers, currNewUser]);
        setUserName(name);
  
        dispatch(userActions.setUsername(name));
      }
    } catch {
      setHasError(true);
    }

    setIsLoading(false);
    setHasError(false);
  };
  
  const onSubmit = async (data: FormValues) => {
    await createNewUser(data.name);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const usersFromServer = await getAllUsers();

        setUsers(usersFromServer);
      } catch {
        setHasError(true);
      }

      setIsLoading(false);
      setHasError(false);
    };

    loadData();
  }, []);

  const render = () => {
    if (isLoading) {
      return <Loader />
    };

    if (hasError) {
      return (
        <Notification 
          mainText='Sorry, something went wrong :c'
        />
      )
    }

    return (
      <UserNameForm 
        handleSubmitUsername={onSubmit}
        inputLabel='Your name?'
      />
    );
  };

  const updateBodyOverflow = () => {
    if (userId.length > 1) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  };

  useEffect(() => {
    updateBodyOverflow();
  }, [userId]);

  return (
    <>      
      {userId.length <= 0 && (
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
          {render()}          
        </Box>
      )}
    </>
)};
