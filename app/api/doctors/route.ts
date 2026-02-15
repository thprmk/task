import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Doctor from '../../../models/Doctor';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const departmentId = searchParams.get('departmentId');

    const query = departmentId ? { departmentId } : {};
    const doctors = await Doctor.find(query)
      .populate('departmentId', 'name')
      .sort({ name: 1 });

    return NextResponse.json({ success: true, data: doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch doctors' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const doctor = await Doctor.create(body);
    return NextResponse.json({ success: true, data: doctor }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating doctor:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create doctor' },
      { status: 400 }
    );
  }
}






