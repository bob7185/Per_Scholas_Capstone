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

export default function SignIn() {
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
        `${API_URL}/auth/signin`,
        JSON.stringify(formValues),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Sign in successful!");
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
          Welcome Back
        </Heading>

        {/* Form */}
        <form onSubmit={handleSubmit(submitForm)}>
          <Stack spacing={5}>
            {/* Email Input */}
            <FormControl isInvalid={errors.email}>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                bg="gray.100"
                _hover={{ bg: "gray.200" }}
                _focus={{ bg: "white", borderColor: "blue.500" }}
                {...register("email", {
                  required: "Email is required",
                })}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            {/* Password Input */}
            <FormControl isInvalid={errors.password}>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                bg="gray.100"
                _hover={{ bg: "gray.200" }}
                _focus={{ bg: "white", borderColor: "blue.500" }}
                {...register("password", {
                  required: "Password is required",
                })}
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
              Sign In
            </Button>
          </Stack>
        </form>

        {/* Divider and Signup Link */}
        <Divider my={6} />
        <Flex justify="center">
          <Text fontSize="sm" color="gray.600">
            Don't have an account?{" "}
            <Link to="/signup">
              <Text as="span" color="blue.500" fontWeight="medium">
                Sign up
              </Text>
            </Link>
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
}
