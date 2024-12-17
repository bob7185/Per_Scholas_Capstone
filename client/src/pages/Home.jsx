import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Link,
  Flex,
  Stack,
  Image,
} from '@chakra-ui/react';

export default function Home() {
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      gap={{ base: 8, md: 10 }}
      p={{ base: 8, md: 14 }}
      maxW='7xl'
      mx='auto'
      align='center'
      bg='gray.50'
      borderRadius='lg'
      boxShadow='lg'
    >
      <Stack
        flex='1'
        alignSelf='center'
        spacing={6}
        textAlign={{ base: 'center', md: 'left' }}
      >
        <Heading
          as='h1'
          fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
          fontWeight='extrabold'
          color='blue.700'
          lineHeight='short'
        >
          Boost up your{' '}
          <Text as='span' color='blue.400'>
            productivity
          </Text>{' '}
          
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} color='gray.600'>
        Taskpal empowers you to effortlessly manage projects and their associated tasks. <br /> Our extensive feature set is designed to elevate your productivity, ensuring you stay on top of your to-do list and achieve your goals with ease.
        </Text>
        <Link
          as={RouterLink}
          to={'/profile'}
          fontWeight='bold'
          fontSize='lg'
          color='white'
          bg='blue.500'
          _hover={{ bg: 'blue.600' }}
          px={6}
          py={3}
          borderRadius='md'
          textAlign='center'
        >
          Let's get started...
        </Link>
      </Stack>
      <Box flex='1' display='flex' justifyContent='center'>
        {/* Placeholder for the image */}
        <Box
          w={{ base: '250px', md: '350px' }}
          h={{ base: '250px', md: '350px' }}
          bg='blue.100'
          borderRadius='full'
          display='flex'
          justifyContent='center'
          alignItems='center'
        >
          <Text fontSize='2xl' color='blue.700'>
            Your Image Here
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}
