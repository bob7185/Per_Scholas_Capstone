
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

  const deleteUser = async () => {
    
  }
    return <h1>Profile Page</h1>
}