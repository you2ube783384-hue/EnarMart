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
  faEnvelope,
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
    <footer className="bg-[#1a1a2e] text-white mt-auto">
      {/* Main footer */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/logo.png"
                alt="EnarMart"
                width={160}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-white/35 max-w-sm mb-6 leading-relaxed">
              The marketplace for premium Canva templates. Beautiful, ready-to-edit designs for resumes, social media, YouTube, and more.
            </p>
            <div className="flex items-center gap-3">
              <a href="mailto:support@enarmart.com" className="size-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110">
                <FontAwesomeIcon icon={faEnvelope} className="text-sm text-white/50" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 mb-5"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Categories
            </h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="flex items-center gap-2.5 text-sm text-white/30 hover:text-white/70 transition-colors duration-200">
                    <FontAwesomeIcon icon={link.icon} className="text-[0.6rem] w-3 text-[#00a67d]/60" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 mb-5"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/30 hover:text-white/70 transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 mb-5"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/30 hover:text-white/70 transition-colors duration-200">
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
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} EnarMart. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/20 hover:text-white/40 transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-white/20 hover:text-white/40 transition-colors">Terms</Link>
            <Link href="/shop" className="text-xs text-white/20 hover:text-white/40 transition-colors flex items-center gap-1.5">
              <FontAwesomeIcon icon={faShop} className="text-[0.5rem]" />
              Shop
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
