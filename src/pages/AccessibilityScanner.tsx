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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { accessibilityApi } from '../services/api'

interface ScanResult {
  type: 'error' | 'warning' | 'info'
  message: string
  element?: string
  suggestion?: string
  code?: string
  impact?: 'critical' | 'serious' | 'moderate' | 'minor'
  wcag?: string
  url?: string
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
      const scanResults = await accessibilityApi.scanWebsite(url)
      setResults(scanResults)
      
      if (scanResults.length === 0) {
        toast({
          title: 'Success',
          description: 'No accessibility issues found!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to scan the website',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsScanning(false)
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical':
        return 'red'
      case 'serious':
        return 'orange'
      case 'moderate':
        return 'yellow'
      case 'minor':
        return 'blue'
      default:
        return 'gray'
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
            <Accordion allowMultiple>
              {results.map((result, index) => (
                <AccordionItem key={index}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <Alert
                          status={result.type === 'error' ? 'error' : result.type === 'warning' ? 'warning' : 'info'}
                          variant="left-accent"
                        >
                          <AlertIcon />
                          <Box flex="1">
                            <AlertTitle>{result.message}</AlertTitle>
                            {result.impact && (
                              <Badge colorScheme={getImpactColor(result.impact)} ml={2}>
                                {result.impact}
                              </Badge>
                            )}
                            {result.wcag && (
                              <Badge colorScheme="purple" ml={2}>
                                WCAG: {result.wcag}
                              </Badge>
                            )}
                          </Box>
                        </Alert>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Stack spacing={3}>
                      {result.element && (
                        <Text>
                          <strong>Element:</strong> {result.element}
                        </Text>
                      )}
                      {result.suggestion && (
                        <Text>
                          <strong>Suggestion:</strong> {result.suggestion}
                        </Text>
                      )}
                      {result.code && (
                        <Box>
                          <Text fontWeight="bold">Code Example:</Text>
                          <Box
                            as="pre"
                            p={3}
                            bg="gray.100"
                            borderRadius="md"
                            overflowX="auto"
                          >
                            <code>{result.code}</code>
                          </Box>
                        </Box>
                      )}
                      {result.url && (
                        <Link href={result.url} color="brand.500" isExternal>
                          Learn more about this issue
                        </Link>
                      )}
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </VStack>
        )}
      </Stack>
    </Container>
  )
}

export default AccessibilityScanner 