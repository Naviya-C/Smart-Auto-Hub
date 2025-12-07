"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

const vehicles = [
  {
    id: 1,
    name: "2022 Toyota Prius",
    price: 17500000,
    status: "Available",
    location: "Nugegoda",
    type: "Hybrid",
    mileage: 25000,
    transmission: "Automatic",
    image: "/toyota-prius-2022.jpg",
  },
  {
    id: 2,
    name: "2021 Honda Civic",
    price: 15200000,
    status: "Available",
    location: "Nugegoda",
    type: "Sedan",
    mileage: 35000,
    transmission: "Manual",
    image: "/honda-civic-2021.jpg",
  },
  {
    id: 3,
    name: "2023 Suzuki Swift",
    price: 12800000,
    status: "Shipped",
    location: "Nugegoda",
    type: "Hatchback",
    mileage: 15000,
    transmission: "Automatic",
    image: "/suzuki-swift-2023.jpg",
  },
  {
    id: 4,
    name: "2021 Suzuki Wagon R",
    price: 6800000,
    status: "Available",
    location: "Nugegoda",
    type: "Van",
    mileage: 30000,
    transmission: "Automatic",
    image: "/suzuki-wagon-r-2021.jpg",
  },
  {
    id: 5,
    name: "2022 BMW X5",
    price: 28500000,
    status: "Available",
    location: "Nugegoda",
    type: "SUV",
    mileage: 18000,
    transmission: "Automatic",
    image: "/bmw-x5-2022-suv.jpg",
  },
  {
    id: 6,
    name: "2023 Toyota Corolla",
    price: 13200000,
    status: "Not Available",
    location: "Nugegoda",
    type: "Sedan",
    mileage: 8000,
    transmission: "Automatic",
    image: "/toyota-corolla-2023.png",
  },
]

export default function VehiclesPage() {


  const [sortBy, setSortBy] = useState("newest")
  const [filterAvailability, setFilterAvailability] = useState({
    Available: true,
    Shipped: true,
    "Not Available": true,
  })

  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(30000000)

  const filteredVehicles = vehicles
    .filter((v) => filterAvailability[v.status])
    .filter((v) => v.price >= minPrice && v.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price
      if (sortBy === "price-high") return b.price - a.price
      return 0
    })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section
        className="relative h-96 bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground flex items-center mb-24"
        style={{
          backgroundImage:
            "url(/placeholder.svg?height=384&width=1600&query=modern car showroom inventory luxury vehicles)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 w-full">
          <h1 className="text-6xl font-bold mb-4 text-balance">Find Your Perfect Car</h1>
          <p className="text-xl opacity-90 text-balance max-w-2xl">
            Browse our extensive inventory of quality vehicles. From sedans to SUVs, we have something for everyone.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* <h1 className="text-4xl font-bold mb-8">Search Our Inventory</h1> */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Panel */}
          <div className="lg:col-span-1">
            {/* <div className="bg-card rounded-lg p-6 border border-border sticky top-24"> */}
            <div className="bg-card rounded-lg p-6 border border-border sticky top-24 shadow-sm hover:shadow-md transition">  
              <h2 className="font-bold text-xl mb-6">Filters</h2>

              {/* Availability Filter */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Filter by Availability</h3>
                {["Available", "Shipped", "Not Available"].map((status) => (
                  // <label key={status} className="flex items-center gap-3 mb-3 cursor-pointer">
                  <label
                    key={status}
                    className="flex items-center gap-3 mb-3 cursor-pointer hover:text-primary transition"
                  >
                    <input
                      type="checkbox"
                      checked={filterAvailability[status]}
                      onChange={(e) =>
                        setFilterAvailability({
                          ...filterAvailability,
                          [status]: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded border-border"
                    />
                    <span className="text-sm">{status}</span>
                  </label>
                ))}
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm text-muted-foreground">Min: LKR {minPrice.toLocaleString()}</label>
                    <input
                      type="range"
                      min="0"
                      max="30000000"
                      step="1000000"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Max: LKR {maxPrice.toLocaleString()}</label>
                    <input
                      type="range"
                      min="0"
                      max="30000000"
                      step="1000000"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={() => window.location.reload()}>
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8 bg-secondary/10 rounded-lg px-6 py-4">
              <p className="text-muted-foreground font-semibold">Showing {filteredVehicles.length} vehicles</p>
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVehicles.map((vehicle) => (
                <Link
                  key={vehicle.id}
                  href={`/vehicles/${vehicle.id}`}
                  className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="relative h-56 bg-muted overflow-hidden">
                    <img
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <span
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm ${
                        vehicle.status === "Available"
                          ? "bg-green-500/90 text-white"
                          : vehicle.status === "Shipped"
                            ? "bg-yellow-500/90 text-white"
                            : "bg-red-500/90 text-white"
                      }`}
                    >
                      {vehicle.status}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition">{vehicle.name}</h3>
                    <p className="text-primary font-bold text-xl mb-3">LKR {vehicle.price.toLocaleString()}</p>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        {vehicle.location} | {vehicle.transmission} | {vehicle.mileage.toLocaleString()} km
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Icon */}
      <div className="fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-full p-4 shadow-lg cursor-pointer hover:scale-110 transition">
        <MessageSquare size={32} />
      </div>

      <Footer />
    </div>
  )
}
