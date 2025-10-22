'use client'

import Link from 'next/link'
import AnimatedBackground from './components/AnimatedBackground'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [titleVisible, setTitleVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
    
    // Stagger the title animation slightly after the main content
    const timer = setTimeout(() => {
      setTitleVisible(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  const handleStartJourney = () => {
    // Clear any existing guest data to start fresh
    localStorage.removeItem('guestOnboarding')
    
    // Redirect to onboarding page for guest experience
    router.push('/onboarding')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <AnimatedBackground />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-6xl">
          {/* Logo and App Name with Enhanced Text Animation */}
          <div className="mb-12">
            <div className={`flex items-center justify-center space-x-3 mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">ML</span>
              </div>
              <h1 className={`text-5xl md:text-6xl font-bold text-gray-900 transition-all duration-1000 delay-200 ${
                titleVisible ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-sm scale-90'
              }`}>
                MLPrep<span className="text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">Hub</span>
              </h1>
            </div>
            <p className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Your AI-powered companion for mastering machine learning interviews and landing your dream job
            </p>
          </div>

          {/* Main Heading with Enhanced Text Animation */}
          <div className="mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm'
            }`}>
              Master Machine Learning
              <span className={`block text-blue-600 transition-all duration-1000 delay-1000 ${
                titleVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'
              }`}>
                Interviews with Confidence
              </span>
            </h2>
            <p className={`text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-900 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Personalized learning paths, real interview practice, and AI-powered resume building 
              <span className={`block text-blue-600 font-semibold transition-all duration-1000 delay-1200 ${
                titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
              }`}>
                specifically designed for ML roles
              </span>
            </p>
          </div>

          {/* Feature Cards with Text Hover Effects */}
          <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
            <div className={`group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } hover:-translate-y-2`} style={{ transitionDelay: '1300ms' }}>
              <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                🧠
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                ML Interview Prep
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Practice technical questions, system design, and ML concepts with real-time AI feedback
              </p>
              <div className="mt-4 text-blue-600 font-semibold group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                Start Practicing →
                <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">✨</span>
              </div>
            </div>

            <div className={`group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } hover:-translate-y-2`} style={{ transitionDelay: '1500ms' }}>
              <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                📊
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                Learning Tracks
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Structured paths for Data Scientist, ML Engineer, and AI Researcher roles
              </p>
              <div className="mt-4 text-green-600 font-semibold group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                Explore Tracks →
                <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">🌟</span>
              </div>
            </div>

            <div className={`group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 transform ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } hover:-translate-y-2`} style={{ transitionDelay: '1700ms' }}>
              <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                🤖
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                AI Resume Builder
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Optimize your resume for ML roles with keyword analysis and ATS optimization
              </p>
              <div className="mt-4 text-purple-600 font-semibold group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                Build Resume →
                <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">🎯</span>
              </div>
            </div>
          </div>

          {/* CTA Buttons with Text Animations */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 transition-all duration-1000 delay-1900 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <button 
              onClick={handleStartJourney}
              className="group relative bg-gradient-to-r from-blue-400 to-purple-400 text-white px-12 py-5 rounded-2xl hover:shadow-2xl transition-all duration-300 text-xl font-bold transform hover:-translate-y-1 min-w-[240px] text-center"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span className="group-hover:scale-110 transition-transform duration-300">Start ML Journey</span>
                <span className="transform group-hover:rotate-180 transition-transform duration-500">🚀</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <Link 
              href="/auth/login"
              className="group border-2 border-gray-300 text-gray-700 px-12 py-5 rounded-2xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 text-xl font-semibold transform hover:-translate-y-1 min-w-[240px] text-center"
            >
              <span className="flex items-center justify-center space-x-2">
                <span className="group-hover:font-bold transition-all duration-300">Continue Learning</span>
                <span className="transform group-hover:translate-x-2 group-hover:scale-125 transition-transform duration-300">→</span>
              </span>
            </Link>
          </div>

          {/* User Journey Explanation with Text Transitions */}
          <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-gray-200 mb-12 transition-all duration-1000 delay-2100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 animate-pulse">Choose Your Path</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300">
                  <div className="font-semibold text-blue-700 mb-1 flex items-center">
                    <span className="mr-2 group-hover:scale-110 transition-transform">🎯</span>
                    New to MLPrepHub?
                  </div>
                  <p className="group-hover:text-blue-800 transition-colors duration-300">
                    Start with our onboarding to get personalized career recommendations and learning paths.
                  </p>
                </div>
                <div className="text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-300">
                  <div className="font-semibold text-green-700 mb-1 flex items-center">
                    <span className="mr-2 group-hover:scale-110 transition-transform">📈</span>
                    Returning User?
                  </div>
                  <p className="group-hover:text-green-800 transition-colors duration-300">
                    Sign in to continue your progress, access your dashboard, and track your learning.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Early Adopter Callout with Text Animation */}
          <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 max-w-2xl mx-auto border border-blue-200 transition-all duration-1000 delay-2300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 animate-pulse">
                Be Among the First to Master ML Interviews
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {`We're building the most effective platform for ML interview preparation. 
                Join our early community and help us shape the future of tech career preparation.`}
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-blue-600 font-semibold">
                <span className="hover:scale-110 transition-transform duration-300">No commitments</span>
                <span className="animate-ping">•</span>
                <span className="hover:scale-110 transition-transform duration-300">Your feedback matters</span>
              </div>
            </div>
          </div>

          {/* Floating Rocket */}
          <div className="fixed bottom-8 right-8 w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center shadow-lg animate-bounce">
            <span className="text-2xl">🚀</span>
          </div>
        </div>
      </div>
    </div>
  )
}