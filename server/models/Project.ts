import { model, Schema } from 'mongoose';

interface Project {
  name: string;
  clientId: Schema.Types.ObjectId;
  description: string;
  status: string;
}

const ProjectSchema = new Schema<Project>({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
  },
});

export const ProjectModel = model<Project>('Project', ProjectSchema);
