# Component Structure - Quick Reference

## 📦 Component Hierarchy

```
app/
├── page.tsx (Home/Dashboard)
│
├── components/
│   ├── booking/
│   │   ├── BookingWizard.tsx          # Main wizard container
│   │   ├── Step1Department.tsx
│   │   ├── Step2Doctor.tsx
│   │   ├── Step3Date.tsx
│   │   ├── Step4TimeSlot.tsx
│   │   ├── Step5PatientDetails.tsx
│   │   ├── Step6Confirm.tsx
│   │   └── Step7Success.tsx
│   │
│   ├── calendar/
│   │   ├── HospitalCalendar.tsx       # All doctors view
│   │   ├── DoctorCalendar.tsx         # Single doctor view
│   │   ├── CalendarGrid.tsx           # Base grid component
│   │   ├── SlotCell.tsx               # Individual slot
│   │   └── StatusBadge.tsx            # Status indicator
│   │
│   ├── appointments/
│   │   ├── AppointmentList.tsx        # Main list container
│   │   ├── AppointmentCard.tsx        # Individual appointment
│   │   ├── AppointmentFilters.tsx     # Filter controls
│   │   ├── AppointmentSorter.tsx      # Sort controls
│   │   └── AppointmentSearch.tsx      # Search input
│   │
│   ├── forms/
│   │   ├── PatientDetailsForm.tsx     # Patient form
│   │   └── FormField.tsx              # Reusable form field
│   │
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Card.tsx
│       ├── Modal.tsx
│       └── Toast.tsx
│
├── lib/
│   ├── utils/
│   │   ├── slotManager.ts             # Slot generation & validation
│   │   ├── dateUtils.ts               # Date helpers
│   │   └── validation.ts               # Form validation
│   │
│   ├── hooks/
│   │   ├── useBooking.ts              # Booking flow hook
│   │   ├── useAppointments.ts          # Appointments data hook
│   │   └── useSlots.ts                # Slots data hook
│   │
│   └── types/
│       ├── appointment.types.ts
│       ├── doctor.types.ts
│       └── booking.types.ts
│
└── models/
    ├── Appointment.ts                  # Mongoose schema
    ├── Doctor.ts
    └── Department.ts
```

## 🔄 Data Flow

```
User Action
    ↓
Component (UI)
    ↓
Hook (Business Logic)
    ↓
API Route (/api/*)
    ↓
Database (MongoDB via Mongoose)
    ↓
Response → Update State → Re-render UI
```

## 🎯 Feature-to-Component Mapping

| Feature | Main Component | Supporting Components |
|---------|---------------|----------------------|
| Booking Flow | `BookingWizard` | Step1-7 components |
| Calendar View | `HospitalCalendar` / `DoctorCalendar` | `CalendarGrid`, `SlotCell` |
| Slot Logic | `slotManager.ts` | Used by `Step4TimeSlot`, `CalendarGrid` |
| Filtering | `AppointmentFilters` | `AppointmentList` |
| Sorting | `AppointmentSorter` | `AppointmentList` |
| Search | `AppointmentSearch` | `AppointmentList` |
| Patient Form | `PatientDetailsForm` | `FormField`, validation utils |

