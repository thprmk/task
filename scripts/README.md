# Database Seeder Script

This script populates the database with initial departments and doctors for the Hospital Appointment Booking System.

## Prerequisites

1. MongoDB must be running and accessible
2. Set the `MONGODB_URI` environment variable (or it will default to `mongodb://localhost:27017/hospital-booking`)

## Usage

### Option 1: Using npm script (Recommended)

```bash
npm run seed
```

### Option 2: Using tsx directly

```bash
npx tsx scripts/seed.ts
```

### Option 3: Using ts-node (if installed)

```bash
npx ts-node scripts/seed.ts
```

## What It Does

1. **Connects to MongoDB** using the connection string from environment variable or default
2. **Clears existing data** (departments and doctors) - this ensures a clean seed
3. **Creates 5 Departments**:
   - Cardiology
   - Pediatrics
   - Neurology
   - Orthopedics
   - Dermatology

4. **Creates 8 Doctors** with configured time rules:
   - **Dr. John Smith** (Cardiology) - 9am-5pm, Break 1-2pm, Off Sunday, 30min slots
   - **Dr. Sarah Johnson** (Cardiology) - 8am-4pm, Break 12-1pm, Off Sat/Sun, 60min slots
   - **Dr. Emily Davis** (Pediatrics) - 10am-6pm, Break 2-3pm, Off Saturday, 30min slots
   - **Dr. Michael Brown** (Pediatrics) - 9am-5pm, Break 1-2pm, No weekly off, 45min slots
   - **Dr. Robert Wilson** (Neurology) - 8am-4pm, Break 12-1pm, Off Sunday, 30min slots
   - **Dr. Lisa Anderson** (Neurology) - 9am-5pm, Break 1-2pm, Off Sat/Sun, 60min slots
   - **Dr. James Martinez** (Orthopedics) - 9am-5pm, Break 1-2pm, Off Saturday, 45min slots
   - **Dr. Jennifer Taylor** (Dermatology) - 10am-6pm, Break 2-3pm, Off Sunday, 30min slots

## Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/hospital-booking
```

Or for MongoDB Atlas:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital-booking
```

## Important Notes

- **This script will DELETE all existing departments and doctors** before seeding
- Run this script **once** to set up the initial data
- After seeding, patients can use the booking system at `/booking`
- Admins can view the calendar at `/calendar` and manage appointments at `/appointments`

## Customization

You can modify `scripts/seed.ts` to:
- Add more departments
- Add more doctors
- Change working hours, break times, or weekly off days
- Adjust slot durations

## Troubleshooting

### Connection Error
- Ensure MongoDB is running
- Check that `MONGODB_URI` is correct
- Verify network connectivity to MongoDB

### Module Not Found
- Run `npm install` to ensure all dependencies are installed
- Ensure `tsx` is installed: `npm install -D tsx`

### Type Errors
- Ensure TypeScript is properly configured
- Check that model files are in the correct location

