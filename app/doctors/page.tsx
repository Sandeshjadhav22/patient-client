import { DoctorCard } from "@/components/shared/DoctorCard"



// api call from database


const doctors = [
  { id: '1', name: 'Dr. John Doe', specialty: 'Cardiologist', imageUrl: '/placeholder.svg?height=200&width=200' },
  { id: '2', name: 'Dr. Jane Smith', specialty: 'Dermatologist', imageUrl: '/placeholder.svg?height=200&width=200' },
  { id: '3', name: 'Dr. Mike Johnson', specialty: 'Pediatrician', imageUrl: '/placeholder.svg?height=200&width=200' },
  { id: '4', name: 'Dr. Sarah Brown', specialty: 'Neurologist', imageUrl: '/placeholder.svg?height=200&width=200' },
  { id: '5', name: 'Dr. Chris Lee', specialty: 'Orthopedic Surgeon', imageUrl: '/placeholder.svg?height=200&width=200' },
  { id: '6', name: 'Dr. Emily Chen', specialty: 'Psychiatrist', imageUrl: '/placeholder.svg?height=200&width=200' },
]

export default function DoctorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.id} {...doctor} />
        ))}
      </div>
    </div>
  )
}

