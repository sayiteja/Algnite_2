import express from 'express';
import { protect } from '../middleware/auth';
import {
  updatePreferences,
  updateProfile,
  getProfile,
} from '../controllers/userController';

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/profile', getProfile);
router.patch('/preferences', updatePreferences);
router.patch('/profile', updateProfile);

export default router; 