'use client';

import { use, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ConsultationPage({
  params,
}: {
  params: Promise<{ doctorId: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const doctorId = resolvedParams.doctorId;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    currentIllness: '',
    recentSurgery: '',
    diabetic: '',
    allergies: '',
    otherMedicalHistory: '',
    transactionId: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, diabetic: value }));
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.currentIllness.trim() !== '';
      case 2:
        return formData.diabetic !== '';
      case 3:
        return formData.transactionId.trim() !== '';
      default:
        return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const patientId = localStorage.getItem('userId');

    if (validateStep()) {
      const requestData = {
        patientId,
        doctorId: doctorId,
        currentIllnessHistory: formData.currentIllness,
        recentSurgery: formData.recentSurgery,
        familyHistory: {
          isDiabetic: formData.diabetic === 'diabetic',
          allergies: formData.allergies,
          others: formData.otherMedicalHistory,
        },
        transactionId: formData.transactionId,
        amount: 200,
      };

      try {
        const response = await fetch('http://localhost:8080/api/patient/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
           
        if (response.ok) {
          console.log('Consultation created successfully!');
          router.push('/consultation/confirmation'); 
        } else {
          console.error('Failed to create consultation');
        }
      } catch (error) {
        console.error('Error during consultation submission:', error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-52">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Consultation with Doctor</CardTitle>
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
                    src="/qrcode.jpg"
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
            <CardFooter className="flex justify-between mt-5">
              {currentStep > 1 && (
                <Button type="button" onClick={handlePrevious} variant="outline">
                  Previous
                </Button>
              )}
              {currentStep < 3 ? (
                <Button type="button" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
