// app/learn/assessments/technical-interview/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface InterviewQuestion {
  id: number
  type: 'system-design' | 'algorithm' | 'ml-concept' | 'behavioral'
  question: string
  hints: string[]
  evaluationCriteria: string[]
  timeLimit: number // in minutes
}

export default function TechnicalInterview() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [timeLeft, setTimeLeft] = useState<number>(0)
  const [isRecording, setIsRecording] = useState(false)
  const [interviewPhase, setInterviewPhase] = useState<'intro' | 'questions' | 'completion'>('intro')

  const interviewQuestions: InterviewQuestion[] = [
    {
      id: 1,
      type: 'system-design',
      question: "How would you design a recommendation system for an e-commerce platform?",
      hints: [
        "Consider different recommendation approaches (content-based, collaborative filtering)",
        "Think about scalability and real-time requirements",
        "Discuss data storage and processing pipelines",
        "Mention evaluation metrics for recommendation quality"
      ],
      evaluationCriteria: [
        "Understanding of recommendation algorithms",
        "System architecture and scalability",
        "Data pipeline design",
        "Performance considerations"
      ],
      timeLimit: 10
    },
    {
      id: 2,
      type: 'algorithm',
      question: "Given a large dataset, how would you find the top K most frequent items efficiently?",
      hints: [
        "Consider time and space complexity",
        "Discuss trade-offs between different approaches",
        "Think about distributed computing if dataset is too large",
        "Mention data structures like heaps or hash maps"
      ],
      evaluationCriteria: [
        "Algorithm selection and justification",
        "Complexity analysis",
        "Handling edge cases",
        "Scalability considerations"
      ],
      timeLimit: 8
    },
    {
      id: 3,
      type: 'ml-concept',
      question: "Explain the bias-variance tradeoff and how it affects model performance.",
      hints: [
        "Define bias and variance in ML context",
        "Provide examples of high-bias and high-variance models",
        "Discuss regularization techniques",
        "Explain cross-validation's role"
      ],
      evaluationCriteria: [
        "Conceptual understanding",
        "Real-world examples",
        "Solution approaches",
        "Communication clarity"
      ],
      timeLimit: 6
    },
    {
      id: 4,
      type: 'behavioral',
      question: "Describe a time you had to explain a complex technical concept to a non-technical stakeholder.",
      hints: [
        "Use the STAR method (Situation, Task, Action, Result)",
        "Focus on communication strategy",
        "Highlight the outcome and impact",
        "Show empathy and understanding"
      ],
      evaluationCriteria: [
        "Communication effectiveness",
        "Problem-solving approach",
        "Stakeholder management",
        "Results and impact"
      ],
      timeLimit: 5
    }
  ]

  // Timer effect
  useEffect(() => {
    if (interviewPhase === 'questions' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    } else if (timeLeft === 0 && interviewPhase === 'questions') {
      handleNextQuestion()
    }
  }, [timeLeft, interviewPhase])

  const startInterview = () => {
    setInterviewPhase('questions')
    setTimeLeft(interviewQuestions[0].timeLimit * 60)
    setUserAnswers(Array(interviewQuestions.length).fill(''))
  }

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = answer
    setUserAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < interviewQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setTimeLeft(interviewQuestions[currentQuestion + 1].timeLimit * 60)
    } else {
      setInterviewPhase('completion')
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // In a real app, this would connect to browser recording APIs
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  if (interviewPhase === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/learn" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold">
            <span>←</span>
            <span>Back to Learning Hub</span>
          </Link>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 text-center">
            <div className="text-6xl mb-6">🎤</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Technical Interview Simulation
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Practice real technical interview questions with time limits and recording
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-2xl p-6 text-left">
                <h3 className="font-semibold text-blue-900 mb-3">📋 Interview Structure</h3>
                <ul className="text-blue-800 space-y-2">
                  <li>• 4 technical questions</li>
                  <li>• Time-limited responses</li>
                  <li>• Voice recording capability</li>
                  <li>• Real-time evaluation criteria</li>
                </ul>
              </div>
              <div className="bg-green-50 rounded-2xl p-6 text-left">
                <h3 className="font-semibold text-green-900 mb-3">{`🎯 What You'll Practice`}</h3>
                <ul className="text-green-800 space-y-2">
                  <li>• System design thinking</li>
                  <li>• Algorithm problem-solving</li>
                  <li>• ML concept explanation</li>
                  <li>• Behavioral responses</li>
                </ul>
              </div>
            </div>

            <button
              onClick={startInterview}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
            >
              Start Interview Simulation
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (interviewPhase === 'completion') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/learn" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold">
            <span>←</span>
            <span>Back to Learning Hub</span>
          </Link>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Interview Complete!
              </h1>
              <p className="text-xl text-gray-600">Great job completing the technical interview simulation</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-2xl p-6 text-center border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">{interviewQuestions.length}</div>
                <div className="text-blue-700 font-semibold">Questions Answered</div>
              </div>
              <div className="bg-green-50 rounded-2xl p-6 text-center border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-2">{isRecording ? 'Recorded' : 'Practice'}</div>
                <div className="text-green-700 font-semibold">Session Type</div>
              </div>
              <div className="bg-purple-50 rounded-2xl p-6 text-center border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">Self</div>
                <div className="text-purple-700 font-semibold">Evaluation</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Review your answers and consider recording yourself to practice communication skills.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/learn/assessments"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  Back to Assessments
                </Link>
                <button 
                  onClick={() => {
                    setInterviewPhase('intro')
                    setCurrentQuestion(0)
                    setUserAnswers([])
                  }}
                  className="border-2 border-blue-500 text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-50 transition-all font-semibold"
                >
                  Practice Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = interviewQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/learn" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold">
          <span>←</span>
          <span>Back to Learning Hub</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Question & Timer */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 mb-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      currentQ.type === 'system-design' ? 'bg-purple-100 text-purple-800' :
                      currentQ.type === 'algorithm' ? 'bg-blue-100 text-blue-800' :
                      currentQ.type === 'ml-concept' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {currentQ.type.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Question {currentQuestion + 1}/{interviewQuestions.length}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">{currentQ.question}</h1>
                </div>
                <div className="bg-red-50 px-4 py-2 rounded-xl text-center">
                  <div className="text-sm text-red-600">Time Remaining</div>
                  <div className="text-2xl font-bold text-red-700">{formatTime(timeLeft)}</div>
                </div>
              </div>

              {/* Answer Area */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Your Response (Type or speak your answer):
                </label>
                <textarea
                  value={userAnswers[currentQuestion]}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="w-full h-48 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your answer here... You can also practice speaking your answer out loud."
                />
              </div>

              {/* Recording Controls */}
              <div className="flex items-center justify-between">
                <button
                  onClick={toggleRecording}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold ${
                    isRecording 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  } transition`}
                >
                  <span>●</span>
                  <span>{isRecording ? 'Stop Recording' : 'Start Recording'}</span>
                </button>

                <button
                  onClick={handleNextQuestion}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition font-semibold"
                >
                  {currentQuestion === interviewQuestions.length - 1 ? 'Complete Interview' : 'Next Question'}
                </button>
              </div>
            </div>
          </div>

          {/* Hints & Evaluation */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Thinking Hints</h3>
              <ul className="space-y-2">
                {currentQ.hints.map((hint, index) => (
                  <li key={index} className="text-gray-700 text-sm flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {hint}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Evaluation Criteria</h3>
              <ul className="space-y-2">
                {currentQ.evaluationCriteria.map((criterion, index) => (
                  <li key={index} className="text-gray-700 text-sm flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    {criterion}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-3xl p-6 border border-yellow-200">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">🎯 Pro Tips</h3>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Think out loud - explain your thought process</li>
                <li>• Ask clarifying questions if needed</li>
                <li>• Consider edge cases and scalability</li>
                <li>• Practice time management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}