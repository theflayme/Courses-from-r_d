import { Schema, model } from 'mongoose';
import { type TaskType, taskPriority, taskStatus } from '../types/task.types';

// Схема Mongoose
const taskSchemaDB = new Schema<TaskType>(
  {
    title: { type: String, required: true, minlength: 5 },
    description: { type: String },
    status: { type: String, enum: taskStatus },
    priority: { type: String, enum: taskPriority },
    deadline: { type: Date },
  },
  {
    timestamps: true,
    toJSON: {
      transform(ret) {
        return {
          id: ret._id,
          title: ret.title,
          description: ret.description,
          status: ret.status,
          priority: ret.priority,
          deadline: ret.deadline,
          createdAt: ret.createdAt,
          updatedAt: ret.updatedAt,
        };
      },
    },
  },
);

export const Task = model<TaskType>('Task', taskSchemaDB);
