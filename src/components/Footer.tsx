"use client"

import React from "react"
import Link from "next/link"
import { Camera, Palette, Layout, Type, Box, Shapes, Mail, Github, Twitter } from "lucide-react"

const footerLinks = {
  categories: [
    { name: "Photos", icon: Camera, href: "#" },
    { name: "Graphics", icon: Palette, href: "#" },
    { name: "Templates", icon: Layout, href: "#" },
    { name: "Fonts", icon: Type, href: "#" },
    { name: "3D", icon: Box, href: "#" },
    { name: "Icons", icon: Shapes, href: "#" },
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
    <footer className="bg-slate-900 text-white mt-auto">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <div className="size-8 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span>DigiMarket</span>
            </Link>
            <p className="text-white/60 text-sm max-w-sm mb-6">
              The marketplace for premium digital products. Discover handcrafted assets from talented creators worldwide.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="size-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Twitter className="size-4" />
              </a>
              <a href="#" className="size-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Github className="size-4" />
              </a>
              <a href="#" className="size-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">Categories</h3>
            <ul className="space-y-2.5">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <button className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                    <link.icon className="size-3.5" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4 text-white/80">Legal</h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-sm text-white/50 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} DigiMarket. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors">Terms</a>
            <a href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
