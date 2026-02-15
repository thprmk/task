import Link from "next/link";
import { Button } from "./components/ui";
import TabbedSection from "./components/TabbedSection";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="flex items-center justify-center py-20 px-4">
        <main className="flex flex-col items-center justify-center gap-8 text-center max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Hospital Appointment Booking System
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book your appointment with ease. Select your department, choose a doctor, 
              pick a convenient date and time, and confirm your booking.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/booking">
              <Button variant="primary" size="lg">
                Book an Appointment
              </Button>
            </Link>
            <Link href="/calendar">
              <Button variant="outline" size="lg">
                View Calendar
              </Button>
            </Link>
            <Link href="/appointments">
              <Button variant="outline" size="lg">
                View Appointments
              </Button>
            </Link>
          </div>
        </main>
      </section>

      {/* Tabbed Section */}
      <section className="bg-white">
        <TabbedSection />
      </section>

      {/* FAQ Section */}
      <section className="bg-white">
        <FAQ />
      </section>
    </div>
  );
}
