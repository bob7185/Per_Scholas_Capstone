import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../context/Context";
import { API_URL } from "../utilities";
import axios from "axios";

// Chakra UI components
import {
  Flex,
  Box,
  Spacer,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Button,
  Text,
} from "@chakra-ui/react";

export default function Nav() {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/signout`, {
        credentials: "include",
      });
      if (response.status === 200) {
        toast.success("User logged out!");
        updateUser(null);
        navigate("/");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <Box as="nav" bg="white" boxShadow="sm" py={3} px={6}>
      <Flex
        align="center"
        justify="space-between"
        maxW="7xl"
        mx="auto"
        wrap="wrap"
      >
        {/* Logo */}
        <Box>
          <Link
            as={RouterLink}
            to="/"
            fontSize="2xl"
            fontWeight="bold"
            color="blue.600"
            _hover={{ textDecoration: "none", color: "blue.700" }}
          >
            TaskPal
          </Link>
        </Box>

        <Spacer />

        {/* Navigation Menu */}
        <Box>
          {user ? (
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                _hover={{ bg: "gray.100" }}
                _active={{ bg: "gray.200" }}
                borderRadius="full"
                p={0}
              >
                <Image
                  boxSize="40px"
                  borderRadius="full"
                  src={user.avatar}
                  alt={user.username}
                  border="2px solid"
                  borderColor="gray.200"
                />
              </MenuButton>
              <MenuList>
                <MenuItem as={RouterLink} to="/profile" _hover={{ bg: "gray.100" }}>
                  Profile
                </MenuItem>
                <MenuItem as={RouterLink} to="/projects" _hover={{ bg: "gray.100" }}>
                  Projects
                </MenuItem>
                <MenuItem onClick={signOut} _hover={{ bg: "gray.100" }}>
                  Sign Out
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              as={RouterLink}
              to="/signin"
              colorScheme="blue"
              size="md"
              fontWeight="medium"
            >
              Sign In
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
