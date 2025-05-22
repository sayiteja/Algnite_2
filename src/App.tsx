import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { theme } from './theme'
import Layout from './components/Layout'
import Home from './pages/Home'
import AccessibilityScanner from './pages/AccessibilityScanner'
import VoiceNavigation from './pages/VoiceNavigation'
import ImageDescription from './pages/ImageDescription'
import VideoCaptioning from './pages/VideoCaptioning'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scanner" element={<AccessibilityScanner />} />
            <Route path="/voice" element={<VoiceNavigation />} />
            <Route path="/image" element={<ImageDescription />} />
            <Route path="/video" element={<VideoCaptioning />} />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  )
}

export default App
