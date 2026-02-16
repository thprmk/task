import ViewAppointmentsMinimal from '../components/appointments/ViewAppointmentsMinimal';

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">View Appointments</h1>
        <p className="text-gray-600 text-sm mb-6">
          Select date and time to see appointments.
        </p>
        <ViewAppointmentsMinimal />
      </div>
    </div>
  );
}
