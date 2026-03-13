import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quick Sheets - AI-Powered Financial Advisory Platform',
  description: 'Empowering financial advisors with AI-driven insights and enabling clients to chat with their financial data.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">
        {children}
      </body>
    </html>
  )
}
