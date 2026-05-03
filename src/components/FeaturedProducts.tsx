"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEye,
  faDownload,
  faArrowRight,
  faStar,
} from "@fortawesome/free-solid-svg-icons"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

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

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/products?featured=true")
      if (!res.ok) return
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch {
      // Silently ignore
    } finally {
      setLoading(false)
    }
  }, [])

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

  if (products.length === 0) return null

  return (
    <section className="max-w-[1320px] mx-auto px-6 lg:px-10 py-12 md:py-16">
      {/* Section header */}
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <div>
          <h2
            className="text-2xl md:text-3xl font-bold tracking-tight text-[#1a1a2e]"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Featured Templates
          </h2>
          <p className="text-sm text-[#8e8ea0] mt-1.5">
            Hand-picked Canva templates for your creative projects
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="text-xs bg-[#f0fdf9] text-[#00a67d] border border-[#e6f7f2] font-semibold px-3.5 py-1.5 rounded-full">
            {products.length} template{products.length !== 1 ? "s" : ""}
          </Badge>
          <Link href="/shop" className="hidden sm:flex">
            <button className="flex items-center gap-2 text-sm font-semibold text-[#00a67d] hover:text-[#008f6b] transition-colors cursor-pointer group">
              View All
              <FontAwesomeIcon icon={faArrowRight} className="text-[0.6rem] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </Link>
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

      {/* Explore more CTA */}
      <div className="mt-12 text-center">
        <Link href="/shop">
          <Button
            size="lg"
            className="bg-[#00a67d] text-white hover:bg-[#008f6b] border-0 px-10 rounded-xl h-12 text-sm font-bold tracking-wide shadow-lg shadow-[#00a67d]/20 hover:shadow-xl hover:shadow-[#00a67d]/30 transition-all duration-300"
          >
            Explore All Templates
            <FontAwesomeIcon icon={faArrowRight} className="ml-2.5 text-xs" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
