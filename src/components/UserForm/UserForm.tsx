import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { User } from '../../types/User';
import { createUser, getAllUsers } from '../../api/requests';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import useStickyState from '../../hooks/hooks';
import { generateNotification } from '../../utils';
import { Loader } from '../Loader';

interface FormValues {
  name: string;
}

export const UserForm = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [user, setUser] = useStickyState<string>('', 'user');
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data.name);
    addNewUser(data.name);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      try {
        const usersFromServer = await getAllUsers();

        setUsers(usersFromServer);
      } catch (error) {
        console.log('Failed loading users', error);
        setHasError(true);
      }

      setIsLoading(false);
      setHasError(false);
    };

    loadData();
  }, []);

  const addNewUser = async (name: string) => {
    const userId = uuidv4();

    const newUser = {      
      id: userId,
      name,
      score: 0,
    };

    try {
      const currNewUser = await createUser(newUser);

      setUsers(prevUsers => [...prevUsers, currNewUser]);
      setUser(newUser.id);

      generateNotification({
        text: 'Lets play!',
        type: 'succcess',
      })
    } catch (error) {
      console.log(error);

      generateNotification({
        text: 'Something went wrong, user was not added',
        type: 'error',
      })
    }
  };

  return (
    <>      
      {user.length <= 0 && (
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
          {isLoading && !hasError && (
            <Loader />
          )}

          {!isLoading && hasError && (
            <Heading as="h1" size="xl">
              Oops, something went wrong
            </Heading>
          )}

          {!isLoading && !hasError && (
            <Box p={5} bg="white" borderRadius="md" maxWidth="600px">
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isInvalid={!!errors.name} mb={4}>
                  <FormLabel htmlFor="name">Name</FormLabel>

                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    {...register('name', { required: 'Name is required' })}
                  />

                  <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                </FormControl>

                <Button type="submit" isLoading={false}>
                  Play <span role="img" aria-label="snake">🐍</span>
                </Button>
              </form>
            </Box>
          )}          
        </Box>
      )}
    </>
)};