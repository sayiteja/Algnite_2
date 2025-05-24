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
  Badge,
  Select,
  useClipboard,
  Tooltip,
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { FaUpload, FaSpinner, FaDownload, FaCopy, FaCheck } from 'react-icons/fa'
import { accessibilityApi } from '../services/api'

interface Caption {
  startTime: string
  endTime: string
  text: string
  confidence: number
}

interface CaptionFormat {
  value: string
  label: string
  extension: string
}

const captionFormats: CaptionFormat[] = [
  { value: 'srt', label: 'SubRip (SRT)', extension: 'srt' },
  { value: 'vtt', label: 'WebVTT', extension: 'vtt' },
  { value: 'txt', label: 'Plain Text', extension: 'txt' },
]

const VideoCaptioning = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [captions, setCaptions] = useState<Caption[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [selectedFormat, setSelectedFormat] = useState<CaptionFormat>(captionFormats[0])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()
  const { hasCopied, onCopy } = useClipboard(
    captions.map((c) => `${c.startTime} --> ${c.endTime}\n${c.text}`).join('\n\n')
  )

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
    if (!selectedVideo || !fileInputRef.current?.files?.[0]) return

    setIsGenerating(true)
    setProgress(0)

    try {
      const result = await accessibilityApi.generateVideoCaptions(
        fileInputRef.current.files[0]
      )
      setCaptions(result)
      
      toast({
        title: 'Success',
        description: 'Video captions generated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate captions',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadCaptions = () => {
    if (captions.length === 0) return

    let content = ''
    switch (selectedFormat.value) {
      case 'srt':
        content = captions
          .map((caption, index) => {
            return `${index + 1}\n${caption.startTime} --> ${caption.endTime}\n${caption.text}\n`
          })
          .join('\n')
        break
      case 'vtt':
        content = `WEBVTT\n\n${captions
          .map((caption) => {
            return `${caption.startTime} --> ${caption.endTime}\n${caption.text}\n`
          })
          .join('\n')}`
        break
      case 'txt':
        content = captions.map((caption) => caption.text).join('\n')
        break
    }

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `captions.${selectedFormat.extension}`
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
                <Stack direction="row" spacing={4}>
                  <Select
                    value={selectedFormat.value}
                    onChange={(e) =>
                      setSelectedFormat(
                        captionFormats.find((f) => f.value === e.target.value) ||
                          captionFormats[0]
                      )
                    }
                    w="200px"
                  >
                    {captionFormats.map((format) => (
                      <option key={format.value} value={format.value}>
                        {format.label}
                      </option>
                    ))}
                  </Select>
                  <Button
                    leftIcon={<Icon as={FaDownload} />}
                    onClick={downloadCaptions}
                    colorScheme="brand"
                  >
                    Download
                  </Button>
                  <Tooltip label={hasCopied ? 'Copied!' : 'Copy to clipboard'}>
                    <Button
                      leftIcon={<Icon as={hasCopied ? FaCheck : FaCopy} />}
                      onClick={onCopy}
                    >
                      {hasCopied ? 'Copied' : 'Copy'}
                    </Button>
                  </Tooltip>
                </Stack>
              </Flex>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Time</Th>
                    <Th>Text</Th>
                    <Th>Confidence</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {captions.map((caption, index) => (
                    <Tr key={index}>
                      <Td>
                        {caption.startTime} - {caption.endTime}
                      </Td>
                      <Td>{caption.text}</Td>
                      <Td>
                        <Badge
                          colorScheme={
                            caption.confidence > 0.8
                              ? 'green'
                              : caption.confidence > 0.6
                              ? 'yellow'
                              : 'red'
                          }
                        >
                          {Math.round(caption.confidence * 100)}%
                        </Badge>
                      </Td>
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