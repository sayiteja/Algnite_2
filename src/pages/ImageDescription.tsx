import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useToast,
  VStack,
  Image,
  Progress,
  Textarea,
  Icon,
  Flex,
  Badge,
  useClipboard,
  Tooltip,
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { FaUpload, FaSpinner, FaCopy, FaCheck } from 'react-icons/fa'
import { accessibilityApi } from '../services/api'

interface ImageDescription {
  altText: string
  detailedDescription: string
  confidence: number
  tags: string[]
}

const ImageDescription = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [description, setDescription] = useState<ImageDescription | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()
  const { hasCopied, onCopy } = useClipboard(description?.altText || '')

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload an image file',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string)
      setDescription(null)
    }
    reader.readAsDataURL(file)
  }

  const generateDescription = async () => {
    if (!selectedImage || !fileInputRef.current?.files?.[0]) return

    setIsGenerating(true)
    setProgress(0)

    try {
      const result = await accessibilityApi.generateImageDescription(
        fileInputRef.current.files[0]
      )
      setDescription(result)
      
      toast({
        title: 'Success',
        description: 'Image description generated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate description',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Container maxW="container.xl">
      <Stack spacing={8}>
        <Box textAlign="center">
          <Heading>Image Description Generator</Heading>
          <Text mt={4} color="gray.600">
            Upload an image to get an AI-generated description for screen readers
          </Text>
        </Box>

        <VStack spacing={6}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            ref={fileInputRef}
          />

          <Button
            leftIcon={<Icon as={FaUpload} />}
            onClick={() => fileInputRef.current?.click()}
            colorScheme="brand"
          >
            Upload Image
          </Button>

          {selectedImage && (
            <Box
              maxW="500px"
              w="full"
              borderWidth={1}
              borderRadius="lg"
              overflow="hidden"
            >
              <Image src={selectedImage} alt="Uploaded image" />
            </Box>
          )}

          {selectedImage && !description && (
            <Button
              colorScheme="brand"
              onClick={generateDescription}
              isLoading={isGenerating}
              loadingText="Generating..."
              leftIcon={<Icon as={FaSpinner} />}
            >
              Generate Description
            </Button>
          )}

          {isGenerating && (
            <Box w="full" maxW="500px">
              <Progress value={progress} size="sm" colorScheme="brand" />
              <Text mt={2} textAlign="center" fontSize="sm" color="gray.500">
                Generating description... {progress}%
              </Text>
            </Box>
          )}

          {description && (
            <Box w="full" maxW="500px" p={6} borderWidth={1} borderRadius="lg">
              <Stack spacing={4}>
                <Flex justify="space-between" align="center">
                  <Heading size="md">Generated Description</Heading>
                  <Tooltip label={hasCopied ? 'Copied!' : 'Copy to clipboard'}>
                    <Button
                      size="sm"
                      leftIcon={<Icon as={hasCopied ? FaCheck : FaCopy} />}
                      onClick={onCopy}
                    >
                      {hasCopied ? 'Copied' : 'Copy'}
                    </Button>
                  </Tooltip>
                </Flex>

                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Alt Text:
                  </Text>
                  <Textarea
                    value={description.altText}
                    readOnly
                    rows={2}
                    bg="gray.50"
                  />
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Detailed Description:
                  </Text>
                  <Textarea
                    value={description.detailedDescription}
                    readOnly
                    rows={4}
                    bg="gray.50"
                  />
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Confidence: {Math.round(description.confidence * 100)}%
                  </Text>
                  <Progress
                    value={description.confidence * 100}
                    size="sm"
                    colorScheme={
                      description.confidence > 0.8
                        ? 'green'
                        : description.confidence > 0.6
                        ? 'yellow'
                        : 'red'
                    }
                  />
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>
                    Tags:
                  </Text>
                  <Flex wrap="wrap" gap={2}>
                    {description.tags.map((tag, index) => (
                      <Badge key={index} colorScheme="blue">
                        {tag}
                      </Badge>
                    ))}
                  </Flex>
                </Box>
              </Stack>
            </Box>
          )}
        </VStack>
      </Stack>
    </Container>
  )
}

export default ImageDescription 