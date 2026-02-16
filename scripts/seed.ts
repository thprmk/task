/**
 * Database Seeder Script
 * 
 * This script populates the database with initial departments and doctors.
 * Run this script once to set up the system before patients can book appointments.
 * 
 * Usage:
 *   npx tsx scripts/seed.ts
 *   or add to package.json: "seed": "tsx scripts/seed.ts"
 */

import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { join } from 'path';
import Department from '../models/Department';
import Doctor from '../models/Doctor';

// Load .env.local file if it exists (so "npm run seed" picks up MONGODB_URI)
try {
  const envPath = join(process.cwd(), '.env.local');
  const envFile = readFileSync(envPath, 'utf-8');
  envFile.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) return;
    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim().replace(/^["']|["']$/g, '');
    if (key && value && !process.env[key]) {
      process.env[key] = value;
    }
  });
} catch {
  // .env.local doesn't exist, that's okay
}

// MongoDB connection string - update this with your connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hospital-booking';

async function seedDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI not set. Using default or add it to .env.local in the project root (same folder as package.json).');
    }
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    console.log(`Using connection string: ${MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('\nClearing existing data...');
    await Department.deleteMany({});
    await Doctor.deleteMany({});
    console.log('✅ Existing data cleared');

    // Create Departments
    console.log('\nCreating departments...');
    const departments = await Department.insertMany([
      {
        name: 'Cardiology',
        description: 'Heart and cardiovascular system specialists',
      },
      {
        name: 'Pediatrics',
        description: 'Medical care for infants, children, and adolescents',
      },
      {
        name: 'Neurology',
        description: 'Brain, spinal cord, and nervous system specialists',
      },
      {
        name: 'Orthopedics',
        description: 'Bones, joints, muscles, and ligaments specialists',
      },
      {
        name: 'Dermatology',
        description: 'Skin, hair, and nail conditions specialists',
      },
    ]);
    console.log(`✅ Created ${departments.length} departments`);

    // Create Doctors with Time Rules
    console.log('\nCreating doctors with time rules...');
    const doctors = await Doctor.insertMany([
      // Cardiology Department
      {
        name: 'Dr. John Smith',
        departmentId: departments[0]._id, // Cardiology
        specialization: 'Cardiologist',
        slotDuration: 30, // 30 minutes per slot
        workingHours: {
          start: '09:00',
          end: '17:00',
        },
        breakTime: {
          start: '13:00',
          end: '14:00',
        },
        weeklyOff: [0], // Sunday off
      },
      {
        name: 'Dr. Sarah Johnson',
        departmentId: departments[0]._id, // Cardiology
        specialization: 'Cardiac Surgeon',
        slotDuration: 60, // 60 minutes per slot
        workingHours: {
          start: '08:00',
          end: '16:00',
        },
        breakTime: {
          start: '12:00',
          end: '13:00',
        },
        weeklyOff: [0, 6], // Sunday and Saturday off
      },
      // Pediatrics Department
      {
        name: 'Dr. Emily Davis',
        departmentId: departments[1]._id, // Pediatrics
        specialization: 'Pediatrician',
        slotDuration: 30,
        workingHours: {
          start: '10:00',
          end: '18:00',
        },
        breakTime: {
          start: '14:00',
          end: '15:00',
        },
        weeklyOff: [6], // Saturday off
      },
      {
        name: 'Dr. Michael Brown',
        departmentId: departments[1]._id, // Pediatrics
        specialization: 'Pediatric Cardiologist',
        slotDuration: 45,
        workingHours: {
          start: '09:00',
          end: '17:00',
        },
        breakTime: {
          start: '13:00',
          end: '14:00',
        },
        weeklyOff: [], // No weekly off
      },
      // Neurology Department
      {
        name: 'Dr. Robert Wilson',
        departmentId: departments[2]._id, // Neurology
        specialization: 'Neurologist',
        slotDuration: 30,
        workingHours: {
          start: '08:00',
          end: '16:00',
        },
        breakTime: {
          start: '12:00',
          end: '13:00',
        },
        weeklyOff: [0], // Sunday off
      },
      {
        name: 'Dr. Lisa Anderson',
        departmentId: departments[2]._id, // Neurology
        specialization: 'Neurosurgeon',
        slotDuration: 60,
        workingHours: {
          start: '09:00',
          end: '17:00',
        },
        breakTime: {
          start: '13:00',
          end: '14:00',
        },
        weeklyOff: [0, 6], // Sunday and Saturday off
      },
      // Orthopedics Department
      {
        name: 'Dr. James Martinez',
        departmentId: departments[3]._id, // Orthopedics
        specialization: 'Orthopedic Surgeon',
        slotDuration: 45,
        workingHours: {
          start: '09:00',
          end: '17:00',
        },
        breakTime: {
          start: '13:00',
          end: '14:00',
        },
        weeklyOff: [6], // Saturday off
      },
      // Dermatology Department
      {
        name: 'Dr. Jennifer Taylor',
        departmentId: departments[4]._id, // Dermatology
        specialization: 'Dermatologist',
        slotDuration: 30,
        workingHours: {
          start: '10:00',
          end: '18:00',
        },
        breakTime: {
          start: '14:00',
          end: '15:00',
        },
        weeklyOff: [0], // Sunday off
      },
    ]);
    console.log(`✅ Created ${doctors.length} doctors`);

    console.log('\n' + '='.repeat(50));
    console.log('✅ Database seeding completed successfully!');
    console.log('='.repeat(50));
    console.log('\nSummary:');
    console.log(`  📁 Departments: ${departments.length}`);
    console.log(`  👨‍⚕️  Doctors: ${doctors.length}`);
    console.log('\n📋 Departments created:');
    departments.forEach((dept) => {
      console.log(`  - ${dept.name}`);
    });
    console.log('\n👨‍⚕️  Doctors created:');
    doctors.forEach((doctor) => {
      const dept = departments.find((d) => d._id.toString() === doctor.departmentId.toString());
      console.log(`  - ${doctor.name} (${dept?.name}) - ${doctor.specialization}`);
      console.log(`    Working: ${doctor.workingHours.start} - ${doctor.workingHours.end}`);
      console.log(`    Slot Duration: ${doctor.slotDuration} minutes`);
      if (doctor.breakTime) {
        console.log(`    Break: ${doctor.breakTime.start} - ${doctor.breakTime.end}`);
      }
      const offDays = doctor.weeklyOff.map((day) => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[day];
      });
      if (offDays.length > 0) {
        console.log(`    Weekly Off: ${offDays.join(', ')}`);
      }
    });

    console.log('\n🚀 You can now use the booking system!');
    console.log('   Patients can book appointments through: /booking');
    console.log('   Admins can view calendar at: /calendar');
    console.log('   Admins can manage appointments at: /appointments');

    // Close connection
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ Error seeding database');
    console.error('   Message:', error?.message || error);
    
    if (error.name === 'MongooseServerSelectionError' || error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      console.error('\n🔴 MongoDB Connection Error');
      console.error('\n📝 If using MongoDB Atlas:');
      console.error('   1. Go to https://cloud.mongodb.com → your project → Network Access');
      console.error('   2. Click "Add IP Address" and add your current IP (or 0.0.0.0/0 to allow all)');
      console.error('   3. If the cluster is paused, click "Resume"');
      console.error('   4. Check Database Access: user must have read/write on the database');
      console.error('\n📝 If using local MongoDB: start it with: mongod');
    }
    
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
}

// Run the seeder
seedDatabase();
