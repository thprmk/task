import ViewAppointmentsMinimal from '../components/appointments/ViewAppointmentsMinimal';

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen bg-slate-50/80 py-4 px-3 sm:py-10 sm:px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 min-w-0 w-full">
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight sm:text-2xl md:text-3xl">Appointments</h1>
          <p className="mt-0.5 text-xs text-slate-500 sm:mt-1 sm:text-sm">View and manage appointments with filters and search</p>
        </div>
        <ViewAppointmentsMinimal />
      </div>
    </div>
  );
}
