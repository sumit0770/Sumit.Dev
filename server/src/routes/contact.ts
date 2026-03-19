import { Router } from 'express';
import { body } from 'express-validator';
import { sendMessage, getMessages } from '../controllers/contactController';

const router = Router();

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Valid email is required.'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters.'),
  ],
  sendMessage
);

router.get('/', getMessages);

export default router;
