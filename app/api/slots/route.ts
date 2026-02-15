import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Doctor from '../../../models/Doctor';
import Appointment from '../../../models/Appointment';
import { generateSlots, getAvailableSlots } from '../../lib/utils/slotManager';
import { startOfDay, isSameDay } from 'date-fns';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get('doctorId');
    const date = searchParams.get('date');

    if (!doctorId || !date) {
      return NextResponse.json(
        { success: false, error: 'doctorId and date are required' },
        { status: 400 }
      );
    }

    // Fetch doctor details
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return NextResponse.json(
        { success: false, error: 'Doctor not found' },
        { status: 404 }
      );
    }

    // Parse date
    const selectedDate = new Date(date);
    const dateStart = startOfDay(selectedDate);

    // Fetch booked appointments for this doctor on this date
    const bookedAppointments = await Appointment.find({
      doctorId,
      date: {
        $gte: dateStart,
        $lt: new Date(dateStart.getTime() + 24 * 60 * 60 * 1000), // Next day
      },
      status: { $in: ['pending', 'confirmed'] },
    });

    const bookedSlots = bookedAppointments.map((apt) => apt.timeSlot);

    // Generate available slots
    const slotConfig = {
      slotDuration: doctor.slotDuration || 30, // Use doctor's configured slot duration
      workingHours: doctor.workingHours,
      breakTime: doctor.breakTime,
      weeklyOff: doctor.weeklyOff,
      holidays: [], // Can be extended to fetch from a holidays collection
    };

    const availableSlots = getAvailableSlots(slotConfig, bookedSlots);

    return NextResponse.json({
      success: true,
      data: {
        slots: availableSlots,
        doctor: {
          name: doctor.name,
          workingHours: doctor.workingHours,
        },
      },
    });
  } catch (error) {
    console.error('Error fetching slots:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch slots' },
      { status: 500 }
    );
  }
}




