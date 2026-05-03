"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faFire,
  faBriefcase,
  faBullhorn,
  faVideo,
  faLayerGroup,
  faGraduationCap,
  faHeart,
  faChartLine,
  faCrown,
  faEnvelope,
  faArrowRight,
  faShop,
} from "@fortawesome/free-solid-svg-icons"

const footerLinks = {
  categories: [
    { name: "Most Purchased", icon: faFire, href: "/shop?category=Most+Purchased" },
    { name: "Resume & CV", icon: faBriefcase, href: "/shop?category=Resume+%26+CV" },
    { name: "Social Media", icon: faBullhorn, href: "/shop?category=Social+Media" },
    { name: "YouTube", icon: faVideo, href: "/shop?category=YouTube" },
    { name: "Presentations", icon: faLayerGroup, href: "/shop?category=Presentations" },
    { name: "Education", icon: faGraduationCap, href: "/shop?category=Education" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "FAQ", href: "/faq" },
    { name: "How It Works", href: "#" },
    { name: "Canva Guide", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refund" },
    { name: "License", href: "/license" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#2c2c2c] text-white mt-auto">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 md:py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: "var(--font-poppins)" }}>
                Stay in the loop
              </h3>
              <p className="text-sm text-white/50">
                Get new Canva templates, deals, and creative inspiration delivered to your inbox.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:w-64 h-10 bg-white/10 border border-white/10 rounded-full px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#00a67d] focus:ring-1 focus:ring-[#00a67d]"
              />
              <button className="h-10 px-5 bg-[#00a67d] hover:bg-[#008f6b] text-white text-sm font-semibold rounded-full transition-colors flex items-center gap-1.5 shrink-0">
                Subscribe
                <FontAwesomeIcon icon={faArrowRight} className="text-[0.6rem]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="EnarMart"
                width={160}
                height={40}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-sm text-white/40 max-w-sm mb-5 leading-relaxed">
              The marketplace for premium Canva templates. Beautiful, ready-to-edit designs for resumes, social media, YouTube, and more.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <FontAwesomeIcon icon={faEnvelope} className="text-xs text-white/60" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60 mb-4" style={{ fontFamily: "var(--font-poppins)" }}>
              Categories
            </h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="flex items-center gap-2 text-sm text-white/35 hover:text-white/70 transition-colors">
                    <FontAwesomeIcon icon={link.icon} className="text-[0.6rem] w-3" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60 mb-4" style={{ fontFamily: "var(--font-poppins)" }}>
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/35 hover:text-white/70 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/60 mb-4" style={{ fontFamily: "var(--font-poppins)" }}>
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/35 hover:text-white/70 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25">
            &copy; {new Date().getFullYear()} EnarMart. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-xs text-white/25 hover:text-white/40 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-white/25 hover:text-white/40 transition-colors">Terms</Link>
            <Link href="/shop" className="text-xs text-white/25 hover:text-white/40 transition-colors flex items-center gap-1">
              <FontAwesomeIcon icon={faShop} className="text-[0.5rem]" />
              Shop
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
