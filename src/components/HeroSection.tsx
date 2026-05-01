"use client"

import React from "react"
import { ArrowRight, Sparkles, Camera, Palette, Layout, Type, Box, Shapes } from "lucide-react"
import { Button } from "@/components/ui/button"

const categoryCards = [
  { name: "Photos", icon: Camera, color: "from-orange-500 to-amber-500", count: "2,400+" },
  { name: "Graphics", icon: Palette, color: "from-pink-500 to-rose-500", count: "1,800+" },
  { name: "Templates", icon: Layout, color: "from-emerald-500 to-teal-500", count: "3,200+" },
  { name: "Fonts", icon: Type, color: "from-violet-500 to-purple-500", count: "900+" },
  { name: "3D", icon: Box, color: "from-cyan-500 to-sky-500", count: "600+" },
  { name: "Icons", icon: Shapes, color: "from-yellow-500 to-orange-500", count: "5,000+" },
]

interface HeroSectionProps {
  onCategoryClick: (category: string) => void
}

export function HeroSection({ onCategoryClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-orange-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/20 to-transparent rounded-full blur-3xl" />

        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-sm text-white/80 mb-6 backdrop-blur-sm">
              <Sparkles className="size-4 text-amber-400" />
              <span>New products added daily</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              Premium Digital Assets
              <br />
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                For Creators
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Discover handcrafted fonts, graphics, templates, and more from talented creators worldwide. 
              Everything you need to bring your creative vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0 px-8"
                onClick={() => onCategoryClick("Templates")}
              >
                Explore Products
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8"
                onClick={() => onCategoryClick("Graphics")}
              >
                Browse Graphics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="container mx-auto px-4 -mt-8 relative z-10 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {categoryCards.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onCategoryClick(cat.name)}
              className="group relative overflow-hidden rounded-xl bg-card border shadow-sm p-4 md:p-5 text-left transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            >
              <div className={`size-10 md:size-12 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 transition-transform group-hover:scale-110`}>
                <cat.icon className="size-5 md:size-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm md:text-base">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{cat.count}</p>
              <div className={`absolute -bottom-8 -right-8 size-24 rounded-full bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
