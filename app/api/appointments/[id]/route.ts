import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Appointment from '../../../../models/Appointment';
import { AppointmentStatus } from '../../../../lib/types/appointment.types';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const appointment = await Appointment.findById(params.id)
      .populate('doctorId', 'name specialization')
      .populate('departmentId', 'name');

    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: appointment });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch appointment' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const { status } = body;

    // Validate status
    if (status && !Object.values(AppointmentStatus).includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    const appointment = await Appointment.findByIdAndUpdate(
      params.id,
      { status, ...body },
      { new: true, runValidators: true }
    )
      .populate('doctorId', 'name specialization')
      .populate('departmentId', 'name');

    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: appointment });
  } catch (error: any) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update appointment' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const appointment = await Appointment.findByIdAndDelete(params.id);

    if (!appointment) {
      return NextResponse.json(
        { success: false, error: 'Appointment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete appointment' },
      { status: 500 }
    );
  }
}






