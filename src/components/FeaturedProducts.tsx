"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faEye,
  faDownload,
  faArrowRight,
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

  if (products.length === 0) return null

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 md:py-12">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#333333]" style={{ fontFamily: "var(--font-poppins)" }}>
            Featured Templates
          </h2>
          <p className="text-sm text-[#999999] mt-1">
            Hand-picked Canva templates for your creative projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="text-xs bg-[#e6f7f2] text-[#00a67d] border-0 font-medium px-3 py-1 rounded-full">
            {products.length} template{products.length !== 1 ? "s" : ""}
          </Badge>
          <Link href="/shop">
            <button className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#00a67d] hover:text-[#008f6b] transition-colors cursor-pointer">
              View All
              <FontAwesomeIcon icon={faArrowRight} className="text-[0.6rem]" />
            </button>
          </Link>
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
            <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5] rounded-lg sm:rounded-xl">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-lg sm:rounded-xl" />
              {product.featured && (
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-[#e67e22] text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
                  ★ Featured
                </span>
              )}
            </div>

            <div className="pt-2 sm:pt-2.5 px-0.5">
              <h3 className="font-medium text-[13px] sm:text-sm text-[#333333] line-clamp-2 leading-snug group-hover:text-[#00a67d] transition-colors">
                {product.title}
              </h3>
              <span className="block text-[15px] sm:text-lg font-bold text-[#222222] mt-1" style={{ fontFamily: "var(--font-poppins)" }}>
                ${product.price}
              </span>
              <span className="inline-flex items-center gap-1 mt-1.5 text-[10px] sm:text-[11px] font-medium text-white bg-[#00a67d] px-2 py-0.5 rounded-full">
                <FontAwesomeIcon icon={faDownload} className="text-[0.5rem]" />
                Canva Template
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Explore more CTA */}
      <div className="mt-8 text-center">
        <Link href="/shop">
          <Button
            size="lg"
            className="bg-[#00a67d] text-white hover:bg-[#008f6b] border-0 px-8 rounded-full h-11 text-sm font-semibold"
          >
            Explore All Templates
            <FontAwesomeIcon icon={faArrowRight} className="ml-2 text-xs" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
