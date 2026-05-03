"use client"

import React from "react"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

const stats = [
  { value: "5,000+", label: "Templates Available" },
  { value: "50,000+", label: "Happy Customers" },
  { value: "120+", label: "Template Categories" },
  { value: "4.9/5", label: "Average Rating" },
]

const values = [
  {
    title: "Design Excellence",
    description: "Every template is crafted by professional designers with meticulous attention to detail, ensuring your projects always look polished and on-brand.",
  },
  {
    title: "Simplicity First",
    description: "We believe great design should be accessible to everyone. Our templates are easy to customize in Canva — no design degree required.",
  },
  {
    title: "Customer Obsession",
    description: "Your success is our priority. From detailed product previews to responsive support, we go the extra mile to ensure you love every purchase.",
  },
  {
    title: "Continuous Innovation",
    description: "We stay ahead of design trends and platform updates, regularly releasing new templates that reflect the latest styles and best practices.",
  },
]

const team = [
  {
    name: "Sarah Mitchell",
    role: "Founder & Creative Director",
    description: "With over 10 years in graphic design, Sarah founded EnarMart to bridge the gap between professional design and everyday creators.",
  },
  {
    name: "David Chen",
    role: "Lead Template Designer",
    description: "David leads our design team, creating stunning templates across resume, social media, and presentation categories with a keen eye for typography.",
  },
  {
    name: "Amira Hassan",
    role: "Product & Customer Success",
    description: "Amira ensures every template meets our quality standards and that our customers have the best possible experience on the platform.",
  },
  {
    name: "James Park",
    role: "Head of Technology",
    description: "James builds and maintains the EnarMart platform, ensuring a seamless shopping experience from browsing to download.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#f8f5f2] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h1
            className="text-3xl md:text-5xl font-bold text-[#333333] mb-6"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            About EnarMart
          </h1>
          <p className="text-[#666666] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We&apos;re on a mission to make professional design accessible to everyone through premium Canva templates that are beautiful, affordable, and effortless to customize.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="space-y-6 text-[#666666] leading-relaxed">
            <h2
              className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Our Story
            </h2>
            <p>
              EnarMart was born in 2023 from a simple frustration: creating professional-looking designs shouldn&apos;t require expensive software or years of training. Our founder, Sarah Mitchell, noticed that small business owners, freelancers, and job seekers were spending hours trying to create resumes, social media posts, and presentations — often with disappointing results.
            </p>
            <p>
              After discovering Canva&apos;s powerful but underutilized template system, Sarah saw an opportunity. What if there was a curated marketplace where people could find premium, thoughtfully designed templates that actually looked like they were made by a professional designer? Not the generic, overused templates everyone else was using — but fresh, modern, and uniquely crafted designs.
            </p>
            <p>
              That vision became EnarMart. Today, we serve over 50,000 customers worldwide, offering more than 5,000 templates across 120+ categories. From eye-catching YouTube thumbnails to polished corporate presentations, we&apos;ve helped creators, entrepreneurs, and professionals bring their ideas to life — one template at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16 bg-[#f8f5f2]">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p
                  className="text-3xl md:text-4xl font-bold text-[#00a67d] mb-2"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-[#666666]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <h2
            className="text-xl md:text-2xl font-semibold text-[#333333] mb-8 text-center"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-xl border border-[#e5e5e5] hover:border-[#00a67d]/30 hover:shadow-sm transition-all duration-200"
              >
                <h3
                  className="text-lg font-semibold text-[#333333] mb-2"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {value.title}
                </h3>
                <p className="text-[#666666] text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-12 md:py-16 bg-[#f8f5f2]">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <h2
            className="text-xl md:text-2xl font-semibold text-[#333333] mb-8 text-center"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl p-6 border border-[#e5e5e5]"
              >
                <div className="w-14 h-14 rounded-full bg-[#00a67d]/10 flex items-center justify-center mb-4">
                  <span
                    className="text-xl font-bold text-[#00a67d]"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3
                  className="text-base font-semibold text-[#333333] mb-0.5"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {member.name}
                </h3>
                <p className="text-sm text-[#00a67d] font-medium mb-2">{member.role}</p>
                <p className="text-sm text-[#666666] leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2
            className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Ready to Create Something Amazing?
          </h2>
          <p className="text-[#666666] mb-6 max-w-lg mx-auto">
            Browse our collection of professionally designed Canva templates and find the perfect starting point for your next project.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#00a67d] hover:bg-[#008f6b] text-white font-semibold rounded-full transition-colors"
          >
            Browse Templates
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
