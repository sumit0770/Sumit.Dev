import mongoose, { Document, Schema } from 'mongoose';

export interface IOpenSource extends Document {
  repo: string;
  title: string;
  description: string;
  status: 'Merged' | 'Open' | 'Closed';
  url: string;
  order: number;
}

const OpenSourceSchema = new Schema<IOpenSource>(
  {
    repo: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Merged', 'Open', 'Closed'], default: 'Merged' },
    url: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IOpenSource>('OpenSource', OpenSourceSchema);
