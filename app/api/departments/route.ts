import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Department from '../../../models/Department';

export async function GET() {
  try {
    await connectDB();
    const departments = await Department.find({}).sort({ name: 1 });
    return NextResponse.json({ success: true, data: departments });
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch departments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const department = await Department.create(body);
    return NextResponse.json({ success: true, data: department }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating department:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create department' },
      { status: 400 }
    );
  }
}






