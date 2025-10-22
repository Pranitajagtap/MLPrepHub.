'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Assessment data
const assessmentData = {
  'ml-fundamentals': {
    title: 'ML Fundamentals Assessment',
    description: 'Test your understanding of core machine learning concepts',
    questions: [
      {
        question: "What is the primary difference between supervised and unsupervised learning?",
        options: [
          "Supervised learning uses labeled data, unsupervised learning uses unlabeled data",
          "Supervised learning is faster than unsupervised learning", 
          "Unsupervised learning requires more computational resources",
          "Supervised learning is used only for classification tasks"
        ],
        correct: 0,
        explanation: "Supervised learning uses labeled datasets to train algorithms, while unsupervised learning finds patterns in unlabeled data."
      },
      // Add more questions...
    ]
  },
  'mcq-assessment': {
    title: 'MCQ Technical Assessment',
    description: 'Multiple choice questions covering ML concepts and aptitude',
    questions: [
      // MCQ questions...
    ]
  }
  // Add other assessments...
}

interface AssessmentPageProps {
  params: Promise<{ id: string }>
}

export default function AssessmentPage({ params }: AssessmentPageProps) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60 * 60) // 60 minutes in seconds

  // Resolve the params promise
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params
      setResolvedParams(resolved)
    }
    resolveParams()
  }, [params])

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Show loading while params are being resolved
  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading assessment...</p>
          </div>
        </div>
      </div>
    )
  }

  const assessment = assessmentData[resolvedParams.id as keyof typeof assessmentData] || {
    title: 'Assessment Not Found',
    description: 'The requested assessment could not be found.',
    questions: []
  }

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (currentQuestion < assessment.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    const correctAnswers = answers.filter((answer, index) => answer === assessment.questions[index].correct)
    return Math.round((correctAnswers.length / assessment.questions.length) * 100)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  if (showResults) {
    const score = calculateScore()
    
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-green-50 to-emerald-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/learn"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold"
          >
            <span>←</span>
            <span>Back to Learning Hub</span>
          </Link>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Assessment Complete!
              </h1>
              <p className="text-xl text-gray-600">{`You've completed the ${assessment.title}`}</p>
            </div>

            <div className="bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center mb-8">
              <div className="text-6xl font-bold mb-2">{score}%</div>
              <div className="text-2xl opacity-90">Overall Score</div>
              <div className="mt-4 text-lg">
                {score >= 80 ? 'Excellent! 🏆' : score >= 60 ? 'Good Job! 👍' : 'Keep Practicing! 💪'}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={() => window.location.reload()}
                className="bg-linear-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Retake Assessment
              </button>
              <Link 
                href="/learn"
                className="block bg-white border-2 border-blue-500 text-blue-600 text-center py-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Back to Learning Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const question = assessment.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / assessment.questions.length) * 100

  if (!question) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Assessment Not Found</h1>
          <Link 
            href="/learn"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Return to Learning Hub
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/learn"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold"
        >
          <span>←</span>
          <span>Back to Learning Hub</span>
        </Link>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{assessment.title}</h1>
              <p className="text-gray-600">{assessment.description}</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="bg-red-50 px-4 py-2 rounded-xl">
                <div className="text-sm text-red-600">Time Remaining</div>
                <div className="font-bold text-gray-900">{formatTime(timeLeft)}</div>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-xl">
                <div className="text-sm text-blue-600">Question</div>
                <div className="font-bold text-gray-900">{currentQuestion + 1}/{assessment.questions.length}</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Assessment Progress</span>
              <span className="font-semibold text-gray-900">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-linear-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-100">
              <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                {question.question}
              </h2>
            </div>
            
            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-6 bg-white border-2 border-gray-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50 hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center mr-4 transition-colors">
                      <span className="text-gray-600 group-hover:text-blue-600 font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>
                    </div>
                    <span className="text-gray-700 group-hover:text-gray-900 text-lg">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-full border border-yellow-200">
              <span className="text-yellow-600">💡</span>
              <span className="text-yellow-700 text-sm">Take your time and choose the best answer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}