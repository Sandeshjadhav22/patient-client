import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface DoctorCardProps {
  id: string
  name: string
  specialty: string
  imageUrl: string
}

export function DoctorCard({ id, name, specialty, imageUrl }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={`Dr. ${name}`}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{specialty}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/consultation/${id}`} className="w-full">
          <Button className="w-full">Consult</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

