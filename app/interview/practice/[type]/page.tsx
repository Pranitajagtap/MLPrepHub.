'use client'

import { useState, use } from 'react'

export default function InterviewPractice({ params }: { params: Promise<{ type: string }> }) {
  // Unwrap the params promise
  const resolvedParams = use(params)
  const { type } = resolvedParams
  
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)

  const getInterviewData = (type: string) => {
    const data = {
      technical: {
        title: 'Technical Interview Practice',
        questions: [
          {
            question: "Explain the concept of closures in JavaScript with an example.",
            category: "JavaScript Fundamentals",
            difficulty: "Medium"
          },
          {
            question: "What is the difference between let, const, and var in JavaScript?",
            category: "JavaScript",
            difficulty: "Easy"
          },
          {
            question: "How would you optimize a slow React component?",
            category: "React",
            difficulty: "Hard"
          }
        ]
      },
      hr: {
        title: 'HR Interview Practice', 
        questions: [
          {
            question: "Tell me about yourself and your career journey.",
            category: "Introduction",
            difficulty: "Easy"
          },
          {
            question: "Describe a challenging project and how you handled it.",
            category: "Behavioral",
            difficulty: "Medium"
          },
          {
            question: "Where do you see yourself in 5 years?",
            category: "Career Goals",
            difficulty: "Easy"
          }
        ]
      },
      'system-design': {
        title: 'System Design Practice',
        questions: [
          {
            question: "Design a URL shortening service like TinyURL.",
            category: "System Design",
            difficulty: "Medium"
          },
          {
            question: "How would you design Twitter's feed system?",
            category: "System Design", 
            difficulty: "Hard"
          }
        ]
      }
    }

    return data[type as keyof typeof data] || data.technical
  }

  const interviewData = getInterviewData(type)
  const question = interviewData.questions[currentQuestion]

  const handleNext = () => {
    if (currentQuestion < interviewData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setUserAnswer('')
      setShowFeedback(false)
    } else {
      // End of practice
      alert('Practice session completed! Great job!')
    }
  }

  const getAIFeedback = () => {
    // Simulated AI feedback
    return "Good explanation! You covered the main points about closures. Consider mentioning practical use cases like data encapsulation and callback functions. Also, you could discuss memory management implications."
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{interviewData.title}</h1>
              <p className="text-gray-600 mt-2">
                Question {currentQuestion + 1} of {interviewData.questions.length}
              </p>
            </div>
            <div className="flex space-x-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {question.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {question.difficulty}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / interviewData.questions.length) * 100}%` }}
              ></div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-6">{question.question}</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Your Answer {!showFeedback && '(Type your response below)'}
              </label>
              {!showFeedback ? (
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Type your answer here... Think step by step and explain your reasoning."
                />
              ) : (
                <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                  <p className="text-gray-700 whitespace-pre-wrap">{userAnswer}</p>
                </div>
              )}
            </div>

            {showFeedback && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">🤖 AI Feedback</h3>
                <p className="text-blue-800">{getAIFeedback()}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 disabled:bg-gray-300 transition"
            >
              Previous
            </button>

            {!showFeedback ? (
              <button
                onClick={() => setShowFeedback(true)}
                disabled={!userAnswer.trim()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 transition"
              >
                Get AI Feedback
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
              >
                {currentQuestion === interviewData.questions.length - 1 ? 'Finish' : 'Next Question'}
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Tips for {type.charAt(0).toUpperCase() + type.slice(1)} Interviews</h3>
          <ul className="space-y-2 text-gray-600">
            {type === 'technical' && (
              <>
                <li>• Explain your thought process out loud</li>
                <li>• Start with a brute force solution, then optimize</li>
                <li>• Consider edge cases and test your solution</li>
                <li>• Ask clarifying questions about requirements</li>
              </>
            )}
            {type === 'hr' && (
              <>
                <li>• Use the STAR method (Situation, Task, Action, Result)</li>
                <li>• Be authentic and show enthusiasm</li>
                <li>• Research the company beforehand</li>
                <li>• Prepare questions to ask the interviewer</li>
              </>
            )}
            {type === 'system-design' && (
              <>
                <li>• Start with requirements clarification</li>
                <li>• Outline high-level architecture first</li>
                <li>• Consider scalability, reliability, and maintenance</li>
                <li>• Discuss trade-offs for your design choices</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}