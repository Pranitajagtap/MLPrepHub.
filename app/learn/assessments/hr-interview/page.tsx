// app/learn/assessments/hr-interview/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'

interface HRQuestion {
  id: number
  category: 'behavioral' | 'situational' | 'motivational' | 'cultural'
  question: string
  tips: string[]
  starMethod: {
    situation: string
    task: string
    action: string
    result: string
  }
}

export default function HRInterview() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState<string[]>([])
  const [showTips, setShowTips] = useState(false)
  const [interviewCompleted, setInterviewCompleted] = useState(false)

  const hrQuestions: HRQuestion[] = [
    {
      id: 1,
      category: 'behavioral',
      question: "Tell me about a time you faced a significant challenge in a project and how you overcame it.",
      tips: [
        "Choose a relevant technical or teamwork challenge",
        "Focus on your problem-solving process",
        "Highlight what you learned from the experience",
        "Be specific about your role and contributions"
      ],
      starMethod: {
        situation: "Describe the context and the challenge you faced",
        task: "Explain your specific responsibilities and goals",
        action: "Detail the steps you took to address the challenge",
        result: "Share the outcomes and what you learned"
      }
    },
    {
      id: 2,
      category: 'situational',
      question: "How would you handle a situation where you disagree with your manager's technical decision?",
      tips: [
        "Show respect for authority while standing by your expertise",
        "Emphasize data-driven discussions",
        "Focus on shared goals and project success",
        "Demonstrate professional communication skills"
      ],
      starMethod: {
        situation: "Set up a hypothetical scenario",
        task: "Explain your understanding of the disagreement",
        action: "Describe your approach to resolving it professionally",
        result: "Share the ideal outcome and learning"
      }
    },
    {
      id: 3,
      category: 'motivational',
      question: "Why are you interested in working in machine learning, and what keeps you motivated?",
      tips: [
        "Share personal passion and interests",
        "Connect to real-world impact",
        "Mention continuous learning aspects",
        "Align with company's mission if possible"
      ],
      starMethod: {
        situation: "Describe what initially attracted you to ML",
        task: "Explain your learning journey and goals",
        action: "Detail how you stay updated and motivated",
        result: "Share your vision for future contributions"
      }
    },
    {
      id: 4,
      category: 'cultural',
      question: "Describe your ideal work environment and how you collaborate with team members.",
      tips: [
        "Be honest but adaptable",
        "Show appreciation for teamwork",
        "Mention learning from others",
        "Highlight communication preferences"
      ],
      starMethod: {
        situation: "Describe past positive work environments",
        task: "Explain your role in team collaborations",
        action: "Detail your communication and work style",
        result: "Share successful collaboration outcomes"
      }
    },
    {
      id: 5,
      category: 'behavioral',
      question: "Tell me about a time you had to learn a new technology or skill quickly for a project.",
      tips: [
        "Choose a relevant technical example",
        "Show your learning methodology",
        "Highlight quick application of learning",
        "Mention how it benefited the project"
      ],
      starMethod: {
        situation: "Describe the project requirement and timeline",
        task: "Explain the specific skill/technology needed",
        action: "Detail your learning approach and resources",
        result: "Share how it impacted the project success"
      }
    }
  ]

  const handleAnswerChange = (answer: string) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentQuestion] = answer
    setUserAnswers(newAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestion < hrQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setShowTips(false)
    } else {
      setInterviewCompleted(true)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      setShowTips(false)
    }
  }

  const currentQ = hrQuestions[currentQuestion]

  if (interviewCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/learn" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold">
            <span>←</span>
            <span>Back to Learning Hub</span>
          </Link>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              HR Practice Complete!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Great job practicing your behavioral interview responses
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-2xl p-6 text-center border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">{hrQuestions.length}</div>
                <div className="text-blue-700 font-semibold">Questions Practiced</div>
              </div>
              <div className="bg-green-50 rounded-2xl p-6 text-center border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-2">{userAnswers.filter(a => a.trim().length > 0).length}</div>
                <div className="text-green-700 font-semibold">Answers Provided</div>
              </div>
              <div className="bg-purple-50 rounded-2xl p-6 text-center border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">STAR</div>
                <div className="text-purple-700 font-semibold">Method Used</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Review your answers and consider practicing aloud to improve your delivery.
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
                    setInterviewCompleted(false)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/learn" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold">
          <span>←</span>
          <span>Back to Learning Hub</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Question Area */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      currentQ.category === 'behavioral' ? 'bg-purple-100 text-purple-800' :
                      currentQ.category === 'situational' ? 'bg-blue-100 text-blue-800' :
                      currentQ.category === 'motivational' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {currentQ.category.toUpperCase()}
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Question {currentQuestion + 1}/{hrQuestions.length}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">{currentQ.question}</h1>
                </div>
              </div>

              {/* Answer Area */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Practice your response (use the STAR method):
                </label>
                <textarea
                  value={userAnswers[currentQuestion] || ''}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="w-full h-64 p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your response here. Remember to structure it using the STAR method..."
                />
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="bg-gray-500 text-white px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition font-semibold"
                >
                  Previous
                </button>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowTips(!showTips)}
                    className="bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-600 transition font-semibold"
                  >
                    {showTips ? 'Hide Tips' : 'Show Tips'}
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition font-semibold"
                  >
                    {currentQuestion === hrQuestions.length - 1 ? 'Complete' : 'Next'}
                  </button>
                </div>
              </div>
            </div>

            {/* Tips Section */}
            {showTips && (
              <div className="bg-yellow-50 rounded-3xl shadow-xl p-6 border border-yellow-200">
                <h3 className="text-lg font-bold text-yellow-800 mb-4">💡 Answering Tips</h3>
                <ul className="space-y-2">
                  {currentQ.tips.map((tip, index) => (
                    <li key={index} className="text-yellow-700 flex items-start">
                      <span className="text-yellow-600 mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* STAR Method Guide */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-gray-900 mb-4">⭐ STAR Method Guide</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-2">S - Situation</h4>
                  <p className="text-blue-800 text-sm">{currentQ.starMethod.situation}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-2">T - Task</h4>
                  <p className="text-green-800 text-sm">{currentQ.starMethod.task}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                  <h4 className="font-semibold text-purple-900 mb-2">A - Action</h4>
                  <p className="text-purple-800 text-sm">{currentQ.starMethod.action}</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                  <h4 className="font-semibold text-orange-900 mb-2">R - Result</h4>
                  <p className="text-orange-800 text-sm">{currentQ.starMethod.result}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">🎯 HR Interview Tips</h3>
              <ul className="space-y-2 text-white/90 text-sm">
                <li>• Be authentic and genuine</li>
                <li>• Use specific examples</li>
                <li>• Focus on your contributions</li>
                <li>• Show enthusiasm and positivity</li>
                <li>• Practice active listening</li>
                <li>• Prepare thoughtful questions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}