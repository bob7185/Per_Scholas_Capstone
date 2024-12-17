import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
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
  Flex,
  Heading,
  Stack,
  FormErrorMessage,
  Divider,
} from "@chakra-ui/react";

export default function SignUp() {
  const { updateUser } = useUser();
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
      if (response.status === 200) {
        toast.success("You signed up successfully. You are now logged in!");
        updateUser(response.data);
        navigate("/profile");
      } else {
        toast.error("Error sending data to the server");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bg="gray.50"
      p={6}
    >
      <Box
        w={{ base: "100%", sm: "400px" }}
        p={8}
        bg="white"
        borderRadius="lg"
        boxShadow="lg"
      >
        {/* Page Heading */}
        <Heading
          as="h1"
          size="lg"
          textAlign="center"
          color="blue.700"
          mb={6}
          fontWeight="bold"
        >
          Create an Account
        </Heading>

        {/* Form */}
        <form onSubmit={handleSubmit(submitForm)}>
          <Stack spacing={5}>
            {/* Name Input */}
            <FormControl isInvalid={errors.name}>
              <Input
                id="name"
                type="text"
                placeholder="Full Name"
                bg="gray.100"
                _hover={{ bg: "gray.200" }}
                _focus={{ bg: "white", borderColor: "blue.500" }}
                {...register("name", { required: "Name is required" })}
              />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>

            {/* Username Input */}
            <FormControl isInvalid={errors.username}>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                bg="gray.100"
                _hover={{ bg: "gray.200" }}
                _focus={{ bg: "white", borderColor: "blue.500" }}
                {...register("username", { required: "Username is required" })}
              />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>

            {/* Email Input */}
            <FormControl isInvalid={errors.email}>
              <Input
                id="email"
                type="email"
                placeholder="Email Address"
                bg="gray.100"
                _hover={{ bg: "gray.200" }}
                _focus={{ bg: "white", borderColor: "blue.500" }}
                {...register("email", { required: "Email is required" })}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            {/* Password Input */}
            <FormControl isInvalid={errors.password}>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                bg="gray.100"
                _hover={{ bg: "gray.200" }}
                _focus={{ bg: "white", borderColor: "blue.500" }}
                {...register("password", { required: "Password is required" })}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={isSubmitting}
              colorScheme="blue"
              size="lg"
              fontWeight="bold"
              textTransform="uppercase"
              _hover={{ bg: "blue.600" }}
            >
              Sign Up
            </Button>
          </Stack>
        </form>

        {/* Divider and Sign-In Link */}
        <Divider my={6} />
        <Flex justify="center">
          <Text fontSize="sm" color="gray.600">
            Already have an account?{" "}
            <Link to="/signin">
              <Text as="span" color="blue.500" fontWeight="medium">
                Sign in
              </Text>
            </Link>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
