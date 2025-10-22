// app/learn/tracks/[id]/page.tsx
'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

// Complete track data with resources for all four tracks
const trackData = {
  'ml-fundamentals': {
    title: 'Machine Learning Fundamentals',
    description: 'Master core ML concepts, algorithms, and practical implementations',
    icon: '🧠',
    gradient: 'from-blue-500 to-cyan-500',
    level: 'Beginner',
    modules: 12,
    duration: '8 weeks',
    progress: 35,
    overview: 'Learn the essential building blocks of machine learning including supervised and unsupervised learning, model evaluation, and practical implementations.',
    
    // Resources for ML Fundamentals
    videos: [
      {
        id: 1,
        title: 'Introduction to Machine Learning',
        duration: '45 min',
        description: 'Learn what ML is, types of ML, and real-world applications',
        completed: true
      },
      {
        id: 2,
        title: 'Linear Regression Deep Dive',
        duration: '55 min',
        description: 'Complete mathematical foundation and implementation',
        completed: true
      },
      {
        id: 3,
        title: 'Logistic Regression Explained',
        duration: '50 min',
        description: 'Classification algorithms and sigmoid function',
        completed: false
      },
      {
        id: 4,
        title: 'Model Evaluation Metrics',
        duration: '40 min',
        description: 'Accuracy, precision, recall, F1-score, and ROC curves',
        completed: false
      }
    ],
    
    notes: [
      {
        id: 1,
        title: 'ML Mathematics Fundamentals',
        duration: '30 min',
        description: 'Linear algebra, calculus, and probability for ML',
        completed: true
      },
      {
        id: 2,
        title: 'Supervised vs Unsupervised Learning',
        duration: '25 min',
        description: 'Complete comparison with examples',
        completed: true
      },
      {
        id: 3,
        title: 'Bias-Variance Tradeoff',
        duration: '20 min',
        description: 'Understanding model complexity and generalization',
        completed: false
      }
    ],
    
    code: [
      {
        id: 1,
        title: 'Linear Regression Implementation',
        duration: '60 min',
        description: 'Build linear regression from scratch in Python',
        language: 'Python',
        completed: false
      },
      {
        id: 2,
        title: 'Data Preprocessing Pipeline',
        duration: '45 min',
        description: 'Handle missing values and feature scaling',
        language: 'Python',
        completed: false
      },
      {
        id: 3,
        title: 'Model Evaluation Script',
        duration: '35 min',
        description: 'Comprehensive evaluation metrics implementation',
        language: 'Python',
        completed: false
      }
    ]
  },

  'data-science': {
    title: 'Data Science & Analytics',
    description: 'Extract insights and build predictive models from data',
    icon: '📊',
    gradient: 'from-green-500 to-emerald-500',
    level: 'Beginner',
    modules: 10,
    duration: '6 weeks',
    progress: 20,
    overview: 'Master data analysis, visualization, and statistical modeling techniques to extract meaningful insights from complex datasets.',
    
    // Resources for Data Science
    videos: [
      {
        id: 1,
        title: 'Pandas for Data Analysis',
        duration: '55 min',
        description: 'Master data manipulation with Pandas library',
        completed: true
      },
      {
        id: 2,
        title: 'Data Visualization with Matplotlib',
        duration: '45 min',
        description: 'Create insightful charts and graphs',
        completed: false
      },
      {
        id: 3,
        title: 'Statistical Hypothesis Testing',
        duration: '50 min',
        description: 'T-tests, ANOVA, and statistical significance',
        completed: false
      }
    ],
    
    notes: [
      {
        id: 1,
        title: 'Statistics for Data Science',
        duration: '40 min',
        description: 'Essential statistical concepts and applications',
        completed: false
      },
      {
        id: 2,
        title: 'Exploratory Data Analysis Guide',
        duration: '35 min',
        description: 'Step-by-step EDA process and techniques',
        completed: false
      },
      {
        id: 3,
        title: 'Data Cleaning Best Practices',
        duration: '30 min',
        description: 'Handle missing data and outliers effectively',
        completed: false
      }
    ],
    
    code: [
      {
        id: 1,
        title: 'Data Cleaning Pipeline',
        duration: '70 min',
        description: 'Practical data preprocessing and cleaning methods',
        language: 'Python',
        completed: false
      },
      {
        id: 2,
        title: 'Exploratory Data Analysis Script',
        duration: '50 min',
        description: 'Automated EDA with Pandas and Seaborn',
        language: 'Python',
        completed: false
      },
      {
        id: 3,
        title: 'Statistical Analysis Implementation',
        duration: '45 min',
        description: 'Implement statistical tests from scratch',
        language: 'Python',
        completed: false
      }
    ]
  },

  'deep-learning': {
    title: 'Deep Learning & Neural Networks',
    description: 'Build and train neural networks for complex problems',
    icon: '🔬',
    gradient: 'from-purple-500 to-pink-500',
    level: 'Advanced',
    modules: 15,
    duration: '12 weeks',
    progress: 10,
    overview: 'Dive deep into neural networks, convolutional networks, recurrent networks, and modern deep learning architectures.',
    
    // Resources for Deep Learning
    videos: [
      {
        id: 1,
        title: 'Neural Networks Fundamentals',
        duration: '60 min',
        description: 'Understanding neurons, layers, and activation functions',
        completed: false
      },
      {
        id: 2,
        title: 'Backpropagation Explained',
        duration: '55 min',
        description: 'Complete mathematical derivation and intuition',
        completed: false
      },
      {
        id: 3,
        title: 'Convolutional Neural Networks',
        duration: '65 min',
        description: 'Architecture and applications in computer vision',
        completed: false
      },
      {
        id: 4,
        title: 'Recurrent Neural Networks',
        duration: '50 min',
        description: 'LSTMs, GRUs for sequential data processing',
        completed: false
      }
    ],
    
    notes: [
      {
        id: 1,
        title: 'Deep Learning Mathematics',
        duration: '45 min',
        description: 'Linear algebra and calculus for deep learning',
        completed: false
      },
      {
        id: 2,
        title: 'CNN Architecture Guide',
        duration: '35 min',
        description: 'Complete guide to CNNs for image processing',
        completed: false
      },
      {
        id: 3,
        title: 'Optimization Algorithms',
        duration: '40 min',
        description: 'SGD, Adam, and other optimization techniques',
        completed: false
      }
    ],
    
    code: [
      {
        id: 1,
        title: 'Neural Network from Scratch',
        duration: '90 min',
        description: 'Build and train neural networks using NumPy',
        language: 'Python',
        completed: false
      },
      {
        id: 2,
        title: 'CNN with TensorFlow',
        duration: '75 min',
        description: 'Image classification with convolutional networks',
        language: 'Python',
        completed: false
      },
      {
        id: 3,
        title: 'RNN for Time Series',
        duration: '80 min',
        description: 'Sequence prediction with recurrent networks',
        language: 'Python',
        completed: false
      }
    ]
  },

  'mlops': {
    title: 'MLOps & Deployment',
    description: 'Deploy and maintain ML models in production',
    icon: '⚙️',
    gradient: 'from-orange-500 to-red-500',
    level: 'Intermediate',
    modules: 8,
    duration: '6 weeks',
    progress: 5,
    overview: 'Learn how to deploy, monitor, and maintain machine learning models in production environments using MLOps practices.',
    
    // Resources for MLOps
    videos: [
      {
        id: 1,
        title: 'MLOps Principles and Practices',
        duration: '50 min',
        description: 'Introduction to Machine Learning Operations',
        completed: false
      },
      {
        id: 2,
        title: 'Model Deployment Strategies',
        duration: '45 min',
        description: 'Blue-green, canary, and shadow deployments',
        completed: false
      },
      {
        id: 3,
        title: 'Monitoring ML Systems',
        duration: '40 min',
        description: 'Model drift, performance monitoring, and alerting',
        completed: false
      }
    ],
    
    notes: [
      {
        id: 1,
        title: 'Containerization for ML',
        duration: '35 min',
        description: 'Using Docker to package ML applications',
        completed: false
      },
      {
        id: 2,
        title: 'CI/CD for Machine Learning',
        duration: '30 min',
        description: 'Automated testing and deployment pipelines',
        completed: false
      },
      {
        id: 3,
        title: 'Model Versioning Best Practices',
        duration: '25 min',
        description: 'ML model management and version control',
        completed: false
      }
    ],
    
    code: [
      {
        id: 1,
        title: 'ML Model REST API',
        duration: '75 min',
        description: 'Create REST APIs for model deployment',
        language: 'Python',
        completed: false
      },
      {
        id: 2,
        title: 'Dockerized ML Application',
        duration: '60 min',
        description: 'Containerize ML model with Docker',
        language: 'Docker/Python',
        completed: false
      },
      {
        id: 3,
        title: 'Model Monitoring Dashboard',
        duration: '65 min',
        description: 'Real-time model performance monitoring',
        language: 'Python',
        completed: false
      }
    ]
  }
}

export default function TrackPage() {
  const params = useParams()
  const trackId = params.id as string
  const track = trackData[trackId as keyof typeof trackData]
  const [activeTab, setActiveTab] = useState('overview')

  if (!track) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Not Found</h1>
          <Link href="/learn" className="text-blue-600 hover:text-blue-700">
            Return to Learning Hub
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/learn" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold">
          ← Back to Learning Hub
        </Link>

        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{track.icon}</div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">{track.title}</h1>
                <p className="text-xl text-gray-600 mt-2">{track.description}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full font-semibold ${
                track.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                track.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {track.level}
              </span>
              <div className="mt-2 text-sm text-gray-600">
                {track.modules} modules • {track.duration}
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20 mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-700">Overall Progress</span>
            <span className="font-semibold text-gray-900">{track.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full bg-gradient-to-r ${track.gradient} transition-all duration-1000`}
              style={{ width: `${track.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-2 mb-8 border border-white/20">
          <div className="flex space-x-2">
            {['overview', 'resources', 'assessments', 'practice'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab === 'overview' && '📊 Overview'}
                {tab === 'resources' && '📚 Learning Resources'}
                {tab === 'assessments' && '🎯 Track Assessments'}
                {tab === 'practice' && '💻 Practice Exercises'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Overview</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-8">{track.overview}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl mb-3">📹</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Video Lectures</h3>
                  <p className="text-gray-600 mb-3">Comprehensive video content</p>
                  <div className="text-sm text-blue-600 font-semibold">
                    {track.videos.filter(v => v.completed).length}/{track.videos.length} completed
                  </div>
                </div>
                <div className="bg-green-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl mb-3">📖</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Study Notes</h3>
                  <p className="text-gray-600 mb-3">Detailed written materials</p>
                  <div className="text-sm text-green-600 font-semibold">
                    {track.notes.filter(n => n.completed).length}/{track.notes.length} completed
                  </div>
                </div>
                <div className="bg-purple-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300">
                  <div className="text-3xl mb-3">💻</div>
                  <h3 className="font-semibold text-gray-900 mb-2">Code Examples</h3>
                  <p className="text-gray-600 mb-3">Practical implementations</p>
                  <div className="text-sm text-purple-600 font-semibold">
                    {track.code.filter(c => c.completed).length}/{track.code.length} completed
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'resources' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Resources</h2>
              
              {/* Videos Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🎥</span>
                  Video Lectures ({track.videos.length})
                </h3>
                <div className="space-y-4">
                  {track.videos.map((video) => (
                    <div key={video.id} className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                      video.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            video.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                          }`}>
                            {video.completed ? '✓' : '▶'}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{video.title}</h4>
                            <p className="text-gray-600 text-sm">{video.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{video.duration}</div>
                          <div className={`text-xs font-semibold ${
                            video.completed ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            {video.completed ? 'Completed' : 'Start Watching'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes Section */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">📖</span>
                  Study Notes ({track.notes.length})
                </h3>
                <div className="space-y-4">
                  {track.notes.map((note) => (
                    <div key={note.id} className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                      note.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            note.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                          }`}>
                            {note.completed ? '✓' : '📄'}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{note.title}</h4>
                            <p className="text-gray-600 text-sm">{note.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{note.duration}</div>
                          <div className={`text-xs font-semibold ${
                            note.completed ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            {note.completed ? 'Completed' : 'Read Now'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code Section */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">💻</span>
                  Code Examples ({track.code.length})
                </h3>
                <div className="space-y-4">
                  {track.code.map((codeExample) => (
                    <div key={codeExample.id} className={`p-4 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                      codeExample.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            codeExample.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                          }`}>
                            {codeExample.completed ? '✓' : '{ }'}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{codeExample.title}</h4>
                            <p className="text-gray-600 text-sm">{codeExample.description}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700">
                                {codeExample.language}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">{codeExample.duration}</div>
                          <div className={`text-xs font-semibold ${
                            codeExample.completed ? 'text-green-600' : 'text-blue-600'
                          }`}>
                            {codeExample.completed ? 'Completed' : 'Start Coding'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'assessments' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Track Assessments</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">🚧</div>
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">Assessments Coming Soon</h3>
                <p className="text-yellow-700">Track-specific assessments are being developed and will be available soon!</p>
              </div>
            </div>
          )}
          
          {activeTab === 'practice' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Exercises</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Practice Exercises Coming Soon</h3>
                <p className="text-blue-700">Hands-on practice exercises are being created and will be available soon!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}