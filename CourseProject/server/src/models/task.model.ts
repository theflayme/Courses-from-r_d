import { Schema, model, Document, } from 'mongoose';
import z from 'zod'

// Zod-схема для валідації
export const taskValidationSchema = z.object({
  title: z.string().min(5),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'review', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
  deadline: z.string(),
});

export type TaskType = z.infer<typeof taskValidationSchema>;

// Типізація для Mongoose
export type ITask = Document & {
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  deadline?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Схема Mongoose
const taskSchemaDB = new Schema<ITask>({
  title: { type: String, required: true, minlength: 5 },
  description: { type: String },
  status: { type: String, enum: ['todo', 'in_progress', 'review', 'done'], default: 'todo' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  deadline: { type: Date },
}, {
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
                updatedAt: ret.updatedAt
            };
        }
    }
});

export const Task = model<ITask>('Task', taskSchemaDB);