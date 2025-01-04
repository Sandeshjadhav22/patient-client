"use client";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { useEffect, useState } from "react";

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  profilePicture: string;
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/patient/getAllDoctors"
        );
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-14">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            id={doctor._id}
            name={doctor.name}
            specialty={doctor.specialty}
            imageUrl={doctor.profilePicture}
          />
        ))}
      </div>
    </div>
  );
}
