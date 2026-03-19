import { Request, Response } from 'express';
import OpenSource from '../models/OpenSource';

export const getContributions = async (_req: Request, res: Response): Promise<void> => {
  try {
    const contributions = await OpenSource.find().sort({ order: 1 });
    res.json({ success: true, count: contributions.length, data: contributions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

export const createContribution = async (req: Request, res: Response): Promise<void> => {
  try {
    const contribution = await OpenSource.create(req.body);
    res.status(201).json({ success: true, data: contribution });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid data.' });
  }
};
