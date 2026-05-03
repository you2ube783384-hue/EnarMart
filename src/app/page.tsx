"use client"

import React from "react"
import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { FeaturedProducts } from "@/components/FeaturedProducts"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  )
}
