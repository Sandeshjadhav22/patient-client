import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/shared/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Welcome to MediConnect</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your trusted online prescription platform
          </p>
          <Link href="/doctors">
            <Button size="lg">Get Started</Button>
          </Link>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Easy Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Connect with top doctors from the comfort of your home. Get
                expert medical advice and prescriptions online.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Secure Prescriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Receive and manage your prescriptions securely. Access your
                medical history and prescriptions anytime, anywhere.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>24/7 Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our dedicated support team is always ready to assist you. Get
                help with appointments, prescriptions, or any queries.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">Create your account in minutes</p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Book Consultation</h3>
              <p className="text-gray-600">
                Choose a doctor and schedule your appointment
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Get Prescription</h3>
              <p className="text-gray-600">
                Receive your prescription securely online
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Manage Health</h3>
              <p className="text-gray-600">
                Access your medical records and prescriptions anytime
              </p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of patients who trust MediConnect for their
            healthcare needs.
          </p>
          <Link href="/patient/signup">
            <Button size="lg">Create Your Account</Button>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2023 MediConnect. All rights reserved.</p>
          <div className="mt-4">
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <span className="mx-2">|</span>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
