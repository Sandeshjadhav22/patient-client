'use client'

import { useState, ChangeEvent, FormEvent } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PatientSignUp() {
  const [formData, setFormData] = useState({
    profilePicture: null as File | null,
    name: '',
    age: '',
    email: '',
    phoneNumber: '',
    surgeryHistory: '',
    illnessHistory: '',
  })

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData(prev => ({ ...prev, profilePicture: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
  
    console.log('Form submitted:', formData)
    //  API call here
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Patient Sign Up</CardTitle>
          <CardDescription>Create your patient account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profilePicture">Profile Picture</Label>
              <div className="flex items-center space-x-4">
                <div className="relative w-32 h-32">
                  <input
                    type="file"
                    id="profilePicture"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full h-full rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-500">Click to upload or drag and drop</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="surgeryHistory">History of Surgery</Label>
              <Textarea id="surgeryHistory" name="surgeryHistory" value={formData.surgeryHistory} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="illnessHistory">History of Illness</Label>
              <Textarea id="illnessHistory" name="illnessHistory" value={formData.illnessHistory} onChange={handleInputChange} />
            </div>
            {formData.illnessHistory && (
              <div className="mt-2 p-2 bg-gray-100 rounded">
                <Label>Illness History:</Label>
                <ul className="list-disc pl-5">
                  {formData.illnessHistory.split(',').map((illness, index) => (
                    <li key={index}>{illness.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

