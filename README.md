# AIgnite - Web Accessibility Platform

AIgnite is a comprehensive web accessibility platform that uses AI to make the web more accessible for everyone.

## Features

### ✅ Tested and Working
1. **Authentication System**
   - Login/Logout functionality
   - Protected routes
   - Session management

2. **Navigation**
   - Responsive navigation bar
   - Mobile-friendly menu
   - User profile menu with logout option

### 🚧 In Progress
1. **Voice Navigation**
   - Basic voice command recognition
   - Command history display
   - Browser compatibility detection
   - Chrome extension development
   - Need to implement actual navigation actions

2. **Chrome Extension**
   - Basic structure created
   - Manifest file configured
   - Need to implement:
     - Voice command processing
     - Element highlighting
     - Cross-page persistence
     - Settings management

3. **Accessibility Scanner**
   - URL input and validation
   - Website scanning functionality
   - Results display with severity levels
   - WCAG compliance information
   - Code suggestions for fixes

4. **Image Description**
   - Image upload functionality
   - AI-generated alt text
   - Detailed image descriptions
   - Confidence scores
   - Copy to clipboard feature

5. **Video Captioning**
   - Video upload functionality
   - AI-generated captions
   - Multiple format support (SRT, WebVTT, TXT)
   - Download options
   - Copy to clipboard feature

### 📝 TODO List

#### High Priority
1. **Voice Navigation**
   - [ ] Implement actual navigation actions for voice commands
   - [ ] Add support for more complex commands
   - [ ] Improve error handling and feedback
   - [ ] Add voice command suggestions
   - [ ] Implement command history persistence

2. **Chrome Extension**
   - [ ] Complete voice command processing
   - [ ] Implement element highlighting
   - [ ] Add settings management
   - [ ] Create extension popup UI
   - [ ] Add keyboard shortcuts
   - [ ] Publish to Chrome Web Store

3. **Backend Integration**
   - [ ] Set up proper API endpoints
   - [ ] Implement rate limiting
   - [ ] Add error handling
   - [ ] Set up proper authentication
   - [ ] Add request validation

#### Medium Priority
1. **UI/UX Improvements**
   - [ ] Add loading states for all actions
   - [ ] Improve error messages
   - [ ] Add success notifications
   - [ ] Implement proper form validation
   - [ ] Add tooltips for features

2. **Testing**
   - [ ] Add unit tests
   - [ ] Add integration tests
   - [ ] Add end-to-end tests
   - [ ] Set up CI/CD pipeline
   - [ ] Add test coverage reporting

3. **Documentation**
   - [ ] Add API documentation
   - [ ] Create user guide
   - [ ] Add developer documentation
   - [ ] Create contribution guidelines
   - [ ] Add setup instructions

#### Low Priority
1. **Additional Features**
   - [ ] Add dark mode support
   - [ ] Implement user preferences
   - [ ] Add analytics
   - [ ] Create dashboard
   - [ ] Add export functionality

2. **Performance**
   - [ ] Optimize image processing
   - [ ] Improve video processing
   - [ ] Add caching
   - [ ] Optimize API calls
   - [ ] Add lazy loading

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Chrome browser (for extension development)

### Installation
1. Clone the repository
```bash
git clone https://github.com/yourusername/aignite.git
cd aignite
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server
```bash
npm run dev:frontend
```

### Development
- Frontend runs on http://localhost:5173
- Backend runs on http://localhost:5001
- Extension can be loaded from the `extension` directory

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- [Chakra UI](https://chakra-ui.com/) for the component library
- [React](https://reactjs.org/) for the frontend framework
- [Vite](https://vitejs.dev/) for the build tool
- [TypeScript](https://www.typescriptlang.org/) for type safety

