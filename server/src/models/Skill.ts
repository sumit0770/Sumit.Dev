import mongoose, { Document, Schema } from 'mongoose';

export interface ISkill extends Document {
  category: string;
  icon: string;
  skills: string[];
  order: number;
}

const SkillSchema = new Schema<ISkill>(
  {
    category: { type: String, required: true },
    icon: { type: String, required: true },
    skills: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ISkill>('Skill', SkillSchema);
