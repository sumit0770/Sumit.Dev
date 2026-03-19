import { Request, Response } from 'express';
import Experience from '../models/Experience';

export const getExperience = async (_req: Request, res: Response): Promise<void> => {
  try {
    const experience = await Experience.find().sort({ order: 1 });
    res.json({ success: true, count: experience.length, data: experience });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const createExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const exp = await Experience.create(req.body);
    res.status(201).json({ success: true, data: exp });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data.' });
  }
};
