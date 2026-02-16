import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Department from '@/models/Department';

export async function GET() {
  try {
    await connectDB();
    // Only departments available for booking: isActive true or field missing (legacy)
    const departments = await Department.find({
      $or: [{ isActive: true }, { isActive: { $exists: false } }],
    })
      .sort({ name: 1 })
      .lean();
    return NextResponse.json({ success: true, data: departments });
  } catch (error: unknown) {
    const err = error as Error & { code?: string };
    console.error('GET /api/departments failed:', err.message || err);
    if (err.code) console.error('Error code:', err.code);
    return NextResponse.json(
      { success: false, error: 'Unable to load departments. Please try again.' },
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






