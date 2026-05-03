"use client"

import React from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f0fdf9] via-[#f8f5f2] to-[#e6f7f2] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <h1
            className="text-3xl md:text-4xl font-bold tracking-tight text-[#1a1a2e] mb-4"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Terms of Service
          </h1>
          <p className="text-[#555770] text-base md:text-lg max-w-2xl mx-auto">
            Please read these terms carefully before using EnarMart. By accessing our site or purchasing templates, you agree to these terms.
          </p>
          <p className="text-sm text-[#8e8ea0] mt-4">Last updated: March 4, 2026</p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <div className="space-y-10 text-[#555770] leading-relaxed">
            {/* Acceptance */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                1. Acceptance of Terms
              </h2>
              <p className="mb-3">
                These Terms of Service (&quot;Terms&quot;) govern your access to and use of the EnarMart website, products, and services (collectively, the &quot;Services&quot;). By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms.
              </p>
              <p>
                If you do not agree to these Terms, you may not access or use our Services. These Terms apply to all visitors, users, and customers of the Site. We reserve the right to update these Terms at any time, and your continued use of the Services constitutes acceptance of any changes.
              </p>
            </div>

            {/* Description of Services */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                2. Description of Services
              </h2>
              <p className="mb-3">
                EnarMart is a digital marketplace that offers premium Canva templates for purchase and download. Our Services include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browsing and searching our catalog of Canva-compatible template designs</li>
                <li>Purchasing and downloading digital template files</li>
                <li>Accessing your purchase history and template library through your account</li>
                <li>Receiving updates and support for purchased templates</li>
                <li>Subscribing to newsletters and promotional communications</li>
              </ul>
              <p className="mt-3">
                All templates sold on EnarMart are digital products delivered electronically. No physical goods are shipped. Templates are designed for use within the Canva platform and may require a Canva account (free or Pro) to edit.
              </p>
            </div>

            {/* User Accounts */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                3. User Accounts
              </h2>
              <p className="mb-3">
                To purchase and download templates, you may need to create an EnarMart account. When creating an account, you agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete registration information</li>
                <li>Maintain and promptly update your account information to keep it accurate</li>
                <li>Maintain the security and confidentiality of your account credentials</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
              <p className="mt-3">
                We reserve the right to suspend or terminate accounts that violate these Terms or are involved in fraudulent activity.
              </p>
            </div>

            {/* Purchases and Payments */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                4. Purchases and Payments
              </h2>
              <p className="mb-3">
                By purchasing a template on EnarMart, you agree to the following:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-[#1a1a2e]">Pricing:</strong> All prices are listed in USD and are subject to change without notice. Promotional pricing is valid only during the specified promotional period.</li>
                <li><strong className="text-[#1a1a2e]">Payment:</strong> Payment is processed securely through our third-party payment providers at the time of purchase. We accept major credit cards, debit cards, and other payment methods as available.</li>
                <li><strong className="text-[#1a1a2e]">Digital Delivery:</strong> Upon successful payment, you will receive immediate access to download your template. Download links are also available in your account dashboard.</li>
                <li><strong className="text-[#1a1a2e]">Sales Tax:</strong> Applicable sales tax will be added to your purchase based on your billing location, as required by law.</li>
                <li><strong className="text-[#1a1a2e]">Price Errors:</strong> In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price and issue a full refund.</li>
              </ul>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                5. Intellectual Property
              </h2>
              <p className="mb-3">
                All templates, designs, graphics, and content available on EnarMart are the intellectual property of EnarMart or its respective creators. Your purchase grants you a limited, non-exclusive license to use the template as described in our <a href="/license" className="text-[#00a67d] hover:underline">License Agreement</a>.
              </p>
              <p className="mb-3">You may NOT:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Redistribute, resell, or share the template files in their original or modified form</li>
                <li>Claim the template design as your own original work</li>
                <li>Use the template to create competing products for sale</li>
                <li>Transfer or sublicense your license to another party</li>
                <li>Remove or alter any copyright notices embedded in the template</li>
              </ul>
            </div>

            {/* Prohibited Conduct */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                6. Prohibited Conduct
              </h2>
              <p className="mb-3">When using our Services, you agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the Site for any unlawful purpose or in violation of any applicable laws</li>
                <li>Attempt to gain unauthorized access to our systems, accounts, or networks</li>
                <li>Interfere with or disrupt the Services or servers connected to the Site</li>
                <li>Upload or transmit viruses, malware, or any other malicious code</li>
                <li>Scrape, crawl, or use automated tools to extract data from our Site</li>
                <li>Impersonate any person or entity or misrepresent your affiliation</li>
                <li>Engage in any form of fraud, including payment fraud</li>
                <li>Share your account access with unauthorized individuals</li>
              </ul>
            </div>

            {/* Disclaimer of Warranties */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                7. Disclaimer of Warranties
              </h2>
              <p className="mb-3">
                OUR SERVICES AND TEMPLATES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Implied warranties of merchantability and fitness for a particular purpose</li>
                <li>Warranties of non-infringement of third-party rights</li>
                <li>Warranties that the Site will be uninterrupted, error-free, or secure</li>
                <li>Warranties that templates will meet your specific requirements or expectations</li>
                <li>Warranties regarding compatibility with all versions of Canva or third-party tools</li>
              </ul>
              <p className="mt-3">
                Templates are designed for use within Canva and may require a Canva Pro subscription for full functionality. We are not responsible for changes to Canva&apos;s platform that may affect template compatibility.
              </p>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                8. Limitation of Liability
              </h2>
              <p className="mb-3">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, ENARMART SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, BUSINESS OPPORTUNITIES, OR GOODWILL.
              </p>
              <p>
                Our total liability for any claim arising from or related to these Terms or your use of the Services shall not exceed the amount you paid to EnarMart for the specific template or service giving rise to the claim.
              </p>
            </div>

            {/* Indemnification */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                9. Indemnification
              </h2>
              <p>
                You agree to indemnify and hold harmless EnarMart, its officers, directors, employees, and agents from any claims, damages, losses, costs, or expenses (including reasonable attorneys&apos; fees) arising out of or related to your use of the Services, your violation of these Terms, or your violation of any rights of another party.
              </p>
            </div>

            {/* Termination */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                10. Termination
              </h2>
              <p className="mb-3">
                We may terminate or suspend your access to the Services at our sole discretion, without notice, for conduct that we believe violates these Terms, is harmful to other users, or is otherwise objectionable.
              </p>
              <p>
                Upon termination, your right to use the Services will immediately cease. Provisions of these Terms that by their nature should survive termination shall remain in effect, including intellectual property provisions, disclaimers, and limitation of liability clauses.
              </p>
            </div>

            {/* Governing Law */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                11. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising from these Terms or the Services shall be resolved in the courts located in the jurisdiction where EnarMart is registered.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2
                className="text-xl md:text-2xl font-semibold text-[#1a1a2e] mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                12. Contact Us
              </h2>
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="mt-4 p-6 bg-[#f5f5f7] rounded-xl">
                <p className="text-[#1a1a2e] font-semibold mb-2">EnarMart Legal Team</p>
                <p>Email: <a href="mailto:legal@enarmart.com" className="text-[#00a67d] hover:underline">legal@enarmart.com</a></p>
                <p>Website: <a href="https://enarmart.com" className="text-[#00a67d] hover:underline">enarmart.com</a></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
