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

// Load .env.local so MONGODB_URI is available when you run: npm run seed ( .env.local wins over system env )
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
    if (key && value) process.env[key] = value;
  });
} catch {
  // .env.local not found
}

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
      serverSelectionTimeoutMS: 15000,
    });
    console.log('✅ Connected to MongoDB');

    // 1. CLEAR existing data (so we only have Dr. Raghull)
    console.log('\nClearing old data...');
    await Department.deleteMany({});
    await Doctor.deleteMany({});
    console.log('✅ Existing data cleared');

    // 2. Create the Department from the image
    console.log('\nCreating department...');
    const obgyn = await Department.create({
      name: 'Obstetrics & Gynaecology',
      description: "Women's reproductive health and childbirth",
      isActive: true,
    });
    console.log('✅ Created department: Obstetrics & Gynaecology');

    // 3. Create Dr. Raghull with exact details: "16:00 - 18:00 • Mon - Sat"
    console.log('\nCreating Dr. Raghull...');
    const doctors = await Doctor.insertMany([
      {
        name: 'Dr. Raghull',
        specialization: 'Senior Consultant – Obstetrics & Gynaecology',
        departmentId: obgyn._id,
        slotDuration: 30, // 30 min slots
        workingHours: {
          start: '16:00',
          end: '18:00',
        },
        // No break in this short window
        weeklyOff: [0], // 0 = Sunday (working Mon–Sat)
      },
    ]);
    console.log('✅ Created Dr. Raghull');

    console.log('\n' + '='.repeat(50));
    console.log('✅ Database seeded: Dr. Raghull added successfully!');
    console.log('='.repeat(50));
    console.log('\nSummary:');
    console.log('  📁 Department: Obstetrics & Gynaecology');
    console.log('  👨‍⚕️  Doctor: Dr. Raghull');
    console.log('    Specialization: Senior Consultant – Obstetrics & Gynaecology');
    console.log('    Working: 16:00 - 18:00 (Mon–Sat, Sunday off)');
    console.log('    Slot duration: 30 minutes');

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
