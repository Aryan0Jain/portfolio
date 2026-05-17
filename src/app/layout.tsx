import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

const BASE_URL = 'https://aryanjain.dev'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Aryan Jain — Senior Backend Engineer',
    template: '%s | Aryan Jain',
  },
  description:
    'Aryan Jain is a Senior Backend Engineer based in Bangalore, India. IIT Roorkee alumnus building high-performance APIs, real-time systems, and AI backends at Xarterian.',
  keywords: [
    'Aryan Jain',
    'Aryan Jain IIT Roorkee',
    'Aryan Jain Backend Engineer',
    'Aryan Jain Bangalore',
    'Senior Backend Engineer',
    'Node.js developer India',
    'AI Backend Engineer',
    'Aryan Jain portfolio',
  ],
  authors: [{ name: 'Aryan Jain', url: BASE_URL }],
  creator: 'Aryan Jain',
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'profile',
    url: BASE_URL,
    title: 'Aryan Jain — Senior Backend Engineer',
    description:
      'IIT Roorkee alumnus building high-performance APIs, real-time systems, and AI backends. 1M+ req/day, 99.9% uptime.',
    siteName: 'Aryan Jain',
    firstName: 'Aryan',
    lastName: 'Jain',
    username: 'aryan0jain',
    gender: 'male',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aryan Jain — Senior Backend Engineer',
    description:
      'IIT Roorkee alumnus building high-performance APIs, real-time systems, and AI backends.',
    creator: '@aryan0jain',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aryan Jain',
  url: BASE_URL,
  image: `${BASE_URL}/opengraph-image`,
  sameAs: [
    'https://github.com/Aryan0Jain',
    'https://www.linkedin.com/in/aryan0jain/',
    'https://twitter.com/aryan0jain',
  ],
  jobTitle: 'Senior Backend Engineer',
  worksFor: { '@type': 'Organization', name: 'Xarterian' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Indian Institute of Technology Roorkee' },
  address: { '@type': 'PostalAddress', addressLocality: 'Bangalore', addressCountry: 'IN' },
  knowsAbout: ['Node.js', 'TypeScript', 'AI Backends', 'High-Performance APIs', 'Real-Time Systems'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
