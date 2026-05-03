"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowRight,
  faEye,
  faDownload,
  faStar,
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
      <section className="max-w-[1320px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
              <div className="pt-3 space-y-2 px-1">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-5 w-2/5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="max-w-[1320px] mx-auto px-6 lg:px-10 py-24 text-center">
        <div className="max-w-sm mx-auto">
          <div className="size-20 rounded-2xl bg-[#f0fdf9] flex items-center justify-center mx-auto mb-6">
            <FontAwesomeIcon icon={faEye} className="text-3xl text-[#00a67d]" />
          </div>
          <h3
            className="text-xl font-bold text-[#1a1a2e] mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            No products found
          </h3>
          <p className="text-sm text-[#8e8ea0] leading-relaxed">
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
    <section className="max-w-[1320px] mx-auto px-6 lg:px-10 py-12 md:py-16">
      {/* Section header */}
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold tracking-tight text-[#1a1a2e]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {category ? category : "Featured Products"}
          </h2>
          <p className="text-sm text-[#8e8ea0] mt-1.5">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : category
              ? `Browse our ${category.toLowerCase()} collection`
              : "Hand-picked digital products for your creative projects"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="text-xs bg-[#f0fdf9] text-[#00a67d] border border-[#e6f7f2] font-semibold px-3.5 py-1.5 rounded-full">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </Badge>
          <button
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[#00a67d] hover:text-[#008f6b] transition-colors cursor-pointer group"
            onClick={() => {
              const el = document.getElementById("products-section")
              if (el) el.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Explore
            <FontAwesomeIcon icon={faArrowRight} className="text-[0.6rem] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card group cursor-pointer bg-white rounded-2xl border border-[#f0f0f3] hover:border-[#00a67d]/20 overflow-hidden"
            onClick={() => handleCardClick(product)}
          >
            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f8fa]">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Featured badge */}
              {product.featured && (
                <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-[#e67e22] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-[#e67e22]/10">
                  <FontAwesomeIcon icon={faStar} className="text-[0.5rem]" />
                  Featured
                </span>
              )}
              {/* Quick view overlay */}
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2.5 text-center shadow-lg">
                  <span className="text-xs font-bold text-[#1a1a2e] tracking-wide">View Template</span>
                </div>
              </div>
            </div>

            {/* Card info */}
            <div className="p-4 sm:p-5">
              {/* Title */}
              <h3
                className="font-semibold text-[13px] sm:text-sm text-[#1a1a2e] line-clamp-2 leading-snug group-hover:text-[#00a67d] transition-colors"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {product.title}
              </h3>

              {/* Category tag */}
              <p className="text-[11px] text-[#8e8ea0] mt-1.5 font-medium uppercase tracking-wider">
                {product.category}
              </p>

              {/* Price + badge row */}
              <div className="flex items-center justify-between mt-3">
                <span
                  className="text-lg sm:text-xl font-extrabold text-[#1a1a2e]"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  ${product.price}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#00a67d] bg-[#f0fdf9] px-2.5 py-1 rounded-full border border-[#e6f7f2]">
                  <FontAwesomeIcon icon={faDownload} className="text-[0.45rem]" />
                  Canva
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
