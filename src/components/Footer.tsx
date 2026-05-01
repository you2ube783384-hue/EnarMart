"use client"

import React from "react"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCamera,
  faPalette,
  faTableColumns,
  faFont,
  faCube,
  faShapes,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons"
import {
  faGithub,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons"

const footerLinks = {
  categories: [
    { name: "Photos", icon: faCamera },
    { name: "Graphics", icon: faPalette },
    { name: "Templates", icon: faTableColumns },
    { name: "Fonts", icon: faFont },
    { name: "3D", icon: faCube },
    { name: "Icons", icon: faShapes },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Press", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "License Terms", href: "#" },
    { name: "Refund Policy", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#000000] text-[#ffffff] mt-auto">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4" style={{ fontFamily: "var(--font-poppins)" }}>
              <div className="size-8 rounded-lg bg-[#ffefb8] flex items-center justify-center">
                <span className="text-[#000000] font-bold text-sm">D</span>
              </div>
              <span>DigiMarket</span>
            </Link>
            <p className="text-[#ffffff]/60 text-sm max-w-sm mb-6">
              The marketplace for premium digital products. Discover handcrafted assets from talented creators worldwide.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="size-9 rounded-lg bg-[#ffffff]/10 hover:bg-[#ffffff]/20 flex items-center justify-center transition-colors">
                <FontAwesomeIcon icon={faXTwitter} className="text-sm" />
              </a>
              <a href="#" className="size-9 rounded-lg bg-[#ffffff]/10 hover:bg-[#ffffff]/20 flex items-center justify-center transition-colors">
                <FontAwesomeIcon icon={faGithub} className="text-sm" />
              </a>
              <a href="#" className="size-9 rounded-lg bg-[#ffffff]/10 hover:bg-[#ffffff]/20 flex items-center justify-center transition-colors">
                <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[#ffffff]/80" style={{ fontFamily: "var(--font-poppins)" }}>Categories</h3>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <button className="flex items-center gap-2 text-sm text-[#ffffff]/50 hover:text-[#ffffff] transition-colors">
                    <FontAwesomeIcon icon={link.icon} className="text-xs" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[#ffffff]/80" style={{ fontFamily: "var(--font-poppins)" }}>Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-[#ffffff]/50 hover:text-[#ffffff] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[#ffffff]/80" style={{ fontFamily: "var(--font-poppins)" }}>Legal</h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-[#ffffff]/50 hover:text-[#ffffff] transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#ffffff]/10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#ffffff]/40">
            © {new Date().getFullYear()} DigiMarket. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-[#ffffff]/40 hover:text-[#ffffff]/60 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-[#ffffff]/40 hover:text-[#ffffff]/60 transition-colors">Terms</a>
            <a href="#" className="text-xs text-[#ffffff]/40 hover:text-[#ffffff]/60 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
