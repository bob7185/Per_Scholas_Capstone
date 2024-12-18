
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../utilities";
import { useUser } from "../context/Context";
import axios from "axios";

// Chakra UI Components
import {
  FormControl,
  Input,
  Button,
  Text,
  Box,
  Link,
  Flex,
  Heading,
  Stack,
  FormErrorMessage,
  Divider,
} from "@chakra-ui/react";


export default function Profile() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  //defaultValues populate the form with default value for the form fields
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
    },
  });

  const submitForm = async (formValues) => {
    try {
      const response = await axios.put(
        `${API_URL}/users/${user._id}`,
        formValues,
        {
            withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //If request is succesful, reset password field and update usercontext
      if (response.status === 200) {
        resetField('password');
        updateUser(response.data);
        toast.success("profile update successful!");
      } else {
        toast.error("Error sending request to the server");
      }
    } catch (error) {
      toast.error("Profile update error");
    }
  }

  // delete user, reset user context  and redirect to Home page
  const deleteUser = async () => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/users/delete/${user._id}`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          toast.success('User has been deleted!');
          updateUser(null);
          navigate('/');
        } else {
          toast.error('Error sending request to the server');
        }
      } catch (error) {
        toast.error('Error deleting the user');
      }
  }

  // handle the signout action  and send user back to home page
  const signOut = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/signout`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("User logged out!");
        updateUser(null);
        navigate("/");
      } else {
        toast.error("Error sending request to the server");
      }
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  }
  return (
    <Box p='3' maxW='lg' mx='auto'>

      <Heading
        as='h1'
        fontSize='3xl'
        fontWeight='semibold'
        textAlign='center'
        my='7'
      >
        Your Profile
      </Heading>
      <form onSubmit={handleSubmit(submitForm)}>
        <Stack gap='4'>
          <FormControl isInvalid={errors.username}>
            <Input
              id='username'
              type='text'
              placeholder='username'
              {...register('username', { required: 'Username is required' })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email}>
            <Input
              id='email'
              type='email'
              placeholder='email'
              {...register('email', { required: 'Email is required' })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <Input
              id='password'
              type='password'
              placeholder='New password'
              {...register('password', { required: 'Password is required' })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type='submit'
            isLoading={isSubmitting}
            colorScheme='teal'
            textTransform='uppercase'
          >
            Update Profile
          </Button>
        </Stack>
      </form>
      <Stack gap='4' mt='5'>
        <Link
          as={RouterLink}
          to='/createTask'
          p='2'
          bg='green.500'
          rounded='lg'
          textTransform='uppercase'
          textAlign='center'
          textColor='white'
          fontWeight='semibold'
          _hover={{ bg: 'green.600' }}
        >
          Create New Task
        </Link>
        <Flex justify='space-between'>
          <Text as='span' color='red.600' cursor='pointer' onClick={deleteUser} >
            Delete Account
          </Text>
          <Text
            as='span'
            color='red.600'
            cursor='pointer'
            onClick={signOut}
          >
            Sign Out
          </Text>
        </Flex>
        <Text textAlign='center'>
          <Link
            as={RouterLink}
            to='/tasks'
            color='teal'
            _hover={{ textDecor: 'none' }}
          >
            Show Tasks
          </Link>
        </Text>
      </Stack>
    </Box>
  );
}