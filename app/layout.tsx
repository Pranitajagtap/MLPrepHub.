import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LayoutWrapper from './components/LayoutWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MLPrepHub - Master Machine Learning Interviews',
  description: 'AI-powered platform for machine learning interview preparation, resume building, and career guidance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-white">
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </div>
        <footer className="bg-gray-900 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ML</span>
              </div>
              <span className="text-xl font-bold">MLPrepHub</span>
            </div>
            <p className="text-gray-400 mb-4">Your AI companion for ML career success</p>
            <div className="text-sm text-white">
              <p>Created by Pranita Jagtap | 
                <a href="https://github.com/Pranitajagtap" className="ml-2 hover:text-white transition">GitHub</a> | 
                <a href="https://www.linkedin.com/in/pranita-jagtap" className="ml-2 hover:text-white transition">LinkedIn</a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}