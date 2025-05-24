# Algnite Backend

This is the backend service for the Algnite accessibility platform. It provides APIs for user authentication, accessibility scanning, image description generation, and video captioning.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Google Cloud account with the following APIs enabled:
  - Cloud Vision API
  - Cloud Speech-to-Text API
  - Cloud Storage API

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/algnite
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   NODE_ENV=development

   # Google Cloud Configuration
   GOOGLE_APPLICATION_CREDENTIALS=path/to/your/credentials.json
   GCS_BUCKET=algnite-assets

   # CORS Configuration
   CORS_ORIGIN=http://localhost:5173
   ```

3. Download your Google Cloud credentials JSON file and update the `GOOGLE_APPLICATION_CREDENTIALS` path in the `.env` file.

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/validate` - Validate JWT token

### User

- `GET /api/user/profile` - Get user profile
- `PATCH /api/user/preferences` - Update user preferences
- `PATCH /api/user/profile` - Update user profile

### Accessibility

- `POST /api/accessibility/scan` - Scan website for accessibility issues
- `POST /api/accessibility/image-description` - Generate image description
- `POST /api/accessibility/video-captions` - Generate video captions

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests

## Project Structure

```
src/
  ├── controllers/     # Route controllers
  ├── middleware/      # Custom middleware
  ├── models/         # Database models
  ├── routes/         # API routes
  ├── services/       # Business logic
  ├── utils/          # Utility functions
  └── index.ts        # Entry point
```

## Error Handling

The API uses a centralized error handling mechanism. All errors are caught and formatted consistently before being sent to the client.

## Security

- JWT-based authentication
- Password hashing with bcrypt
- CORS enabled
- Rate limiting (TODO)
- Input validation (TODO)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 