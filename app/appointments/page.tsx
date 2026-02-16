import ViewAppointmentsMinimal from '../components/appointments/ViewAppointmentsMinimal';

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
          <p className="text-gray-500">
            Manage and view your scheduled appointments
          </p>
        </div>
        <ViewAppointmentsMinimal />
      </div>
    </div>
  );
}
