import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react'
import { FaMicrophone, FaImage, FaVideo, FaSearch } from 'react-icons/fa'
import { Link as RouterLink } from 'react-router-dom'

const Feature = ({ title, text, icon, href }: any) => {
  return (
    <Stack
      as={RouterLink}
      to={href}
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
      rounded="xl"
      shadow="lg"
      _hover={{ transform: 'translateY(-5px)', transition: 'all 0.3s ease' }}
    >
      <Icon as={icon} w={10} h={10} color="brand.500" />
      <Text fontWeight="bold" fontSize="lg">
        {title}
      </Text>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
    </Stack>
  )
}

const Home = () => {
  return (
    <Box>
      <Container maxW="container.xl">
        <Stack
          as={Box}
          textAlign="center"
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight="110%"
          >
            Making the Web <br />
            <Text as="span" color="brand.500">
              Accessible for All
            </Text>
          </Heading>
          <Text color="gray.500" maxW="3xl" mx="auto">
            AIgnite provides AI-powered tools to make the web more accessible for everyone.
            From voice navigation to image descriptions, we're building a more inclusive
            digital world.
          </Text>
          <Stack
            direction="column"
            spacing={3}
            align="center"
            alignSelf="center"
            position="relative"
          >
            <Button
              as={RouterLink}
              to="/scanner"
              colorScheme="brand"
              bg="brand.500"
              rounded="full"
              px={6}
              _hover={{
                bg: 'brand.600',
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10} py={10}>
          <Feature
            icon={FaSearch}
            title="Accessibility Scanner"
            text="Scan your website for accessibility issues and get AI-powered suggestions for improvements."
            href="/scanner"
          />
          <Feature
            icon={FaMicrophone}
            title="Voice Navigation"
            text="Navigate websites using voice commands, making it easier for users with motor impairments."
            href="/voice"
          />
          <Feature
            icon={FaImage}
            title="Image Description"
            text="Get AI-generated descriptions of images for visually impaired users."
            href="/image"
          />
          <Feature
            icon={FaVideo}
            title="Video Captioning"
            text="Automatically generate captions and transcripts for video content."
            href="/video"
          />
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Home 