"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRight,
  faEye,
  faDownload,
} from "@fortawesome/free-solid-svg-icons"
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

  const handleCardClick = (product: Product) => {
    if (product.viewUrl) {
      window.open(product.viewUrl, "_blank", "noopener,noreferrer")
    }
  }

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden">
              <Skeleton className="aspect-[4/5] w-full rounded-xl" />
              <div className="pt-2.5 space-y-1.5">
                <Skeleton className="h-3.5 w-4/5" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-2/5 rounded-full" />
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
    <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 md:py-12">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer"
            onClick={() => handleCardClick(product)}
          >
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5] rounded-lg sm:rounded-xl">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg sm:rounded-xl" />
              {/* Featured badge */}
              {product.featured && (
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[#e67e22] text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                  ★ Featured
                </span>
              )}
            </div>

            {/* Card info - clean Etsy style */}
            <div className="pt-2 sm:pt-2.5 px-0.5">
              {/* Title */}
              <h3
                className="font-medium text-[13px] sm:text-sm text-[#333333] line-clamp-2 leading-snug group-hover:text-[#00a67d] transition-colors"
              >
                {product.title}
              </h3>

              {/* Price - bold and prominent */}
              <span
                className="block text-[15px] sm:text-lg font-bold text-[#222222] mt-1"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                ${product.price}
              </span>

              {/* Digital download badge */}
              <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] sm:text-[11px] font-medium text-white bg-[#00a67d] px-2 py-0.5 rounded-full">
                <FontAwesomeIcon icon={faDownload} className="text-[0.5rem]" />
                Digital Download
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
