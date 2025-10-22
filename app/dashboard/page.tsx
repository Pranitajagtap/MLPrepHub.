'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface User {
  id: string
  name: string
  email: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      try {
        const userData = localStorage.getItem('user')
        if (!userData) {
          router.push('/auth/login')
          return
        }
        
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error checking auth:', error)
        router.push('/auth/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/auth/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect due to useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">ML</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">MLPrepHub</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your ML Journey, {user.name}! 🚀
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to master machine learning interviews and land your dream job at top tech companies?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Link 
            href="/careers"
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-blue-500"
          >
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Explore Careers</h3>
            <p className="text-gray-600 text-lg">Discover ML career paths that match your interests and skills</p>
          </Link>

          <Link 
            href="/learn"
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-green-500"
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Start Learning</h3>
            <p className="text-gray-600 text-lg">Begin your personalized ML learning journey with curated resources</p>
          </Link>

          <Link 
            href="/resume"
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-purple-500"
          >
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Build Resume</h3>
            <p className="text-gray-600 text-lg">Create an AI-optimized resume tailored for ML roles</p>
          </Link>
        </div>

        {/* Progress Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Learning Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition">
              <div className="text-3xl font-bold text-blue-600 mb-2">0%</div>
              <div className="text-gray-700 text-lg font-medium">Overall Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '0%' }}></div>
              </div>
            </div>
            <div className="text-center p-6 border-2 border-gray-200 rounded-xl hover:border-green-500 transition">
              <div className="text-3xl font-bold text-green-600 mb-2">0</div>
              <div className="text-gray-700 text-lg font-medium">Skills Mastered</div>
              <p className="text-gray-500 text-sm mt-2">Start learning to unlock skills!</p>
            </div>
            <div className="text-center p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 transition">
              <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
              <div className="text-gray-700 text-lg font-medium">Assessments Taken</div>
              <p className="text-gray-500 text-sm mt-2">Complete your first assessment!</p>
            </div>
          </div>
        </div>

        {/* Quick Start CTA */}
        <div className="text-center mt-12">
          <Link 
            href="/learn"
            className="inline-block bg-linear-to-r from-blue-600 to-indigo-700 text-white text-lg font-semibold px-8 py-4 rounded-xl hover:shadow-xl transition hover:-translate-y-1"
          >
            Start Your ML Journey Today →
          </Link>
        </div>
      </div>
    </div>
  )
}