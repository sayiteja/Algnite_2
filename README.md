# Algnite - AI-Powered Web Accessibility Tools

Algnite is a comprehensive web accessibility platform that leverages AI to make websites more accessible for users with disabilities. The platform includes features for image description generation, video captioning, voice navigation, and accessibility scanning.

## Features

- **Image Description Generation**: Automatically generates alt text and detailed descriptions for images
- **Video Captioning**: Creates accurate captions for video content
- **Voice Navigation**: Chrome extension for voice-controlled website navigation
- **Accessibility Scanner**: Comprehensive website accessibility analysis
- **User Authentication**: Secure user management with JWT
- **Customizable Preferences**: User-specific accessibility settings

## Tech Stack

### Frontend
- React with TypeScript
- Chakra UI for components
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Google Cloud Vision API
- Google Cloud Speech-to-Text API

### Chrome Extension
- TypeScript
- Chrome Extension Manifest V3
- Web Speech API

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Google Cloud account with Vision and Speech-to-Text APIs enabled
- Chrome browser (for extension development)

## Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/algnite.git
cd algnite
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install extension dependencies
cd ../extension
npm install
```

3. Set up environment variables:

Create `.env` files in both frontend and backend directories:

Backend `.env`:
```
PORT=5000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
GOOGLE_APPLICATION_CREDENTIALS=path_to_google_credentials.json
```

Frontend `.env`:
```
VITE_API_URL=http://localhost:5000
```

## Development

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Build the Chrome extension:
```bash
cd extension
npm run build
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile
- `PATCH /api/auth/profile` - Update user profile

### Accessibility
- `POST /api/accessibility/scan` - Scan website for accessibility issues
- `POST /api/accessibility/image` - Generate image description
- `POST /api/accessibility/video` - Generate video captions

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong, unique secrets for JWT
   - Keep API keys secure

2. **API Security**
   - All routes are protected with JWT authentication
   - Rate limiting implemented
   - CORS configured for security

3. **Data Protection**
   - Passwords are hashed using bcrypt
   - Sensitive data is encrypted
   - Input validation on all endpoints

## Deployment

1. **Backend Deployment**
   - Build the TypeScript code: `npm run build`
   - Set up environment variables on the server
   - Use PM2 for process management

2. **Frontend Deployment**
   - Build the React app: `npm run build`
   - Deploy to your preferred hosting service

3. **Chrome Extension**
   - Build the extension: `npm run build`
   - Package and submit to Chrome Web Store

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For support, email support@algnite.com or create an issue in the repository.

## Acknowledgments

- Google Cloud Platform for AI services
- MongoDB Atlas for database hosting
- Open source community for various tools and libraries
