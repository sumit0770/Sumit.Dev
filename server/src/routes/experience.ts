import { Router } from 'express';
import { getExperience, createExperience } from '../controllers/experienceController';

const router = Router();

router.get('/', getExperience);
router.post('/', createExperience);

export default router;
