# Hospital Appointment Booking System - Implementation Plan

## 📋 Project Structure

```
hospital-booking/
├── app/
│   ├── (routes)/
│   │   ├── booking/              # Booking flow pages
│   │   │   ├── page.tsx          # Main booking page
│   │   │   └── confirm/          # Confirmation page
│   │   ├── calendar/             # Calendar views
│   │   │   ├── page.tsx          # Common hospital calendar
│   │   │   └── [doctorId]/       # Individual doctor calendar
│   │   └── appointments/         # Appointments management
│   │       └── page.tsx          # List & filter appointments
│   ├── api/                      # API routes
│   │   ├── appointments/
│   │   ├── doctors/
│   │   ├── departments/
│   │   └── slots/
│   ├── components/               # Reusable components
│   │   ├── booking/              # Booking flow components
│   │   ├── calendar/             # Calendar components
│   │   ├── forms/                # Form components
│   │   └── ui/                   # Base UI components
│   ├── lib/                      # Utilities & helpers
│   │   ├── utils/                # Helper functions
│   │   ├── hooks/                # Custom React hooks
│   │   └── types/                # TypeScript types
│   └── models/                   # Database models (Mongoose)
│       ├── Appointment.ts
│       ├── Doctor.ts
│       ├── Department.ts
│       └── Slot.ts
```

---

## 🎯 Core Features Breakdown

### 1. **Booking Flow (7 Steps)**

**Components:**
- `BookingWizard.tsx` - Main container with step navigation
- `Step1Department.tsx` - Department selection
- `Step2Doctor.tsx` - Doctor selection (filtered by department)
- `Step3Date.tsx` - Date picker (blocks past dates)
- `Step4TimeSlot.tsx` - Available time slots display
- `Step5PatientDetails.tsx` - Patient form
- `Step6Confirm.tsx` - Review & confirm
- `Step7Success.tsx` - Confirmation screen

**State Management:**
- Use React Context or Zustand for booking state
- Store: selectedDepartment, selectedDoctor, selectedDate, selectedSlot, patientDetails

---

### 2. **Slot & Calendar Logic**

**Core Logic File:** `lib/utils/slotManager.ts`

**Features:**
- `generateSlots()` - Creates time slots based on duration
- `getAvailableSlots()` - Filters by working hours, breaks, holidays
- `isSlotAvailable()` - Checks if slot can be booked
- `blockPastDates()` - Prevents past date selection
- `checkDoubleBooking()` - Validates slot availability

**Configuration:**
```typescript
interface SlotConfig {
  slotDuration: number;        // minutes (default: 30)
  workingHours: { start: string, end: string };
  breakTime?: { start: string, end: string };
  weeklyOff: number[];         // [0,6] for Sunday, Saturday
  holidays: Date[];
}
```

---

### 3. **Calendar Views**

**Common Hospital Calendar:**
- `HospitalCalendar.tsx` - Shows all doctors' schedules
- Color-coded slots: Available (green), Booked (red), Completed (gray), Cancelled (orange)
- Grid layout: Days × Doctors

**Individual Doctor Calendar:**
- `DoctorCalendar.tsx` - Single doctor's schedule view
- Detailed appointment list
- Status management buttons

**Shared Components:**
- `CalendarGrid.tsx` - Base calendar grid
- `SlotCell.tsx` - Individual slot display
- `StatusBadge.tsx` - Status indicator

---

### 4. **Appointment Status Lifecycle**

**Status Enum:**
```typescript
enum AppointmentStatus {
  AVAILABLE = 'available',
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  NO_SHOW = 'no_show'
}
```

**Status Flow:**
- Available → Pending (on booking)
- Pending → Confirmed (auto or manual)
- Confirmed → Completed (after visit)
- Any → Cancelled (user/admin action)

**Real-time Updates:**
- Use React state + API calls
- Optimistic UI updates
- Refresh calendar after status change

---

### 5. **Sorting & Filtering**

**Filter Component:** `AppointmentFilters.tsx`

**Filters:**
- Department dropdown
- Doctor dropdown (filtered by department)
- Date range picker
- Status checkboxes

**Sort Component:** `AppointmentSorter.tsx`

**Sort Options:**
- Upcoming first (default)
- Oldest first
- Doctor name (A-Z)
- Department name (A-Z)

**Search Component:** `AppointmentSearch.tsx`
- Search by patient name, phone, email
- Real-time filtering (debounced)

**Implementation:**
- Client-side filtering (for small datasets)
- Or API-based filtering (for large datasets)

---

### 6. **Patient Details Form**

**Component:** `PatientDetailsForm.tsx`

**Fields:**
- Full Name (required, min 2 chars)
- Age (required, 1-120)
- Gender (required, dropdown: Male/Female/Other)
- Phone Number (required, format validation)
- Email (required, email validation)
- Reason for Visit (required, textarea)

**Validation:**
- Use React Hook Form or native validation
- Show inline error messages
- Disable submit until valid

---

## 🗂️ Data Models

### **Department Model**
```typescript
{
  _id: string;
  name: string;
  description?: string;
}
```

### **Doctor Model**
```typescript
{
  _id: string;
  name: string;
  departmentId: string;
  specialization: string;
  workingHours: { start: string, end: string };
  breakTime?: { start: string, end: string };
  weeklyOff: number[];
}
```

### **Appointment Model**
```typescript
{
  _id: string;
  doctorId: string;
  departmentId: string;
  date: Date;
  timeSlot: string;              // "09:00-09:30"
  status: AppointmentStatus;
  patient: {
    name: string;
    age: number;
    gender: string;
    phone: string;
    email: string;
    reason: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 🎨 UI/UX Approach

### **Design System:**
- Tailwind CSS for styling
- Consistent spacing (4px grid)
- Color palette for status indicators
- Responsive breakpoints: mobile (sm), tablet (md), desktop (lg+)

### **Component Library:**
- Button variants (primary, secondary, danger)
- Input components (text, select, textarea)
- Card components
- Modal/Dialog for confirmations
- Toast notifications for feedback

---

## 🔄 State Management Strategy

### **Option 1: React Context (Simple)**
- `BookingContext` - Booking flow state
- `AppointmentContext` - Appointments list state

### **Option 2: Zustand (Recommended)**
- `useBookingStore` - Booking wizard state
- `useAppointmentStore` - Appointments & filters
- `useCalendarStore` - Calendar view state

**Why Zustand?**
- Lightweight
- Easy to use
- Good TypeScript support
- No boilerplate

---

## 📦 Required Dependencies

**Already Installed:**
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Mongoose

**To Add:**
```json
{
  "date-fns": "^3.0.0",           // Date utilities
  "zustand": "^4.5.0",            // State management
  "react-hook-form": "^7.50.0",   // Form handling
  "zod": "^3.23.0"                // Validation
}
```

---

## 🚀 Implementation Phases

### **Phase 1: Foundation**
1. Set up project structure
2. Create data models (Mongoose schemas)
3. Build base UI components (Button, Input, Card)
4. Set up state management

### **Phase 2: Booking Flow**
1. Create booking wizard component
2. Implement step-by-step flow
3. Add form validation
4. Connect to API endpoints

### **Phase 3: Calendar Logic**
1. Build slot generation logic
2. Implement calendar views
3. Add status management
4. Real-time updates

### **Phase 4: Filtering & Search**
1. Build filter components
2. Implement sorting logic
3. Add search functionality
4. Connect to appointment list

### **Phase 5: Polish & Responsive**
1. Mobile optimization
2. Accessibility improvements
3. Error handling
4. Loading states

---

## 🔌 API Endpoints

```
GET    /api/departments           # List all departments
GET    /api/doctors?deptId=xxx    # List doctors (filtered)
GET    /api/slots?doctorId=xxx&date=xxx  # Available slots
POST   /api/appointments          # Create appointment
GET    /api/appointments?filters  # List appointments (with filters)
PATCH  /api/appointments/:id      # Update status
DELETE /api/appointments/:id      # Cancel appointment
```

---

## ✅ Key Implementation Notes

1. **No Over-Engineering:** Keep it simple, use built-in React features where possible
2. **Component Reusability:** Build small, focused components
3. **Type Safety:** Use TypeScript strictly
4. **Error Handling:** Show user-friendly error messages
5. **Loading States:** Add spinners/skeletons for async operations
6. **Validation:** Client-side + server-side validation
7. **Responsive First:** Mobile-first approach

---

## 📝 Next Steps

1. Review and approve this plan
2. Set up additional dependencies
3. Create folder structure
4. Start with Phase 1 (Foundation)

