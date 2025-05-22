import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useToast,
  VStack,
  Progress,
  Textarea,
  Icon,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { FaUpload, FaSpinner, FaDownload } from 'react-icons/fa'

interface Caption {
  startTime: string
  endTime: string
  text: string
}

const VideoCaptioning = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [captions, setCaptions] = useState<Caption[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('video/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a video file',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedVideo(e.target?.result as string)
      setCaptions([])
    }
    reader.readAsDataURL(file)
  }

  const generateCaptions = async () => {
    if (!selectedVideo) return

    setIsGenerating(true)
    setProgress(0)

    try {
      // TODO: Implement actual AI video captioning
      // This is a mock implementation
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setProgress(i)
      }

      const mockCaptions: Caption[] = [
        {
          startTime: '00:00:00',
          endTime: '00:00:05',
          text: 'Welcome to this video about web accessibility.',
        },
        {
          startTime: '00:00:05',
          endTime: '00:00:10',
          text: 'Today we will discuss how to make websites more inclusive.',
        },
        {
          startTime: '00:00:10',
          endTime: '00:00:15',
          text: 'We will cover topics like screen readers and keyboard navigation.',
        },
      ]

      setCaptions(mockCaptions)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate captions',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadSRT = () => {
    if (captions.length === 0) return

    const srtContent = captions
      .map((caption, index) => {
        return `${index + 1}\n${caption.startTime} --> ${caption.endTime}\n${caption.text}\n`
      })
      .join('\n')

    const blob = new Blob([srtContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'captions.srt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Container maxW="container.xl">
      <Stack spacing={8}>
        <Box textAlign="center">
          <Heading>Video Caption Generator</Heading>
          <Text mt={4} color="gray.600">
            Upload a video to generate AI-powered captions and transcripts
          </Text>
        </Box>

        <VStack spacing={6}>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />

          <Button
            leftIcon={<Icon as={FaUpload} />}
            onClick={() => fileInputRef.current?.click()}
            colorScheme="brand"
          >
            Upload Video
          </Button>

          {selectedVideo && (
            <Box
              maxW="800px"
              w="full"
              borderWidth={1}
              borderRadius="lg"
              overflow="hidden"
            >
              <video
                src={selectedVideo}
                controls
                style={{ width: '100%', maxHeight: '400px' }}
              />
            </Box>
          )}

          {selectedVideo && captions.length === 0 && (
            <Button
              colorScheme="brand"
              onClick={generateCaptions}
              isLoading={isGenerating}
              loadingText="Generating..."
              leftIcon={<Icon as={FaSpinner} />}
            >
              Generate Captions
            </Button>
          )}

          {isGenerating && (
            <Box w="full" maxW="800px">
              <Progress value={progress} size="sm" colorScheme="brand" />
              <Text mt={2} textAlign="center" fontSize="sm" color="gray.500">
                Generating captions... {progress}%
              </Text>
            </Box>
          )}

          {captions.length > 0 && (
            <Box w="full" maxW="800px">
              <Flex justify="space-between" align="center" mb={4}>
                <Text fontWeight="bold">Generated Captions:</Text>
                <Button
                  leftIcon={<Icon as={FaDownload} />}
                  onClick={downloadSRT}
                  size="sm"
                >
                  Download SRT
                </Button>
              </Flex>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Time</Th>
                    <Th>Text</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {captions.map((caption, index) => (
                    <Tr key={index}>
                      <Td>
                        {caption.startTime} - {caption.endTime}
                      </Td>
                      <Td>{caption.text}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
        </VStack>
      </Stack>
    </Container>
  )
}

export default VideoCaptioning 