import AppointmentList from '../components/appointments/AppointmentList';

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-2">
            View and manage all appointments with advanced filtering and search
          </p>
        </div>
        <AppointmentList />
      </div>
    </div>
  );
}




