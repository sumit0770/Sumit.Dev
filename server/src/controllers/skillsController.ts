import { Request, Response } from 'express';
import Skill from '../models/Skill';

export const getSkills = async (_req: Request, res: Response): Promise<void> => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.json({ success: true, count: skills.length, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const createSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data.' });
  }
};
