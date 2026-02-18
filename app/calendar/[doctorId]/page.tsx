import DoctorCalendar from '../../components/calendar/DoctorCalendar';

interface PageProps {
  params: Promise<{
    doctorId: string;
  }>;
}

export default async function DoctorCalendarPage({ params }: PageProps) {
  const { doctorId } = await params;
  return <DoctorCalendar doctorId={doctorId} />;
}
