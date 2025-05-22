import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
} from '@chakra-ui/react'
import { useState } from 'react'

interface ScanResult {
  type: 'error' | 'warning' | 'info'
  message: string
  element?: string
  suggestion?: string
}

const AccessibilityScanner = () => {
  const [url, setUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [results, setResults] = useState<ScanResult[]>([])
  const toast = useToast()

  const handleScan = async () => {
    if (!url) {
      toast({
        title: 'Error',
        description: 'Please enter a URL to scan',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    setIsScanning(true)
    setResults([])

    try {
      // TODO: Implement actual scanning logic with AI
      // This is a mock implementation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResults: ScanResult[] = [
        {
          type: 'error',
          message: 'Missing alt text on images',
          element: 'img',
          suggestion: 'Add descriptive alt text to all images',
        },
        {
          type: 'warning',
          message: 'Low color contrast detected',
          element: 'text',
          suggestion: 'Increase contrast ratio to meet WCAG 2.1 standards',
        },
        {
          type: 'info',
          message: 'Consider adding ARIA labels',
          element: 'button',
          suggestion: 'Add aria-label attributes to interactive elements',
        },
      ]

      setResults(mockResults)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to scan the website',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <Container maxW="container.xl">
      <Stack spacing={8}>
        <Box textAlign="center">
          <Heading>Accessibility Scanner</Heading>
          <Text mt={4} color="gray.600">
            Enter a URL to scan for accessibility issues and get AI-powered suggestions
          </Text>
        </Box>

        <FormControl>
          <FormLabel>Website URL</FormLabel>
          <Stack direction="row" spacing={4}>
            <Input
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              colorScheme="brand"
              onClick={handleScan}
              isLoading={isScanning}
              loadingText="Scanning..."
            >
              Scan
            </Button>
          </Stack>
        </FormControl>

        {isScanning && (
          <Box textAlign="center" py={8}>
            <Spinner size="xl" color="brand.500" />
            <Text mt={4}>Analyzing website accessibility...</Text>
          </Box>
        )}

        {results.length > 0 && (
          <VStack spacing={4} align="stretch">
            {results.map((result, index) => (
              <Alert
                key={index}
                status={result.type === 'error' ? 'error' : result.type === 'warning' ? 'warning' : 'info'}
                variant="left-accent"
              >
                <AlertIcon />
                <Box>
                  <AlertTitle>{result.message}</AlertTitle>
                  {result.element && (
                    <AlertDescription>
                      Element: {result.element}
                      {result.suggestion && (
                        <>
                          <br />
                          Suggestion: {result.suggestion}
                        </>
                      )}
                    </AlertDescription>
                  )}
                </Box>
              </Alert>
            ))}
          </VStack>
        )}
      </Stack>
    </Container>
  )
}

export default AccessibilityScanner 