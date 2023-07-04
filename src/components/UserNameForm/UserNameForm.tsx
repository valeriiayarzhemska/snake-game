import { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export interface FormValues {
  name: string;
}

interface IUserNameForm {
  handleSubmitUsername: (data: FormValues) => Promise<void>;
  inputLabel: string;
}

export const UserNameForm = ({ handleSubmitUsername, inputLabel }: IUserNameForm) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormValues>();

  useEffect(() => {
    register('name', {
      required: 'Name is required',
      minLength: {
        value: 2,
        message: 'Name should be at least 2 characters',
      },
    });
  }, [register]);

  return (
    <Box p={5} bg="white" borderRadius="md" maxWidth="600px">
      <form onSubmit={handleSubmit(handleSubmitUsername)}>
        <FormControl isInvalid={!!errors.name} mb={4}>
          <FormLabel htmlFor="name">{inputLabel}</FormLabel>

          <Input
            id="name"
            type="text"
            placeholder="Enter your name"
            {...register('name')}
          />

          <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
        </FormControl>

        <Button type="submit" isLoading={false}>
          Play <span role="img" aria-label="snake">🐍</span>
        </Button>
      </form>
    </Box>
  );
};
