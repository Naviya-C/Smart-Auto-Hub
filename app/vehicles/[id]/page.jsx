"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Star, ChevronLeft, MessageSquare } from 'lucide-react'
import ChatBot from "@/components/ChatBot"

const vehiclesData = {
  1: {
    id: 1,
    name: "2022 Toyota Prius",
    price: 17500000,
    status: "Available",
    location: "Nugegoda Branch",
    make: "Toyota",
    model: "Prius",
    year: 2022,
    condition: "Registered",
    mileage: 25000,
    transmission: "Automatic",
    fuelType: "Hybrid",
    image: "/toyota-prius-2022-front.jpg",
    description:
      "Premium hybrid vehicle with excellent fuel efficiency. Recently serviced, no accidents, single owner. Features include cruise control, alloy wheels, and modern infotainment system.",
    reviews: [
      { author: "John D.", rating: 5, text: "Excellent vehicle! Very reliable." },
      { author: "Sarah M.", rating: 4, text: "Great fuel efficiency, highly recommended." },
    ],
  },
  2: {
    id: 2,
    name: "2021 Honda Civic",
    price: 15200000,
    status: "Available",
    location: "Nugegoda Branch",
    make: "Honda",
    model: "Civic",
    year: 2021,
    condition: "Registered",
    mileage: 35000,
    transmission: "Manual",
    fuelType: "Petrol",
    image: "/honda-civic-2021-red.jpg",
    description:
      "Sporty sedan with performance and style. Well-maintained with full service history. Features alloy wheels, ABS, power steering, and modern safety features.",
    reviews: [
      { author: "Mike P.", rating: 5, text: "Amazing performance!" },
      { author: "Lisa R.", rating: 5, text: "Perfect daily driver." },
    ],
  },
}

export default function VehicleDetailsPage({ params }) {
  const vehicle = vehiclesData[params.id] || vehiclesData["1"]
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [loanAmount, setLoanAmount] = useState(vehicle.price)
  const [downPayment, setDownPayment] = useState(0)
  const [loanTerm, setLoanTerm] = useState(5)

  const calculatePayment = () => {
    const principal = loanAmount - downPayment
    const monthlyRate = 0.06 / 12
    const numberOfPayments = loanTerm * 12
    const monthlyPaymentCalc =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    setMonthlyPayment(monthlyPaymentCalc)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/vehicles">
            <ChevronLeft size={18} className="mr-2" />
            Back to Search
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Images */}
          <div className="lg:col-span-1">
            <div className="bg-muted rounded-lg overflow-hidden mb-4 h-80">
              <img
                src={vehicle.image || "/placeholder.svg"}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-muted rounded h-20">
                  <img
                    src={`/vehicle-angle-.jpg?height=100&width=100&query=vehicle angle ${i}`}
                    alt="thumbnail"
                    className="w-full h-full object-cover rounded cursor-pointer hover:opacity-75 transition"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-3">{vehicle.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary">LKR {vehicle.price.toLocaleString()}</span>
                <span
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    vehicle.status === "Available"
                      ? "bg-green-500/20 text-green-700"
                      : "bg-yellow-500/20 text-yellow-700"
                  }`}
                >
                  {vehicle.status}
                </span>
              </div>
              <p className="text-lg text-muted-foreground">{vehicle.location}</p>
            </div>

            {/* Key Details Table */}
            <div className="bg-card rounded-lg border border-border p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Vehicle Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Make</p>
                  <p className="font-semibold">{vehicle.make}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Model</p>
                  <p className="font-semibold">{vehicle.model}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="font-semibold">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Condition</p>
                  <p className="font-semibold">{vehicle.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-semibold">{vehicle.mileage.toLocaleString()} km</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-semibold">{vehicle.transmission}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fuel Type</p>
                  <p className="font-semibold">{vehicle.fuelType}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button className="flex-1 h-12" size="lg">
                Book Appointment
              </Button>
              <Button variant="outline" className="flex-1 h-12 bg-transparent" size="lg">
                Book Technical Consultation
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card rounded-lg border border-border p-6 mb-12">
          <h3 className="font-bold text-xl mb-4">Description</h3>
          <p className="text-foreground leading-relaxed">{vehicle.description}</p>
        </div>

        {/* Leasing Calculator */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-border p-8 mb-12">
          <h3 className="font-bold text-2xl mb-6">Estimate Your Monthly Payment</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Loan Amount (LKR)</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full px-4 py-3 rounded bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Down Payment (LKR)</label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full px-4 py-3 rounded bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Loan Term (Years)</label>
              <select
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full px-4 py-3 rounded bg-background border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[1, 2, 3, 4, 5, 6, 7].map((year) => (
                  <option key={year} value={year}>
                    {year} years
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <Button onClick={calculatePayment} className="w-full h-12">
                Calculate Payment
              </Button>
            </div>
          </div>

          {monthlyPayment > 0 && (
            <div className="mt-6 p-4 bg-primary/20 rounded-lg border border-primary/30">
              <p className="text-sm text-muted-foreground mb-1">Estimated Monthly Payment</p>
              <p className="text-3xl font-bold text-primary">
                LKR {monthlyPayment.toLocaleString("en-US", { maximumFractionDigits: 0 })}
              </p>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="mb-12">
          <h3 className="font-bold text-2xl mb-6">Customer Reviews</h3>

          <div className="space-y-4 mb-8">
            {vehicle.reviews.map((review, idx) => (
              <div key={idx} className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold">{review.author}</p>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                </div>
                <p className="text-foreground">{review.text}</p>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full h-12 bg-transparent">
            Write a Review (Sign in required)
          </Button>
        </div>
      </div>

      {/* Chatbot Icon */}
      <ChatBot />

      <Footer />
    </div>
  )
}
