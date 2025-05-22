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
} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import { FaUpload, FaSpinner } from 'react-icons/fa'

const ImageDescription = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [description, setDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const toast = useToast()

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
      setDescription('')
    }
    reader.readAsDataURL(file)
  }

  const generateDescription = async () => {
    if (!selectedImage) return

    setIsGenerating(true)
    setProgress(0)

    try {
      // TODO: Implement actual AI image description generation
      // This is a mock implementation
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        setProgress(i)
      }

      const mockDescription = `This image shows a beautiful landscape with mountains in the background and a serene lake in the foreground. The scene is captured during sunset, with warm orange and purple hues painting the sky. The water reflects the sky's colors, creating a mirror-like effect.`

      setDescription(mockDescription)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate image description',
        status: 'error',
        duration: 3000,
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
            <Box w="full" maxW="500px">
              <Text fontWeight="bold" mb={2}>
                Generated Description:
              </Text>
              <Textarea
                value={description}
                readOnly
                rows={6}
                bg="gray.50"
                _hover={{ bg: 'gray.100' }}
              />
              <Flex justify="flex-end" mt={2}>
                <Button
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(description)
                    toast({
                      title: 'Copied',
                      description: 'Description copied to clipboard',
                      status: 'success',
                      duration: 2000,
                    })
                  }}
                >
                  Copy to Clipboard
                </Button>
              </Flex>
            </Box>
          )}
        </VStack>
      </Stack>
    </Container>
  )
}

export default ImageDescription 