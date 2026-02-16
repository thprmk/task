import mongoose, { Schema, Model } from 'mongoose';

export interface IDoctor extends Document {
  name: string;
  departmentId: mongoose.Types.ObjectId;
  specialization: string;
  slotDuration: number; // in minutes
  workingHours: {
    start: string;
    end: string;
  };
  breakTime?: {
    start: string;
    end: string;
  };
  weeklyOff: number[];
  imageUrl?: string;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    slotDuration: {
      type: Number,
      required: true,
      default: 30,
      min: 15,
      max: 120,
    },
    workingHours: {
      start: {
        type: String,
        required: true,
        match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, // HH:MM format
      },
      end: {
        type: String,
        required: true,
        match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
      },
    },
    breakTime: {
      start: {
        type: String,
        match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
      },
      end: {
        type: String,
        match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
      },
    },
    weeklyOff: {
      type: [Number],
      default: [],
      validate: {
        validator: (arr: number[]) => arr.every((day) => day >= 0 && day <= 6),
        message: 'Weekly off days must be between 0 (Sunday) and 6 (Saturday)',
      },
    },
    imageUrl: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const Doctor: Model<IDoctor> =
  mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema);

export default Doctor;

