"use client"

import React, { useState, useCallback } from "react"
import { Header } from "@/components/Header"
import { HeroSection } from "@/components/HeroSection"
import { ProductGrid } from "@/components/ProductGrid"
import { Footer } from "@/components/Footer"
import { AdminPanel } from "@/components/AdminPanel"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [adminOpen, setAdminOpen] = useState(false)
  const [productRefreshKey, setProductRefreshKey] = useState(0)

  const handleCategorySelect = useCallback((category: string | null) => {
    setActiveCategory(category)
    setSearchQuery("")
  }, [])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setActiveCategory(null)
  }, [])

  const handleProductChange = useCallback(() => {
    setProductRefreshKey((prev) => prev + 1)
  }, [])

  const handleCategoryClick = useCallback((category: string) => {
    setActiveCategory(category)
    setSearchQuery("")
    // Scroll to products section
    const el = document.getElementById("products-section")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header
        onAdminClick={() => setAdminOpen(true)}
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
        activeCategory={activeCategory}
      />

      <main className="flex-1">
        {/* Show hero only when no category or search filter is active */}
        {!activeCategory && !searchQuery && (
          <HeroSection key={productRefreshKey} onCategoryClick={handleCategoryClick} />
        )}

        <div id="products-section">
          <ProductGrid
            key={productRefreshKey}
            category={activeCategory}
            searchQuery={searchQuery}
          />
        </div>

        {/* Newsletter / CTA Section */}
        {!activeCategory && !searchQuery && (
          <section className="bg-[#000000] py-16 md:py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-[#ffffff] mb-3" style={{ fontFamily: "var(--font-poppins)" }}>
                Ready to start selling?
              </h2>
              <p className="text-[#ffffff]/60 max-w-lg mx-auto mb-8">
                Join thousands of creators who are earning with their digital products. 
                Upload, list, and sell — it&apos;s that simple.
              </p>
              <button
                onClick={() => setAdminOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-[#ffefb8] px-8 py-3 text-sm font-medium text-[#000000] hover:bg-[#ffefb8]/80 transition-all"
              >
                Add Your First Product
              </button>
            </div>
          </section>
        )}
      </main>

      <Footer />

      <AdminPanel
        open={adminOpen}
        onOpenChange={setAdminOpen}
        onProductChange={handleProductChange}
      />
    </div>
  )
}
