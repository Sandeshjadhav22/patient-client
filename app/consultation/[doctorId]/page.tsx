'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Api call from database
const doctors = {
  '1': { name: 'Dr. John Doe', specialty: 'Cardiologist' },
  '2': { name: 'Dr. Jane Smith', specialty: 'Dermatologist' },
  '3': { name: 'Dr. Mike Johnson', specialty: 'Pediatrician' },
  '4': { name: 'Dr. Sarah Brown', specialty: 'Neurologist' },
  '5': { name: 'Dr. Chris Lee', specialty: 'Orthopedic Surgeon' },
  '6': { name: 'Dr. Emily Chen', specialty: 'Psychiatrist' },
}

export default function ConsultationPage({ params }: { params: Promise<{ doctorId: string }> }) {
  const router = useRouter()
  const resolvedParams = use(params)
  const doctor = doctors[resolvedParams.doctorId as keyof typeof doctors]

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    currentIllness: '',
    recentSurgery: '',
    diabetic: '',
    allergies: '',
    otherMedicalHistory: '',
    transactionId: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, diabetic: value }))
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1)
  }

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.currentIllness.trim() !== ''
      case 2:
        return formData.diabetic !== ''
      case 3:
        return formData.transactionId.trim() !== ''
      default:
        return true
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep()) {
      // In a real application, this would be an API call to save the data
      console.log('Saving consultation data to database:', formData)
      router.push('/consultation/confirmation')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-52">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Consultation with {doctor.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currentIllness">Current Illness History</Label>
                  <Textarea
                    id="currentIllness"
                    name="currentIllness"
                    value={formData.currentIllness}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="recentSurgery">Recent Surgery (include timespan)</Label>
                  <Input
                    type="text"
                    id="recentSurgery"
                    name="recentSurgery"
                    value={formData.recentSurgery}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>Family Medical History - Diabetes</Label>
                  <RadioGroup
                    name="diabetic"
                    value={formData.diabetic}
                    onValueChange={handleRadioChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="diabetic" id="diabetic" />
                      <Label htmlFor="diabetic">Diabetic</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-diabetic" id="non-diabetic" />
                      <Label htmlFor="non-diabetic">Non-Diabetic</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label htmlFor="allergies">Any Allergies</Label>
                  <Input
                    type="text"
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="otherMedicalHistory">Other Medical History</Label>
                  <Textarea
                    id="otherMedicalHistory"
                    name="otherMedicalHistory"
                    value={formData.otherMedicalHistory}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Payment QR Code"
                    width={200}
                    height={200}
                  />
                </div>
                <p className="text-center">Scan the QR code to make the payment</p>
                <div>
                  <Label htmlFor="transactionId">Transaction ID</Label>
                  <Input
                    type="text"
                    id="transactionId"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentStep > 1 && (
            <Button onClick={handlePrevious} variant="outline">Previous</Button>
          )}
          {currentStep < 3 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

