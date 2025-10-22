// app/learn/assessments/mcq-assessment/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Comprehensive MCQ questions based on your syllabus
const mcqQuestions = [
  // Part 1: Machine Learning (Technical) - 20 questions
  {
    id: 1,
    category: 'ml-fundamentals',
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
  {
    id: 2,
    category: 'ml-fundamentals',
    question: "Which of the following is NOT a type of machine learning?",
    options: [
      "Supervised Learning",
      "Unsupervised Learning", 
      "Reinforcement Learning",
      "Automated Learning"
    ],
    correct: 3,
    explanation: "The three main types are Supervised, Unsupervised, and Reinforcement Learning. Automated Learning is not a standard category."
  },
  {
    id: 3,
    category: 'ml-fundamentals',
    question: "What is the main purpose of Linear Regression?",
    options: [
      "Classification of data into categories",
      "Predicting continuous values", 
      "Clustering similar data points",
      "Reducing dimensionality"
    ],
    correct: 1,
    explanation: "Linear Regression is used for predicting continuous numerical values based on input features."
  },
  {
    id: 4,
    category: 'ml-fundamentals',
    question: "In Logistic Regression, the output represents:",
    options: [
      "A continuous value",
      "A probability between 0 and 1", 
      "A categorical label directly",
      "A distance metric"
    ],
    correct: 1,
    explanation: "Logistic Regression outputs probabilities that are then thresholded to make classification decisions."
  },
  {
    id: 5,
    category: 'statistics',
    question: "Which metric is most affected by outliers?",
    options: [
      "Mean",
      "Median", 
      "Mode",
      "All are equally affected"
    ],
    correct: 0,
    explanation: "The mean is highly sensitive to outliers because it considers all values in calculation."
  },
  {
    id: 6,
    category: 'statistics',
    question: "What does a high variance in data indicate?",
    options: [
      "Data points are close to the mean",
      "Data points are spread out from the mean", 
      "The data is normally distributed",
      "The data has no outliers"
    ],
    correct: 1,
    explanation: "High variance means data points are widely spread out from the mean value."
  },
  {
    id: 7,
    category: 'python',
    question: "Which Python library is primarily used for numerical computations?",
    options: [
      "Pandas",
      "NumPy", 
      "Scikit-learn",
      "Matplotlib"
    ],
    correct: 1,
    explanation: "NumPy is designed for efficient numerical computations and array operations."
  },
  {
    id: 8,
    category: 'python',
    question: "What is the output of: [x**2 for x in range(5) if x % 2 == 0]?",
    options: [
      "[0, 4, 16]",
      "[0, 1, 4, 9, 16]", 
      "[0, 4]",
      "[1, 9]"
    ],
    correct: 2,
    explanation: "The list comprehension squares even numbers from 0 to 4: 0^2=0, 2^2=4, 4^2=16"
  },
  {
    id: 9,
    category: 'sql',
    question: "What is the main purpose of the GROUP BY clause in SQL?",
    options: [
      "To filter rows based on conditions",
      "To sort the result set", 
      "To group rows that have the same values",
      "To join multiple tables"
    ],
    correct: 2,
    explanation: "GROUP BY groups rows that have the same values in specified columns, typically used with aggregate functions."
  },
  {
    id: 10,
    category: 'sql',
    question: "Which SQL join returns all records when there is a match in either left or right table?",
    options: [
      "INNER JOIN",
      "LEFT JOIN", 
      "RIGHT JOIN",
      "FULL OUTER JOIN"
    ],
    correct: 3,
    explanation: "FULL OUTER JOIN returns all records when there is a match in either left or right table records."
  },
  {
    id: 11,
    category: 'excel',
    question: "In Excel, what does the VLOOKUP function do?",
    options: [
      "Looks up values vertically in a column",
      "Looks up values horizontally in a row", 
      "Creates a pivot table",
      "Filters data based on conditions"
    ],
    correct: 0,
    explanation: "VLOOKUP searches for a value in the first column of a range and returns a value in the same row from a specified column."
  },
  {
    id: 12,
    category: 'excel',
    question: "What is the primary use of Pivot Tables in Excel?",
    options: [
      "Performing complex mathematical calculations",
      "Creating charts and graphs", 
      "Summarizing and analyzing large datasets",
      "Formatting cells based on conditions"
    ],
    correct: 2,
    explanation: "Pivot Tables are used to summarize, analyze, explore, and present summary data from large datasets."
  },

  // Part 2: Aptitude - 30 questions
  // Quantitative Aptitude
  {
    id: 13,
    category: 'quantitative',
    question: "If a product is sold for ₹840 at a profit of 20%, what was its cost price?",
    options: [
      "₹700",
      "₹800", 
      "₹750",
      "₹680"
    ],
    correct: 0,
    explanation: "Cost Price = Selling Price / (1 + Profit%) = 840 / 1.20 = ₹700"
  },
  {
    id: 14,
    category: 'quantitative',
    question: "The ratio of boys to girls in a class is 3:2. If there are 15 boys, how many girls are there?",
    options: [
      "10",
      "12", 
      "8",
      "9"
    ],
    correct: 0,
    explanation: "Boys:Girls = 3:2, so if 3 parts = 15, then 1 part = 5, so girls = 2 parts = 10"
  },
  // Add more questions following the same pattern...
  // I'll add a few more samples and you can expand to 50

  {
    id: 15,
    category: 'quantitative',
    question: "A train covers 120 km in 2 hours. What is its speed in m/s?",
    options: [
      "16.67 m/s",
      "20 m/s", 
      "25 m/s",
      "30 m/s"
    ],
    correct: 0,
    explanation: "Speed = 120 km/2h = 60 km/h = 60 × (1000/3600) = 16.67 m/s"
  },
  {
    id: 16,
    category: 'quantitative',
    question: "What is the probability of getting a prime number when a die is rolled?",
    options: [
      "1/2",
      "1/3", 
      "1/4",
      "2/3"
    ],
    correct: 0,
    explanation: "Prime numbers on a die: 2, 3, 5 → 3 favorable outcomes out of 6 total = 3/6 = 1/2"
  },

  // Logical Reasoning
  {
    id: 17,
    category: 'logical',
    question: "If 'CODE' is written as 'DPEF', how is 'BOOK' written?",
    options: [
      "CPPL",
      "CPQM", 
      "CPQN",
      "CPQL"
    ],
    correct: 0,
    explanation: "Each letter moves one step forward: C→D, O→P, D→E, E→F. Similarly, B→C, O→P, O→P, K→L"
  },
  {
    id: 18,
    category: 'logical',
    question: "A is B's sister. C is B's mother. D is C's father. How is A related to D?",
    options: [
      "Granddaughter",
      "Daughter", 
      "Sister",
      "Niece"
    ],
    correct: 0,
    explanation: "D is C's father, C is A's mother, so D is A's grandfather, making A D's granddaughter."
  },

  // Verbal Ability
  {
    id: 19,
    category: 'verbal',
    question: "Choose the synonym of 'BENEVOLENT':",
    options: [
      "Kind",
      "Cruel", 
      "Selfish",
      "Greedy"
    ],
    correct: 0,
    explanation: "Benevolent means well-meaning and kindly, so the synonym is 'Kind'."
  },
  {
    id: 20,
    category: 'verbal',
    question: "Identify the error: 'Neither of the students have completed their assignment.'",
    options: [
      "Neither of the students",
      "have completed", 
      "their assignment",
      "No error"
    ],
    correct: 1,
    explanation: "With 'neither', we use singular verb 'has' instead of 'have'."
  }
]

interface MCQAssessmentProps {
  params: Promise<{ id: string }>
}

export default function MCQAssessment({ params }: MCQAssessmentProps) {
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

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (currentQuestion < mcqQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    const correctAnswers = answers.filter((answer, index) => answer === mcqQuestions[index].correct)
    return Math.round((correctAnswers.length / mcqQuestions.length) * 100)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  if (showResults) {
    const score = calculateScore()
    const correctCount = answers.filter((answer, index) => answer === mcqQuestions[index].correct).length
    
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-green-50 to-emerald-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/learn" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold">
            <span>←</span>
            <span>Back to Learning Hub</span>
          </Link>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Assessment Complete!
              </h1>
              <p className="text-xl text-gray-600">{`You've completed the MCQ Technical & Aptitude Assessment`}</p>
            </div>

            {/* Score Display */}
            <div className="bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center mb-8">
              <div className="text-6xl font-bold mb-2">{score}%</div>
              <div className="text-2xl opacity-90">Overall Score</div>
              <div className="mt-4 text-lg">
                {score >= 80 ? 'Excellent! 🏆' : score >= 60 ? 'Good Job! 👍' : 'Keep Practicing! 💪'}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 rounded-2xl p-6 text-center border border-green-100">
                <div className="text-3xl font-bold text-green-600 mb-2">{correctCount}</div>
                <div className="text-green-700 font-semibold">Correct Answers</div>
              </div>
              <div className="bg-blue-50 rounded-2xl p-6 text-center border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">{mcqQuestions.length - correctCount}</div>
                <div className="text-blue-700 font-semibold">Incorrect Answers</div>
              </div>
              <div className="bg-purple-50 rounded-2xl p-6 text-center border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">{mcqQuestions.length}</div>
                <div className="text-purple-700 font-semibold">Total Questions</div>
              </div>
            </div>

            {/* Action Buttons */}
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

  const question = mcqQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / mcqQuestions.length) * 100

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/learn" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold">
          <span>←</span>
          <span>Back to Learning Hub</span>
        </Link>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Assessment Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">MCQ Technical & Aptitude Assessment</h1>
              <p className="text-gray-600">50 questions covering ML concepts, programming, statistics, and aptitude</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <div className="bg-red-50 px-4 py-2 rounded-xl">
                <div className="text-sm text-red-600">Time Remaining</div>
                <div className="font-bold text-gray-900">{formatTime(timeLeft)}</div>
              </div>
              <div className="bg-blue-50 px-4 py-2 rounded-xl">
                <div className="text-sm text-blue-600">Question</div>
                <div className="font-bold text-gray-900">{currentQuestion + 1}/{mcqQuestions.length}</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
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

          {/* Question */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                question.category === 'ml-fundamentals' ? 'bg-purple-100 text-purple-800' :
                question.category === 'statistics' ? 'bg-blue-100 text-blue-800' :
                question.category === 'python' ? 'bg-green-100 text-green-800' :
                question.category === 'sql' ? 'bg-orange-100 text-orange-800' :
                question.category === 'excel' ? 'bg-red-100 text-red-800' :
                question.category === 'quantitative' ? 'bg-indigo-100 text-indigo-800' :
                question.category === 'logical' ? 'bg-pink-100 text-pink-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {question.category.toUpperCase()}
              </span>
            </div>

            <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-100">
              <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
                {question.question}
              </h2>
            </div>
            
            {/* Options */}
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

          {/* Footer */}
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