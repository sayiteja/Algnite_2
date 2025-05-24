import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { theme } from './theme'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import AccessibilityScanner from './pages/AccessibilityScanner'
import VoiceNavigation from './pages/VoiceNavigation'
import ImageDescription from './pages/ImageDescription'
import VideoCaptioning from './pages/VideoCaptioning'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/accessibility-scanner" element={<AccessibilityScanner />} />
              <Route path="/voice-navigation" element={<VoiceNavigation />} />
              <Route path="/image-description" element={<ImageDescription />} />
              <Route path="/video-captioning" element={<VideoCaptioning />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
