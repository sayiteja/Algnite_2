import express from 'express';
import { protect } from '../middleware/auth';
import {
  scanWebsite,
  generateImageDescription,
  generateVideoCaptions,
} from '../controllers/accessibilityController';

const router = express.Router();

// All routes are protected
router.use(protect);

router.post('/scan', scanWebsite);
router.post('/image-description', generateImageDescription);
router.post('/video-captions', generateVideoCaptions);

export default router; 