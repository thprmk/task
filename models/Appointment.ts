import mongoose, { Schema, Model } from 'mongoose';
import { AppointmentStatus } from '../lib/types/appointment.types';

export interface IAppointment extends Document {
  doctorId: mongoose.Types.ObjectId;
  departmentId: mongoose.Types.ObjectId;
  date: Date;
  timeSlot: string;
  status: AppointmentStatus;
  patient: {
    name: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    phone: string;
    email: string;
    reason: string;
  };
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      required: true,
      match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]-([0-1][0-9]|2[0-3]):[0-5][0-9]$/, // "09:00-09:30"
    },
    status: {
      type: String,
      enum: Object.values(AppointmentStatus),
      default: AppointmentStatus.PENDING,
      required: true,
    },
    patient: {
      name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
      },
      age: {
        type: Number,
        required: true,
        min: 1,
        max: 120,
      },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      reason: {
        type: String,
        required: true,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index to prevent double booking
AppointmentSchema.index({ doctorId: 1, date: 1, timeSlot: 1 }, { unique: true });

const Appointment: Model<IAppointment> =
  mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default Appointment;

