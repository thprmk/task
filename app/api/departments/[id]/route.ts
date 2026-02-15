import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Department from '../../../../models/Department';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const department = await Department.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!department) {
      return NextResponse.json(
        { success: false, error: 'Department not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: department });
  } catch (error: any) {
    console.error('Error updating department:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update department' },
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
    const department = await Department.findByIdAndDelete(params.id);

    if (!department) {
      return NextResponse.json(
        { success: false, error: 'Department not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: department });
  } catch (error: any) {
    console.error('Error deleting department:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete department' },
      { status: 400 }
    );
  }
}



