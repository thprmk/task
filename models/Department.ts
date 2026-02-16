import mongoose, { Schema, Model } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  description?: string;
  isActive?: boolean;
  icon?: string;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Department: Model<IDepartment> =
  mongoose.models.Department || mongoose.model<IDepartment>('Department', DepartmentSchema);

export default Department;

