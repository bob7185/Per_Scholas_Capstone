// Task form
import { useForm, Controller } from 'react-hook-form';
import { API_URL } from "../utilities";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../context/Context";
import axios from 'axios';
import {
  Stack,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
  Button,
} from '@chakra-ui/react';

export default function TaskForm({ type, task }) {
    const { user, updateUser } = useUser();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues:
      type === 'update'
        ? {
            ...task,
            due: task.due ? new Date(task.due) : '',
          }
        : {},
  });

  const navigate = useNavigate();

  const doSubmit = async values => {
    if (type === 'create') {
      const response = await axios.post(`${API_URL}/tasks/create/${user.email}`, values,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        toast.success(`New Task Created!`);
        navigate(`/tasks`);
      } else {
        toast.error('Error while creating task');
      }
    }

    if (type === 'update') {
      delete values._id;
      const res = await axios.put(`${API_URL}/tasks/update/${task._id}`, values,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        toast.success(`Task Updated!`);
        navigate(`/tasks`);
      } else {
        toast.error('Error updating task');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(doSubmit)}>
      <Stack direction={{ base: 'column', md: 'row' }} gap='4'>
        <Flex direction='column' flex='1' gap='4'>
          <FormControl isInvalid={errors.name}>
            <Input
              id='name'
              type='text'
              placeholder='Task Name'
              {...register('name', { required: 'Task Name is required' })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.description}>
            <Textarea
              id='description'
              type='text'
              placeholder='Description'
              rows={4}
              {...register('description', {
                required: 'Description is required',
              })}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
        </Flex>
        <Flex direction='column' flex='1' gap='4'>
          <FormControl isInvalid={errors.priority}>
            <Select
              placeholder='Priority'
              {...register('priority', { required: 'Priority is required' })}
            >
              <option value='urgent'>Urgent</option>
              <option value='not urgent'>Not Urgent</option>
            </Select>
            <FormErrorMessage>
              {errors.priority && errors.priority.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.status}>
            <Select
              placeholder='Status'
              {...register('status', { required: 'Status is required' })}
            >
              <option value='open'>Open</option>
              <option value='done'>Done</option>
            </Select>
            <FormErrorMessage>
              {errors.status && errors.status.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            type='submit'
            isLoading={isSubmitting}
            colorScheme='teal'
            textTransform='uppercase'
          >
            Submit
          </Button>
        </Flex>
      </Stack>
    </form>
  );
}