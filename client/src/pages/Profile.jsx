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

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
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
      if (response.status === 200) {
        resetField("password");
        updateUser(response.data);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Error sending request to the server");
      }
    } catch (error) {
      toast.error("Profile update error");
    }
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`${API_URL}/users/delete/${user._id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Account deleted!");
        updateUser(null);
        navigate("/");
      } else {
        toast.error("Error sending request to the server");
      }
    } catch (error) {
      toast.error("Error deleting the user");
    }
  };

  const signOut = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/signout`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success("Signed out successfully!");
        updateUser(null);
        navigate("/");
      } else {
        toast.error("Error sending request to the server");
      }
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <Box bg="white" p="6" maxW="lg" mx="auto" borderRadius="lg" boxShadow="sm">
      <Heading
        as="h1"
        fontSize="3xl"
        fontWeight="semibold"
        textAlign="center"
        color="blue.600"
        mb="6"
      >
        Your Profile
      </Heading>

      <form onSubmit={handleSubmit(submitForm)}>
        <Stack spacing="5">
          <FormControl isInvalid={errors.username}>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
            />
            <FormErrorMessage>
              {errors.username && errors.username.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.email}>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <Input
              id="password"
              type="password"
              placeholder="New password"
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
            size="lg"
            textTransform="uppercase"
          >
            Update Profile
          </Button>
        </Stack>
      </form>

      <Divider my="6" />

      <Stack spacing="4">
        <Link
          as={RouterLink}
          to="/createTask"
          p="3"
          bg="green.500"
          rounded="md"
          textAlign="center"
          color="white"
          fontWeight="semibold"
          _hover={{ bg: "green.600" }}
        >
          Create New Task
        </Link>

        <Flex justifyContent="space-between">
          <Text
            as="span"
            color="red.500"
            fontWeight="medium"
            cursor="pointer"
            onClick={deleteUser}
            _hover={{ textDecoration: "underline" }}
          >
            Delete Account
          </Text>

          <Text
            as="span"
            color="red.500"
            fontWeight="medium"
            cursor="pointer"
            onClick={signOut}
            _hover={{ textDecoration: "underline" }}
          >
            Sign Out
          </Text>
        </Flex>

        <Text textAlign="center">
          <Link
            as={RouterLink}
            to="/tasks"
            color="teal.500"
            fontWeight="semibold"
            _hover={{ textDecoration: "underline" }}
          >
            View Your Tasks
          </Link>
        </Text>
      </Stack>
    </Box>
  );
}
