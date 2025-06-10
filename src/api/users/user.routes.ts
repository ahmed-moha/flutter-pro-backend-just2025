import { Router } from 'express';
import { UserController } from './user.controller';
import { authGuard } from '../../middleware/auth.middleware';
import { upload } from '../../middleware/upload.middleware';

const router = Router();
const userController = new UserController();

// Public routes
router.post('/register', upload.single('photo'), userController.register);
router.post('/login', userController.login);

// Protected routes
router.get('/profile', authGuard, userController.getProfile);
router.get('/', authGuard, userController.getUsers);

export default router; 