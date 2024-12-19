import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_URL } from "../utilities";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Badge,
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  Link,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { BsChevronLeft } from "react-icons/bs";
import SingleTaskSkeleton from "../skeletons/SingleTaskSkeleton";

export default function ShowSingleTask() {
  const [task, setTask] = useState();
  const { taskId } = useParams();
  console.log("taskId:", taskId);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTask = async () => {
      const response = await axios.get(`${API_URL}/tasks/user/${taskId}`);
      const data = await response.data;
      setTask(data);
    };
    fetchTask();
  }, []);

  const handleDeleteTask = async () => {
    const res = await axios.delete(`${API_URL}/tasks/delete/${taskId}`);
    if (res.status === 200) {
      toast.success("Task has been deleted");
      navigate("/tasks");
    } else {
      toast.error("Error deleting task");
    }
  };

  if (!task) {
    return <SingleTaskSkeleton />;
  }
  return (
    <Box p="3" maxW="lg" mx="auto">
      <Link
        as={RouterLink}
        to={`/tasks`}
        color="teal"
        _hover={{ textDecor: "none" }}
        display="flex"
        alignItems="center"
      >
        <BsChevronLeft /> All Tasks
      </Link>
      <Heading fontSize="3xl" fontWeight="semibold" textAlign="center" my="7">
        {task.name}
      </Heading>
      <Stack direction="row">
        <Badge
          fontSize="md"
          colorScheme={task.status === "open" ? "orange" : "green"}
        >
          {task.status}
        </Badge>
        {task.due && <Text>{new Date(task.due).toLocaleDateString()}</Text>}
      </Stack>
      <Card mt="4" border="1px solid" borderColor="gray.200">
        <CardBody>
          <Text>{task.description}</Text>
        </CardBody>
      </Card>
      <Flex justify="space-between" mt="5">
        <Text
          as="span"
          color="red.600"
          cursor="pointer"
          onClick={handleDeleteTask}
        >
          Delete Task
        </Text>
        <Link
          as={RouterLink}
          to={`/update/${task._id}`}
          color="teal"
          _hover={{ textDecor: "none" }}
        >
          Edit Task
        </Link>
      </Flex>
    </Box>
  );
}
