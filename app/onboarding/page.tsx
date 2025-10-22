// app/onboarding/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const interests = [
  'Working with data and analytics',
  'Creating AI and machine learning models', 
  'Building predictive models',
  'Data visualization and storytelling',
  'Natural language processing',
  'Computer vision and image recognition',
  'Deep learning and neural networks',
  'Statistical analysis and modeling',
  'Big data and distributed systems',
  'ML model deployment and serving',
  'Research and experimentation',
  'Optimizing algorithms for performance'
]

const mlCareers = [
  {
    title: 'Machine Learning Engineer',
    description: 'Design, build, and deploy ML models and systems at scale',
    demand: 'Very High',
    salary: '₹8-25L for freshers',
    skills: ['Python', 'TensorFlow', 'MLOps', 'Deep Learning'],
    matches: ['Creating AI and machine learning models', 'Building predictive models', 'ML model deployment and serving', 'Optimizing algorithms for performance']
  },
  {
    title: 'Data Scientist',
    description: 'Extract insights from data and build predictive models for business decisions',
    demand: 'High',
    salary: '₹6-20L for freshers', 
    skills: ['Python', 'Statistics', 'SQL', 'Data Analysis'],
    matches: ['Working with data and analytics', 'Statistical analysis and modeling', 'Data visualization and storytelling', 'Building predictive models']
  },
  {
    title: 'AI Research Scientist',
    description: 'Push the boundaries of AI through research and development of new algorithms',
    demand: 'High',
    salary: '₹10-30L for freshers',
    skills: ['Research', 'Mathematics', 'PyTorch', 'Publications'],
    matches: ['Research and experimentation', 'Deep learning and neural networks', 'Creating AI and machine learning models']
  },
  {
    title: 'MLOps Engineer',
    description: 'Build and maintain ML infrastructure for model deployment and monitoring',
    demand: 'Very High',
    salary: '₹7-22L for freshers',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms'],
    matches: ['ML model deployment and serving', 'Big data and distributed systems', 'Optimizing algorithms for performance']
  },
  {
    title: 'Data Engineer',
    description: 'Build data pipelines and infrastructure to support ML systems',
    demand: 'High',
    salary: '₹5-18L for freshers',
    skills: ['SQL', 'Spark', 'Data Pipelines', 'ETL'],
    matches: ['Big data and distributed systems', 'Working with data and analytics', 'ML model deployment and serving']
  },
  {
    title: 'Computer Vision Engineer',
    description: 'Develop algorithms for image and video analysis and understanding',
    demand: 'High',
    salary: '₹8-24L for freshers',
    skills: ['OpenCV', 'CNN', 'Image Processing', 'Deep Learning'],
    matches: ['Computer vision and image recognition', 'Deep learning and neural networks', 'Creating AI and machine learning models']
  },
  {
    title: 'NLP Engineer',
    description: 'Build systems that understand and generate human language',
    demand: 'High',
    salary: '₹7-22L for freshers',
    skills: ['Transformers', 'NLP', 'Language Models', 'Text Mining'],
    matches: ['Natural language processing', 'Deep learning and neural networks', 'Creating AI and machine learning models']
  }
]

export default function Onboarding() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [isGuest, setIsGuest] = useState(false)
  const router = useRouter()

  useEffect(() => {
    console.log('🎯 Onboarding: Component mounted')
    
    // Check if user is authenticated or guest
    const checkAuth = async () => {
      try {
        const userData = localStorage.getItem('user')
        
        if (!userData) {
          console.log('👤 Onboarding: No user found - Guest mode')
          setIsGuest(true)
          setIsLoading(false)
          return
        }

        const user = JSON.parse(userData)
        console.log('✅ Onboarding: User found:', user.email)

        // Check if user already completed onboarding
        if (user.hasCompletedOnboarding) {
          console.log('ℹ️ Onboarding: User already completed onboarding, redirecting to dashboard')
          router.push('/dashboard')
          return
        }

        console.log('🔄 Onboarding: User needs to complete onboarding')
        setIsGuest(false)
        setIsLoading(false)
      } catch (error) {
        console.error('❌ Onboarding: Error checking auth:', error)
        // If error, treat as guest
        setIsGuest(true)
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    )
  }

  // Calculate matching careers based on selected interests
  const getMatchingCareers = () => {
    const careerScores = mlCareers.map(career => {
      const matchCount = career.matches.filter(match => 
        selectedInterests.includes(match)
      ).length
      return { ...career, score: matchCount }
    })

    // Filter careers that have at least one match and sort by match score
    const matchingCareers = careerScores
      .filter(career => career.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)

    // If no matches found, show top 3 popular careers
    if (matchingCareers.length === 0) {
      return mlCareers.slice(0, 3).map(career => ({ ...career, score: 0 }))
    }

    return matchingCareers
  }

  const handleGuestContinue = () => {
    // Save guest progress and redirect to register
    const guestOnboardingData = {
      selectedInterests,
      matchingCareers: getMatchingCareers(),
      completedAt: new Date().toISOString()
    }
    localStorage.setItem('guestOnboarding', JSON.stringify(guestOnboardingData))
    console.log('✅ Onboarding: Guest data saved, redirecting to register')
    router.push('/auth/register?from=onboarding')
  }

  const handleCompleteOnboarding = async () => {
    try {
      console.log('🚀 Onboarding: Completing onboarding...')
      
      // Get current user
      const userData = localStorage.getItem('user')
      if (!userData) {
        throw new Error('No user data found')
      }

      const user = JSON.parse(userData)
      
      // Update user onboarding status
      const updatedUser = {
        ...user,
        hasCompletedOnboarding: true,
        interests: selectedInterests,
        targetRole: getMatchingCareers()[0]?.title || 'ML Student',
        updatedAt: new Date().toISOString()
      }

      // Save updated user to localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser))

      // Trigger auth event to update FloatingProfile
      window.dispatchEvent(new CustomEvent('authChange', { 
        detail: { user: updatedUser, action: 'login' } 
      }))

      console.log('✅ Onboarding: Onboarding completed, redirecting to dashboard')
      router.push('/dashboard')
      
    } catch (error) {
      console.error('❌ Onboarding: Error completing onboarding:', error)
      // Still redirect to dashboard even if there's an error
      router.push('/dashboard')
    }
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your onboarding...</p>
        </div>
      </div>
    )
  }

  if (currentStep === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-8 mx-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Welcome! Let's personalize your journey
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              Select 2-3 areas that interest you most. We'll suggest the best ML career paths for you.
            </p>
            
            {isGuest ? (
              <div className="mt-4 p-4 bg-linear-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg max-w-2xl mx-auto">
                <p className="text-yellow-800 text-sm">
                  💡 <strong>Guest Mode:</strong> Your selections will be saved and transferred to your account after registration.
                </p>
              </div>
            ) : (
              <div className="mt-4 p-4 bg-linear-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg max-w-2xl mx-auto">
                <p className="text-blue-800 text-sm">
                  ✅ <strong>Welcome back!</strong> Complete your onboarding to unlock all features.
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8">
            {interests.map((interest, index) => (
              <button
                key={index}
                onClick={() => toggleInterest(interest)}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                  selectedInterests.includes(interest)
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    selectedInterests.includes(interest)
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedInterests.includes(interest) && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>
                  <span className="text-sm md:text-base">{interest}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setCurrentStep(2)}
              disabled={selectedInterests.length === 0}
              className="bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-base md:text-lg w-full md:w-auto"
            >
              {selectedInterests.length > 0 ? (
                `Discover Your ML Path (${selectedInterests.length} selected) →`
              ) : (
                'Select interests to continue'
              )}
            </button>
            
            {selectedInterests.length > 0 && (
              <p className="text-green-600 text-sm mt-3">
                Great! {selectedInterests.length} interest{selectedInterests.length > 1 ? 's' : ''} selected
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }

  const matchingCareers = getMatchingCareers()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6 md:p-8 mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚀</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Your Personalized ML Career Matches
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Based on your interests in: 
          </p>
          <p className="text-blue-600 font-semibold text-base md:text-lg mb-6">
            {selectedInterests.join(', ')}
          </p>
        </div>

        <div className="space-y-4 md:space-y-6 mb-8">
          {matchingCareers.map((career, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-xl p-4 md:p-6 hover:border-blue-400 hover:shadow-lg transition-all duration-200 bg-white"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3 gap-2">
                <h3 className="font-bold text-lg md:text-xl text-blue-600">
                  {career.title}
                </h3>
                {career.score > 0 && (
                  <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium self-start">
                    {career.score} match{career.score > 1 ? 'es' : ''}
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed">{career.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {career.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="bg-gray-100 text-gray-700 px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm font-medium border border-gray-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pt-3 border-t border-gray-100">
                <span className={`text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full ${
                  career.demand === 'Very High' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {career.demand} Demand
                </span>
                <span className="text-xs md:text-sm text-gray-600 font-semibold bg-gray-100 px-2 md:px-3 py-1 rounded-full">
                  {career.salary}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center space-y-4">
          {isGuest ? (
            <div className="bg-linear-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
              <p className="text-green-700 text-sm font-semibold">
                ✅ Your career matches are ready! 
              </p>
              <p className="text-green-600 text-xs mt-1">
                Create an account to save your progress and get personalized learning paths
              </p>
            </div>
          ) : (
            <div className="bg-linear-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
              <p className="text-blue-700 text-sm font-semibold">
                🎉 Your personalized career path is ready! 
              </p>
              <p className="text-blue-600 text-xs mt-1">
                Complete onboarding to start your learning journey
              </p>
            </div>
          )}

          <div className="space-y-3">
            {isGuest ? (
              <>
                <button
                  onClick={handleGuestContinue}
                  className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-base md:text-lg"
                >
                  <span className="flex items-center justify-center">
                    Create Account & Continue →
                  </span>
                </button>
                
                <button
                  onClick={() => router.push('/auth/login')}
                  className="w-full border-2 border-gray-300 text-gray-700 px-6 md:px-8 py-3 md:py-4 rounded-xl hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-semibold text-base"
                >
                  Already have an account? Sign In
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleCompleteOnboarding}
                  className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold text-base md:text-lg"
                >
                  <span className="flex items-center justify-center">
                    Complete Onboarding & Start Learning →
                  </span>
                </button>
                
                <button
                  onClick={() => setCurrentStep(1)}
                  className="w-full border-2 border-gray-300 text-gray-700 px-6 md:px-8 py-3 md:py-4 rounded-xl hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-semibold text-base"
                >
                  ← Back to Interests
                </button>
              </>
            )}
          </div>

          {isGuest && (
            <p className="text-xs text-gray-400 pt-2">
              Your selections will be automatically transferred to your new account
            </p>
          )}
        </div>
      </div>
    </div>
  )
}