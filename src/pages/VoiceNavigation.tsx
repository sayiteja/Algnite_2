import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useToast,
  VStack,
  Icon,
  Flex,
  Badge,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa'

interface Command {
  text: string
  timestamp: Date
  type: 'success' | 'error'
}

const VoiceNavigation = () => {
  const [isListening, setIsListening] = useState(false)
  const [commands, setCommands] = useState<Command[]>([])
  const toast = useToast()

  useEffect(() => {
    // Check if browser supports speech recognition
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: 'Not Supported',
        description: 'Speech recognition is not supported in your browser.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [toast])

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) return

    if (!isListening) {
      const recognition = new (window as any).webkitSpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true

      recognition.onstart = () => {
        setIsListening(true)
        toast({
          title: 'Listening',
          description: 'Voice recognition is active',
          status: 'info',
          duration: 2000,
        })
      }

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('')

        if (event.results[0].isFinal) {
          handleCommand(transcript)
        }
      }

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error)
        setIsListening(false)
        toast({
          title: 'Error',
          description: 'Failed to recognize speech',
          status: 'error',
          duration: 3000,
        })
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      setIsListening(false)
    }
  }

  const handleCommand = (command: string) => {
    // TODO: Implement actual command handling logic
    const newCommand: Command = {
      text: command,
      timestamp: new Date(),
      type: Math.random() > 0.5 ? 'success' : 'error', // Mock implementation
    }

    setCommands((prev) => [newCommand, ...prev].slice(0, 10))
  }

  return (
    <Container maxW="container.xl">
      <Stack spacing={8}>
        <Box textAlign="center">
          <Heading>Voice Navigation</Heading>
          <Text mt={4} color="gray.600">
            Use voice commands to navigate the web. Click the microphone button to start.
          </Text>
        </Box>

        <Flex justify="center" py={8}>
          <Button
            size="lg"
            colorScheme={isListening ? 'red' : 'brand'}
            onClick={toggleListening}
            leftIcon={<Icon as={isListening ? FaMicrophoneSlash : FaMicrophone} />}
            isDisabled={!('webkitSpeechRecognition' in window)}
          >
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </Button>
        </Flex>

        <VStack spacing={4} align="stretch">
          <Text fontWeight="bold">Recent Commands:</Text>
          {commands.map((command, index) => (
            <Box
              key={index}
              p={4}
              bg="white"
              shadow="sm"
              rounded="md"
              borderWidth={1}
            >
              <Flex justify="space-between" align="center">
                <Text>{command.text}</Text>
                <Badge colorScheme={command.type === 'success' ? 'green' : 'red'}>
                  {command.type}
                </Badge>
              </Flex>
              <Text fontSize="sm" color="gray.500" mt={2}>
                {command.timestamp.toLocaleTimeString()}
              </Text>
            </Box>
          ))}
          {commands.length === 0 && (
            <Text color="gray.500" textAlign="center">
              No commands yet. Start speaking to see your commands here.
            </Text>
          )}
        </VStack>
      </Stack>
    </Container>
  )
}

export default VoiceNavigation 