"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRight,
  faEye,
} from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

interface Product {
  id: string
  title: string
  description: string
  price: string
  category: string
  imageUrl: string
  viewUrl: string
  featured: boolean
  createdAt: string
}

interface ProductGridProps {
  category: string | null
  searchQuery: string
}

export function ProductGrid({ category, searchQuery }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (category) params.set("category", category)
      if (searchQuery) params.set("search", searchQuery)
      const res = await fetch(`/api/products?${params.toString()}`)
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }, [category, searchQuery])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleViewNow = (product: Product) => {
    if (product.viewUrl) {
      window.open(product.viewUrl, "_blank", "noopener,noreferrer")
    }
  }

  const handleCardClick = (product: Product) => {
    if (product.viewUrl) {
      window.open(product.viewUrl, "_blank", "noopener,noreferrer")
    }
  }

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-[#e5e5e5]">
              <Skeleton className="aspect-[4/3] w-full rounded-none" />
              <div className="p-2.5 sm:p-4 space-y-2 sm:space-y-3">
                <Skeleton className="h-3 sm:h-4 w-3/4" />
                <div className="hidden sm:block"><Skeleton className="h-3 w-full" /></div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 sm:h-5 w-12 sm:w-16" />
                  <Skeleton className="h-6 sm:h-8 w-16 sm:w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20 text-center">
        <div className="max-w-sm mx-auto">
          <div className="size-16 rounded-full bg-[#e6f7f2] flex items-center justify-center mx-auto mb-5">
            <FontAwesomeIcon icon={faEye} className="text-2xl text-[#00a67d]" />
          </div>
          <h3 className="text-lg font-semibold text-[#333333] mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
            No products found
          </h3>
          <p className="text-sm text-[#999999]">
            {searchQuery
              ? `No results for "${searchQuery}". Try a different search term.`
              : category
              ? `No products in "${category}" category yet. Check back soon!`
              : "No products available yet."}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 py-8 md:py-12">
      {/* Section header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#333333]" style={{ fontFamily: "var(--font-poppins)" }}>
            {category ? category : "Featured Products"}
          </h2>
          <p className="text-sm text-[#999999] mt-1">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : category
              ? `Browse our ${category.toLowerCase()} collection`
              : "Hand-picked digital products for your creative projects"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="text-xs bg-[#e6f7f2] text-[#00a67d] border-0 font-medium px-3 py-1 rounded-full">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </Badge>
          <button
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#00a67d] hover:text-[#008f6b] transition-colors cursor-pointer"
            onClick={() => {
              const el = document.getElementById("products-section")
              if (el) el.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Explore
            <FontAwesomeIcon icon={faArrowRight} className="text-[0.6rem]" />
          </button>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="group rounded-xl bg-white border border-[#e5e5e5] overflow-hidden transition-all hover:shadow-lg hover:border-transparent cursor-pointer"
            onClick={() => handleCardClick(product)}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f5f5]">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              {/* Featured badge */}
              {product.featured && (
                <Badge className="absolute top-3 left-3 bg-[#fff8e1] text-[#e67e22] border-0 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                  Featured
                </Badge>
              )}
              {/* View Now overlay button */}
              {product.viewUrl && (
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <Button
                    size="sm"
                    className="bg-[#00a67d] text-white hover:bg-[#008f6b] shadow-lg gap-1.5 rounded-full px-5 text-xs font-semibold"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewNow(product)
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="text-[0.6rem]" />
                    View Now
                  </Button>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-2.5 sm:p-4">
              <div className="hidden sm:flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="text-[10px] font-medium border-[#e5e5e5] text-[#999999] rounded-full px-2 py-0"
                >
                  {product.category}
                </Badge>
              </div>
              <h3
                className="font-semibold text-xs sm:text-sm line-clamp-1 text-[#333333] group-hover:text-[#00a67d] transition-colors"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {product.title}
              </h3>
              <p className="hidden sm:block text-xs text-[#999999] line-clamp-2 mt-1 mb-3 leading-relaxed">
                {product.description}
              </p>
              <div className="flex items-center justify-between mt-2 sm:mt-0">
                <span className="text-sm sm:text-base font-bold text-[#333333]" style={{ fontFamily: "var(--font-poppins)" }}>
                  ${product.price}
                </span>
                <Button
                  size="sm"
                  className="gap-1 text-[10px] sm:text-xs bg-[#00a67d] text-white hover:bg-[#008f6b] rounded-full px-2.5 sm:px-4 font-semibold h-7 sm:h-8"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleViewNow(product)
                  }}
                  disabled={!product.viewUrl}
                >
                  {product.viewUrl ? "View Now" : "Soon"}
                  {product.viewUrl && <FontAwesomeIcon icon={faArrowRight} className="text-[0.5rem] sm:text-[0.55rem]" />}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
