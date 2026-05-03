"use client"

import React from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#f8f5f2] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h1
            className="text-3xl md:text-4xl font-bold text-[#333333] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-[#666666] text-base md:text-lg max-w-2xl mx-auto">
            Your privacy matters to us. This policy explains how EnarMart collects, uses, and protects your personal information.
          </p>
          <p className="text-sm text-[#999999] mt-4">Last updated: March 4, 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="space-y-10 text-[#666666] leading-relaxed">
            {/* Introduction */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                1. Introduction
              </h2>
              <p className="mb-3">
                Welcome to EnarMart (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting the privacy and security of your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website enarmart.com (the &quot;Site&quot;) and purchase our digital Canva template products.
              </p>
              <p className="mb-3">
                By accessing or using our Site, you agree to the practices described in this Privacy Policy. If you do not agree with the terms of this policy, please do not access the Site.
              </p>
              <p>
                This policy applies to information collected through our Site and does not apply to information collected through third-party services that we may link to, such as Canva, payment processors, or social media platforms.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                2. Information We Collect
              </h2>
              <p className="mb-4">We may collect the following types of information:</p>

              <h3
                className="text-lg font-semibold text-[#333333] mb-2"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Personal Information
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Full name and email address when you create an account or make a purchase</li>
                <li>Billing address and payment information processed through our secure payment providers</li>
                <li>Phone number (optional, if provided for order support)</li>
                <li>Account credentials (email and encrypted password)</li>
              </ul>

              <h3
                className="text-lg font-semibold text-[#333333] mb-2"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Usage Information
              </h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Pages visited, time spent on pages, and navigation patterns on our Site</li>
                <li>Search queries and filter preferences for Canva templates</li>
                <li>Products viewed, added to cart, and purchased</li>
                <li>Device type, browser type, operating system, and IP address</li>
              </ul>

              <h3
                className="text-lg font-semibold text-[#333333] mb-2"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Cookies and Tracking Technologies
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Essential cookies for site functionality and authentication</li>
                <li>Analytics cookies (e.g., Google Analytics) to understand how visitors interact with our Site</li>
                <li>Marketing cookies to deliver relevant advertisements and track campaign performance</li>
                <li>Preference cookies to remember your settings and choices</li>
              </ul>
            </div>

            {/* How We Use Information */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                3. How We Use Your Information
              </h2>
              <p className="mb-4">We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-[#333333]">Order Processing:</strong> To process and fulfill your digital template purchases, deliver download links, and provide order confirmations</li>
                <li><strong className="text-[#333333]">Account Management:</strong> To create and manage your EnarMart account, including your purchase history and template library</li>
                <li><strong className="text-[#333333]">Communication:</strong> To send transactional emails (order receipts, download links), respond to support inquiries, and deliver newsletter content you have opted into</li>
                <li><strong className="text-[#333333]">Site Improvement:</strong> To analyze usage patterns, improve our template offerings, enhance user experience, and optimize site performance</li>
                <li><strong className="text-[#333333]">Marketing:</strong> To send promotional content about new templates, special offers, and seasonal discounts (only with your consent)</li>
                <li><strong className="text-[#333333]">Security:</strong> To detect and prevent fraud, unauthorized access, and other illegal activities</li>
                <li><strong className="text-[#333333]">Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
              </ul>
            </div>

            {/* Information Sharing */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                4. Information Sharing and Disclosure
              </h2>
              <p className="mb-3">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-[#333333]">Service Providers:</strong> With trusted third-party vendors who assist in operating our Site (e.g., payment processors like Stripe, email delivery services, and cloud hosting providers)</li>
                <li><strong className="text-[#333333]">Legal Requirements:</strong> When required by law, court order, or governmental regulation</li>
                <li><strong className="text-[#333333]">Business Transfers:</strong> In connection with a merger, acquisition, or sale of all or a portion of our assets</li>
                <li><strong className="text-[#333333]">Consent:</strong> With your explicit consent for any purpose not described in this policy</li>
              </ul>
            </div>

            {/* Data Security */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                5. Data Security
              </h2>
              <p className="mb-3">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL/TLS encryption for all data transmitted between your browser and our servers</li>
                <li>Secure payment processing through PCI-compliant payment providers</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls limiting employee access to personal data on a need-to-know basis</li>
                <li>Encrypted storage of sensitive account credentials</li>
              </ul>
              <p className="mt-3">
                While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                6. Your Rights and Choices
              </h2>
              <p className="mb-3">Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-[#333333]">Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong className="text-[#333333]">Correction:</strong> Request correction of inaccurate or incomplete personal data</li>
                <li><strong className="text-[#333333]">Deletion:</strong> Request deletion of your personal data, subject to legal obligations</li>
                <li><strong className="text-[#333333]">Opt-Out:</strong> Unsubscribe from marketing communications at any time via the link in our emails</li>
                <li><strong className="text-[#333333]">Cookie Management:</strong> Manage cookie preferences through your browser settings</li>
                <li><strong className="text-[#333333]">Data Portability:</strong> Request your data in a structured, commonly used format</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, please contact us at <a href="mailto:privacy@enarmart.com" className="text-[#00a67d] hover:underline">privacy@enarmart.com</a>. We will respond to your request within 30 days.
              </p>
            </div>

            {/* Children's Privacy */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                7. Children&apos;s Privacy
              </h2>
              <p>
                Our Site and digital products are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently collected such information, we will take immediate steps to delete it. If you believe we have collected information from a child under 13, please contact us at <a href="mailto:privacy@enarmart.com" className="text-[#00a67d] hover:underline">privacy@enarmart.com</a>.
              </p>
            </div>

            {/* Third-Party Links */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                8. Third-Party Links
              </h2>
              <p>
                Our Site may contain links to third-party websites, including Canva.com, social media platforms, and payment providers. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to review the privacy policies of any third-party sites you visit. This Privacy Policy applies only to information collected on our Site.
              </p>
            </div>

            {/* Policy Updates */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                9. Policy Updates
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. We will notify you of any material changes by posting the updated policy on this page with a new &quot;Last updated&quot; date. We encourage you to review this policy periodically to stay informed about how we protect your information.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#333333] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                10. Contact Us
              </h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:
              </p>
              <div className="mt-4 p-6 bg-[#f8f5f2] rounded-lg">
                <p className="text-[#333333] font-semibold mb-2">EnarMart Privacy Team</p>
                <p>Email: <a href="mailto:privacy@enarmart.com" className="text-[#00a67d] hover:underline">privacy@enarmart.com</a></p>
                <p>Website: <a href="https://enarmart.com" className="text-[#00a67d] hover:underline">enarmart.com</a></p>
                <p>Response time: Within 30 business days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
