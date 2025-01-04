import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-8 mt-52">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Consultation Request Submitted</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Thank you for submitting your consultation request. The doctor will review your information and respond shortly.</p>
        </CardContent>
        <CardFooter>
          <Link href="/doctors">
            <Button>Back to Doctors</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

