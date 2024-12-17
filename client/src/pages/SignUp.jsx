import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { API_URL } from "../utilities";
import { useUser } from "../context/Context";
import axios from "axios";

import {
  FormControl,
  Input,
  Button,
  Text,
  Box,
  Flex,
  Heading,
  Stack,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function SignUp() {
  const  {updateUser} = useUser();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const submitForm = async (formValues) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/signup`,
        JSON.stringify(formValues),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // IF request wa succesfully submitted
      if (response.status === 200) {
        toast.success("You signed up successfully. You are now logged in!");
        updateUser(response.data);
        //automatically navigate to Profile
        navigate('/profile');
      } else {
        toast.error("Error posting data");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Box p="4" maxW="lg" mx="auto">
      <Heading
        as="h1"
        textAlign="center"
        fontSize="3xl"
        fontWeight="semibold"
        my="7"
      >
        Create an Account
      </Heading>
      <form onSubmit={handleSubmit(submitForm)}>
        <Stack gap="4">
          {/* Username field input */}
          <FormControl isInvalid={errors.name}>
            <Input
              id="name"
              type="text"
              placeholder="name"
              {...register("name", { required: "name is required" })}
            />
            <FormErrorMessage>
              {errors.username && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          {/* Username field input */}
          <FormControl isInvalid={errors.username}>
            <Input
              id="username"
              type="text"
              placeholder="username"
              {...register("username", { required: "Username is required" })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>
          {/* Email input  */}
          <FormControl isInvalid={errors.email}>
            <Input
              id="email"
              type="text"
              placeholder="email"
              {...register("email", { required: "Email is required" })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          {/* password field input */}
          <FormControl isInvalid={errors.password}>
            <Input
              id="password"
              type="password"
              placeholder="password"
              {...register("password", { required: "Password is required" })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type="submit"
            isLoading={isSubmitting}
            colorScheme="teal"
            textTransform="uppercase"
          >
            Sign Up
          </Button>
        </Stack>
      </form>
      <Flex gap="2" mt="5">
        <Text>Have an account?</Text>
        <Link to={"/signin"}>
          <Text as="span" color="blue.400">
            Sign in
          </Text>
        </Link>
      </Flex>
    </Box>
  );
}
