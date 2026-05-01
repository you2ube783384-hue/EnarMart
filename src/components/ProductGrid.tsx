"use client"

import React, { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ExternalLink, Heart, Eye } from "lucide-react"
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
  const [hoveredId, setHoveredId] = useState<string | null>(null)

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
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-xl border overflow-hidden">
              <Skeleton className="aspect-[4/3] w-full" />
              <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-8 w-20" />
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
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="size-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Eye className="size-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? `No results for "${searchQuery}". Try a different search term.`
              : category
              ? `No products in "${category}" category yet. Check back soon!`
              : "No products available yet. Be the first to add one!"}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            {category ? category : "Featured Products"}
          </h2>
          <p className="text-muted-foreground mt-1">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : category
              ? `Browse our ${category.toLowerCase()} collection`
              : "Hand-picked digital products for your creative projects"}
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {products.length} product{products.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="group rounded-xl border bg-card overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => handleCardClick(product)}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <Image
                src={product.imageUrl}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              {/* Overlay on hover */}
              <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300`} />
              {/* Featured badge */}
              {product.featured && (
                <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 text-xs">
                  Featured
                </Badge>
              )}
              {/* Quick actions */}
              <div className={`absolute top-3 right-3 flex gap-2 transition-all duration-300 ${hoveredId === product.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                <Button
                  size="icon"
                  variant="secondary"
                  className="size-8 rounded-full bg-white/90 hover:bg-white text-foreground shadow-sm"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <Heart className="size-3.5" />
                </Button>
              </div>
              {/* View Now overlay button */}
              {product.viewUrl && (
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hoveredId === product.id ? 'opacity-100' : 'opacity-0'}`}>
                  <Button
                    size="sm"
                    className="bg-white/95 text-foreground hover:bg-white shadow-lg gap-1.5"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewNow(product)
                    }}
                  >
                    <ExternalLink className="size-3.5" />
                    View Now
                  </Button>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs font-normal">
                  {product.category}
                </Badge>
              </div>
              <h3 className="font-semibold text-sm line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                {product.title}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                {product.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">${product.price}</span>
                <Button
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleViewNow(product)
                  }}
                  disabled={!product.viewUrl}
                >
                  <ExternalLink className="size-3" />
                  {product.viewUrl ? "View Now" : "Coming Soon"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
