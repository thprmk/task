import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Appointment from '../../../models/Appointment';
import { AppointmentStatus } from '../../../lib/types/appointment.types';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    
    const filters: any = {};
    
    // Filter by department
    if (searchParams.get('departmentId')) {
      filters.departmentId = searchParams.get('departmentId');
    }
    
    // Filter by doctor
    if (searchParams.get('doctorId')) {
      filters.doctorId = searchParams.get('doctorId');
    }
    
    // Filter by status (can be multiple)
    const statusParam = searchParams.get('status');
    if (statusParam) {
      if (statusParam.includes(',')) {
        filters.status = { $in: statusParam.split(',') };
      } else {
        filters.status = statusParam;
      }
    }
    
    // Filter by date range
    if (searchParams.get('dateFrom')) {
      filters.date = { ...filters.date, $gte: new Date(searchParams.get('dateFrom')!) };
    }
    if (searchParams.get('dateTo')) {
      filters.date = { ...filters.date, $lte: new Date(searchParams.get('dateTo')!) };
    }
    
    // Search by patient name, phone, or email
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      filters.$or = [
        { 'patient.name': { $regex: searchQuery, $options: 'i' } },
        { 'patient.phone': { $regex: searchQuery, $options: 'i' } },
        { 'patient.email': { $regex: searchQuery, $options: 'i' } },
      ];
    }

    // Build sort query
    const sortBy = searchParams.get('sortBy') || 'upcoming';
    let sortQuery: any = {};
    
    switch (sortBy) {
      case 'upcoming':
        sortQuery = { date: 1, timeSlot: 1 };
        break;
      case 'oldest':
        sortQuery = { date: -1, timeSlot: -1 };
        break;
      case 'doctor-asc':
      case 'doctor-desc':
      case 'department-asc':
      case 'department-desc':
        // For doctor/department sorting, we'll sort in memory after populating
        sortQuery = { date: 1, timeSlot: 1 };
        break;
      default:
        sortQuery = { date: 1, timeSlot: 1 };
    }

    let appointments = await Appointment.find(filters)
      .populate('doctorId', 'name specialization')
      .populate('departmentId', 'name')
      .sort(sortQuery)
      .limit(500);

    // Sort by doctor or department name if needed (after populating)
    if (sortBy === 'doctor-asc' || sortBy === 'doctor-desc' || 
        sortBy === 'department-asc' || sortBy === 'department-desc') {
      appointments = appointments.sort((a, b) => {
        let aValue = '';
        let bValue = '';
        
        if (sortBy.startsWith('doctor')) {
          aValue = typeof a.doctorId === 'object' && a.doctorId ? a.doctorId.name : '';
          bValue = typeof b.doctorId === 'object' && b.doctorId ? b.doctorId.name : '';
        } else if (sortBy.startsWith('department')) {
          aValue = typeof a.departmentId === 'object' && a.departmentId ? a.departmentId.name : '';
          bValue = typeof b.departmentId === 'object' && b.departmentId ? b.departmentId.name : '';
        }
        
        const comparison = aValue.localeCompare(bValue);
        return sortBy.includes('desc') ? -comparison : comparison;
      });
    }

    return NextResponse.json({ success: true, data: appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    // Check for double booking
    const existingAppointment = await Appointment.findOne({
      doctorId: body.doctorId,
      date: new Date(body.date),
      timeSlot: body.timeSlot,
      status: { $in: ['pending', 'confirmed'] },
    });

    if (existingAppointment) {
      return NextResponse.json(
        { success: false, error: 'This time slot is already booked' },
        { status: 409 }
      );
    }

    const appointment = await Appointment.create({
      ...body,
      status: AppointmentStatus.PENDING,
      date: new Date(body.date),
    });

    const populatedAppointment = await Appointment.findById(appointment._id)
      .populate('doctorId', 'name specialization')
      .populate('departmentId', 'name');

    return NextResponse.json(
      { success: true, data: populatedAppointment },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create appointment' },
      { status: 400 }
    );
  }
}



