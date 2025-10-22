// app/learn/assessments/coding-assessment/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import CodeEditor from './components/CodeEditor'

export default function CodingAssessment() {
  const [currentProblem, setCurrentProblem] = useState(0)
  const [solutions, setSolutions] = useState<string[]>(['', '', ''])
  const [showResults, setShowResults] = useState(false)

  const codingProblems = [
    {
      id: 1,
      title: "Mean Squared Error Calculator",
      description: "Implement a function to calculate the Mean Squared Error (MSE) between two arrays of numbers. MSE is calculated as the average of the squared differences between predicted and actual values.",
      requirements: [
        "Function should be named 'calculate_mse'",
        "Take two parameters: actual (list) and predicted (list)",
        "Return the MSE as a float",
        "Handle cases where arrays have different lengths by returning -1",
        "Round the result to 4 decimal places"
      ],
      examples: `
Example 1:
Input: actual = [1, 2, 3], predicted = [1, 2, 3]
Output: 0.0

Example 2:
Input: actual = [1, 2, 3], predicted = [1, 2, 4]
Output: 0.3333

Example 3:
Input: actual = [1, 2], predicted = [1, 2, 3]
Output: -1
      `,
      testCases: [
        { actual: [1, 2, 3], predicted: [1, 2, 3], expected: 0.0 },
        { actual: [1, 2, 3], predicted: [1, 2, 4], expected: 0.3333 },
        { actual: [3, -0.5, 2, 7], predicted: [2.5, 0.0, 2, 8], expected: 0.375 },
        { actual: [1, 2], predicted: [1, 2, 3], expected: -1 }
      ],
      initialCode: `def calculate_mse(actual, predicted):
    # Your code here
    pass`
    },
    {
      id: 2,
      title: "Data Preprocessing Pipeline",
      description: "Create a data preprocessing function that handles missing values, scales numerical features, and encodes categorical variables.",
      requirements: [
        "Handle missing values by filling with mean for numerical columns",
        "Scale numerical features using StandardScaler",
        "One-hot encode categorical columns",
        "Return processed DataFrame and the preprocessing objects"
      ],
      examples: `
Input DataFrame may have:
- Numerical columns with NaN values
- Categorical columns with string values
- Mixed data types
      `,
      initialCode: `import pandas as pd
from sklearn.preprocessing import StandardScaler

def preprocess_data(df, numerical_cols, categorical_cols):
    # Your code here
    pass`
    },
    {
      id: 3,
      title: "SQL Query - Employee Analysis",
      description: "Write SQL queries to analyze employee data and find insights about departments and salaries.",
      requirements: [
        "Find department with highest average salary",
        "List employees earning more than their department average",
        "Rank employees within their departments by salary"
      ],
      examples: `
Tables: employees(id, name, department, salary)
          departments(id, name, manager_id)
      `,
      initialCode: `-- Write your SQL queries here
-- 1. Department with highest average salary

-- 2. Employees earning more than department average

-- 3. Rank employees by salary within departments`
    }
  ]

  const handleCodeChange = (code: string) => {
    const newSolutions = [...solutions]
    newSolutions[currentProblem] = code
    setSolutions(newSolutions)
  }

  const handleRunTests = async () => {
    // This would connect to a backend code execution service
    alert('Running tests... This would connect to a code execution backend in production.')
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/learn" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold">
            <span>←</span>
            <span>Back to Learning Hub</span>
          </Link>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Coding Assessment Submitted!
              </h1>
              <p className="text-xl text-gray-600">Your solutions have been received and will be evaluated.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-2xl p-6 text-center border border-blue-100">
                <div className="text-3xl font-bold text-blue-600 mb-2">{codingProblems.length}</div>
                <div className="text-blue-700 font-semibold">Problems Attempted</div>
              </div>
              <div className="bg-yellow-50 rounded-2xl p-6 text-center border border-yellow-100">
                <div className="text-3xl font-bold text-yellow-600 mb-2">Pending</div>
                <div className="text-yellow-700 font-semibold">Evaluation Status</div>
              </div>
              <div className="bg-purple-50 rounded-2xl p-6 text-center border border-purple-100">
                <div className="text-3xl font-bold text-purple-600 mb-2">90 mins</div>
                <div className="text-purple-700 font-semibold">Time Allocated</div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Your code solutions have been saved. In a real implementation, this would connect to a code evaluation backend.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/learn/assessments"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  Back to Assessments
                </Link>
                <button 
                  onClick={() => setShowResults(false)}
                  className="border-2 border-blue-500 text-blue-600 px-8 py-3 rounded-xl hover:bg-blue-50 transition-all font-semibold"
                >
                  Review Solutions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const problem = codingProblems[currentProblem]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/learn" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold">
          <span>←</span>
          <span>Back to Learning Hub</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Problem Description */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Coding Assessment</h1>
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Problem {currentProblem + 1}/{codingProblems.length}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{problem.title}</h2>
                  <p className="text-gray-700 mb-4">{problem.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Requirements:</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    {problem.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Examples:</h3>
                  <pre className="bg-gray-800 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                    {problem.examples}
                  </pre>
                </div>

                {/* Navigation */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setCurrentProblem(prev => Math.max(0, prev - 1))}
                    disabled={currentProblem === 0}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentProblem(prev => Math.min(codingProblems.length - 1, prev + 1))}
                    disabled={currentProblem === codingProblems.length - 1}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Code Editor Area */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Code Editor</h2>
                <div className="flex items-center space-x-3">
                  <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                    <option>Python 3.9</option>
                    <option>SQL</option>
                    <option>JavaScript</option>
                  </select>
                  <button className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transition text-sm font-semibold">
                    Run Code
                  </button>
                </div>
              </div>

              <CodeEditor
                value={solutions[currentProblem]}
                onChange={handleCodeChange}
                language={problem.id === 3 ? "sql" : "python"}
                height="400px"
              />

              <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center space-x-2 text-yellow-800">
                  <span>💡</span>
                  <span className="text-sm font-semibold">Tip:</span>
                  <span className="text-sm">Test your code with the examples before submitting</span>
                </div>
              </div>
            </div>

            {/* Test Cases & Output */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Test Cases</h3>
              <div className="space-y-3">
                {problem.testCases && problem.testCases.map((testCase, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <span className="font-semibold text-gray-900">Test Case {index + 1}</span>
                      <div className="text-sm text-gray-600">
                        Input: actual={JSON.stringify(testCase.actual)}, predicted={JSON.stringify(testCase.predicted)}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">Expected: {testCase.expected}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={handleRunTests}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold flex-1"
                >
                  Run Test Cases
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition font-semibold flex-1"
                >
                  Submit All Solutions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}