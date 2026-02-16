import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Doctor from '../../../../models/Doctor';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const doctor = await Doctor.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    ).populate('departmentId', 'name');

    if (!doctor) {
      return NextResponse.json(
        { success: false, error: 'Doctor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: doctor });
  } catch (error: any) {
    console.error('Error updating doctor:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update doctor' },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const doctor = await Doctor.findByIdAndDelete(id);

    if (!doctor) {
      return NextResponse.json(
        { success: false, error: 'Doctor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: doctor });
  } catch (error: any) {
    console.error('Error deleting doctor:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete doctor' },
      { status: 400 }
    );
  }
}



