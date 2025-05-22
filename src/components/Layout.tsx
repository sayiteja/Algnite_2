import { Box, Container, Flex, Link, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        px={4}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container maxW="container.xl">
          <Flex h={16} alignItems="center" justifyContent="space-between">
            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
              <Text fontSize="xl" fontWeight="bold" color="brand.500">
                AIgnite
              </Text>
            </Link>

            <Stack direction="row" spacing={8}>
              <Link as={RouterLink} to="/scanner" color="gray.600" _hover={{ color: 'brand.500' }}>
                Scanner
              </Link>
              <Link as={RouterLink} to="/voice" color="gray.600" _hover={{ color: 'brand.500' }}>
                Voice Navigation
              </Link>
              <Link as={RouterLink} to="/image" color="gray.600" _hover={{ color: 'brand.500' }}>
                Image Description
              </Link>
              <Link as={RouterLink} to="/video" color="gray.600" _hover={{ color: 'brand.500' }}>
                Video Captioning
              </Link>
            </Stack>
          </Flex>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        {children}
      </Container>
    </Box>
  )
}

export default Layout 