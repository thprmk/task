import Link from 'next/link';
import { Button } from '../components/ui';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage appointments and view calendar schedules</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Calendar Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Hospital Calendar</h2>
            <p className="text-gray-600 mb-4">
              View all doctors' schedules and appointment slots across the hospital.
            </p>
            <Link href="/calendar">
              <Button variant="primary" className="w-full">
                View Calendar
              </Button>
            </Link>
          </div>

          {/* Appointments Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Appointments</h2>
            <p className="text-gray-600 mb-4">
              View and manage all patient appointments. Filter, sort, and update appointment statuses.
            </p>
            <Link href="/appointments">
              <Button variant="primary" className="w-full">
                Manage Appointments
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">System Information</h3>
          <p className="text-blue-800 mb-2">
            This system allows you to:
          </p>
          <ul className="list-disc list-inside space-y-1 text-blue-800">
            <li>View all appointments in the hospital calendar</li>
            <li>Filter appointments by department, doctor, date, and status</li>
            <li>Update appointment statuses (Pending → Confirmed → Completed/Cancelled)</li>
            <li>Search appointments by patient details</li>
            <li>Sort appointments by various criteria</li>
          </ul>
          <p className="text-blue-800 mt-4 text-sm">
            <strong>Note:</strong> Departments and doctors are configured via database seeding. 
            Run the seeder script to populate initial data.
          </p>
        </div>
      </div>
    </div>
  );
}
