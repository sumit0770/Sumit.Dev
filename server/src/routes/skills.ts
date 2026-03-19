import { Router } from 'express';
import { getSkills, createSkill } from '../controllers/skillsController';

const router = Router();

router.get('/', getSkills);
router.post('/', createSkill);

export default router;
