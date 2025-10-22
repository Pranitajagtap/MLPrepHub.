// app/careers/[id]/assessment/page.tsx
'use client'

import Link from 'next/link'
import { use } from 'react'

const careerAssessments = {
  'full-stack': {
    title: 'Full Stack Developer Skill Assessment',
    description: 'Test your knowledge across frontend, backend, and full stack development concepts.',
    totalQuestions: 50,
    duration: '60 minutes',
    difficulty: 'Beginner to Advanced',
    topics: [
      { name: 'JavaScript Fundamentals', questions: 12, weight: 25 },
      { name: 'React & Frontend', questions: 10, weight: 20 },
      { name: 'Node.js & Backend', questions: 10, weight: 20 },
      { name: 'Database & APIs', questions: 8, weight: 15 },
      { name: 'System Design', questions: 6, weight: 12 },
      { name: 'DevOps & Tools', questions: 4, weight: 8 }
    ],
    skillsTested: [
      'Programming Logic & Algorithms',
      'Framework Knowledge (React, Node.js)',
      'Database Design & Management',
      'API Development & Integration',
      'System Architecture & Design Patterns',
      'Version Control & Deployment'
    ],
    preparationTips: [
      'Review JavaScript ES6+ features',
      'Practice React component lifecycle',
      'Understand REST API principles',
      'Study database normalization',
      'Brush up on system design basics'
    ]
  },
  'data-scientist': {
    title: 'Data Scientist Skill Assessment',
    description: 'Evaluate your data science, statistics, and machine learning expertise.',
    totalQuestions: 45,
    duration: '75 minutes',
    difficulty: 'Intermediate to Advanced',
    topics: [
      { name: 'Python Programming', questions: 8, weight: 18 },
      { name: 'Statistics & Probability', questions: 10, weight: 22 },
      { name: 'Machine Learning', questions: 12, weight: 27 },
      { name: 'Data Wrangling', questions: 7, weight: 16 },
      { name: 'Data Visualization', questions: 5, weight: 11 },
      { name: 'Business Analytics', questions: 3, weight: 6 }
    ],
    skillsTested: [
      'Statistical Analysis & Hypothesis Testing',
      'Machine Learning Algorithms',
      'Data Manipulation with Pandas',
      'Data Visualization Techniques',
      'Business Insight Generation',
      'Model Evaluation & Validation'
    ],
    preparationTips: [
      'Review probability distributions',
      'Practice ML model implementation',
      'Study data preprocessing techniques',
      'Understand model evaluation metrics',
      'Brush up on SQL queries'
    ]
  },
  'ml-engineer': {
    title: 'Machine Learning Engineer Assessment',
    description: 'Test your machine learning engineering and MLOps capabilities.',
    totalQuestions: 55,
    duration: '90 minutes',
    difficulty: 'Intermediate to Advanced',
    topics: [
      { name: 'Machine Learning Fundamentals', questions: 12, weight: 22 },
      { name: 'Deep Learning', questions: 10, weight: 18 },
      { name: 'Model Deployment', questions: 8, weight: 15 },
      { name: 'MLOps & Infrastructure', questions: 10, weight: 18 },
      { name: 'Mathematics for ML', questions: 8, weight: 15 },
      { name: 'Programming & Tools', questions: 7, weight: 12 }
    ],
    skillsTested: [
      'ML Algorithm Implementation',
      'Deep Learning Architectures',
      'Model Deployment Strategies',
      'ML Pipeline Automation',
      'Mathematical Foundations',
      'Software Engineering Best Practices'
    ],
    preparationTips: [
      'Review neural network architectures',
      'Practice model deployment scenarios',
      'Study MLOps tools and practices',
      'Understand linear algebra concepts',
      'Brush up on Python and ML libraries'
    ]
  },
  'frontend': {
    title: 'Frontend Developer Skill Assessment',
    description: 'Evaluate your frontend development skills and modern web technologies knowledge.',
    totalQuestions: 40,
    duration: '50 minutes',
    difficulty: 'Beginner to Intermediate',
    topics: [
      { name: 'HTML/CSS', questions: 8, weight: 20 },
      { name: 'JavaScript ES6+', questions: 10, weight: 25 },
      { name: 'React/Vue.js', questions: 12, weight: 30 },
      { name: 'Responsive Design', questions: 5, weight: 12 },
      { name: 'Web Performance', questions: 3, weight: 8 },
      { name: 'Browser APIs', questions: 2, weight: 5 }
    ],
    skillsTested: [
      'CSS Layouts and Styling',
      'JavaScript Programming Logic',
      'Framework Concepts and Usage',
      'Cross-browser Compatibility',
      'Performance Optimization',
      'Modern Web Standards'
    ],
    preparationTips: [
      'Practice CSS Grid and Flexbox',
      'Review JavaScript async programming',
      'Study React hooks and state management',
      'Understand web performance metrics',
      'Brush up on accessibility standards'
    ]
  },
  'backend': {
    title: 'Backend Developer Skill Assessment',
    description: 'Test your server-side development, database, and system architecture knowledge.',
    totalQuestions: 48,
    duration: '70 minutes',
    difficulty: 'Intermediate to Advanced',
    topics: [
      { name: 'Backend Programming', questions: 10, weight: 21 },
      { name: 'Database Design', questions: 8, weight: 17 },
      { name: 'API Development', questions: 10, weight: 21 },
      { name: 'System Architecture', questions: 8, weight: 17 },
      { name: 'Security', questions: 6, weight: 12 },
      { name: 'Cloud Services', questions: 6, weight: 12 }
    ],
    skillsTested: [
      'Server-side Programming Languages',
      'Database Design and Optimization',
      'REST/GraphQL API Development',
      'System Architecture Patterns',
      'Security Best Practices',
      'Cloud Platform Knowledge'
    ],
    preparationTips: [
      'Review your primary backend language',
      'Practice database query optimization',
      'Study API design principles',
      'Understand microservices architecture',
      'Brush up on authentication methods'
    ]
  },
  'devops': {
    title: 'DevOps Engineer Skill Assessment',
    description: 'Evaluate your infrastructure, automation, and cloud operations expertise.',
    totalQuestions: 52,
    duration: '80 minutes',
    difficulty: 'Intermediate to Advanced',
    topics: [
      { name: 'Containerization', questions: 10, weight: 19 },
      { name: 'Cloud Platforms', questions: 12, weight: 23 },
      { name: 'CI/CD Pipelines', questions: 8, weight: 15 },
      { name: 'Infrastructure as Code', questions: 8, weight: 15 },
      { name: 'Monitoring & Logging', questions: 7, weight: 14 },
      { name: 'Networking', questions: 7, weight: 14 }
    ],
    skillsTested: [
      'Container Orchestration (Kubernetes)',
      'Cloud Platform Services (AWS/Azure/GCP)',
      'CI/CD Pipeline Implementation',
      'Infrastructure Automation',
      'System Monitoring and Alerting',
      'Network Configuration and Security'
    ],
    preparationTips: [
      'Review Docker and Kubernetes concepts',
      'Practice cloud service configurations',
      'Study CI/CD tool configurations',
      'Understand infrastructure as code tools',
      'Brush up on networking fundamentals'
    ]
  },
  'mobile': {
    title: 'Mobile Developer Skill Assessment',
    description: 'Test your mobile development skills across iOS, Android, and cross-platform technologies.',
    totalQuestions: 45,
    duration: '65 minutes',
    difficulty: 'Beginner to Intermediate',
    topics: [
      { name: 'Mobile Fundamentals', questions: 8, weight: 18 },
      { name: 'Cross-Platform Development', questions: 12, weight: 27 },
      { name: 'Native Development', questions: 10, weight: 22 },
      { name: 'Mobile UI/UX', questions: 7, weight: 16 },
      { name: 'APIs & Services', questions: 5, weight: 11 },
      { name: 'App Deployment', questions: 3, weight: 6 }
    ],
    skillsTested: [
      'Mobile Development Frameworks',
      'Platform-specific Development',
      'UI/UX Implementation',
      'API Integration',
      'Performance Optimization',
      'App Store Deployment'
    ],
    preparationTips: [
      'Review React Native/Flutter concepts',
      'Practice platform-specific development',
      'Study mobile UI/UX best practices',
      'Understand app store guidelines',
      'Brush up on mobile security'
    ]
  },
  'data-engineer': {
    title: 'Data Engineer Skill Assessment',
    description: 'Evaluate your data pipeline development and big data technologies expertise.',
    totalQuestions: 50,
    duration: '75 minutes',
    difficulty: 'Intermediate to Advanced',
    topics: [
      { name: 'Data Engineering Concepts', questions: 8, weight: 16 },
      { name: 'Big Data Technologies', questions: 12, weight: 24 },
      { name: 'Data Pipeline Development', questions: 10, weight: 20 },
      { name: 'Cloud Data Platforms', questions: 8, weight: 16 },
      { name: 'Data Modeling', questions: 7, weight: 14 },
      { name: 'Data Governance', questions: 5, weight: 10 }
    ],
    skillsTested: [
      'Data Pipeline Design & Implementation',
      'Big Data Processing Frameworks',
      'Cloud Data Services',
      'Data Modeling & Architecture',
      'ETL/ELT Processes',
      'Data Quality & Governance'
    ],
    preparationTips: [
      'Review Spark and Hadoop concepts',
      'Practice data pipeline design',
      'Study cloud data services',
      'Understand data modeling principles',
      'Brush up on SQL and data warehousing'
    ]
  },
  'cybersecurity': {
    title: 'Cybersecurity Analyst Skill Assessment',
    description: 'Test your cybersecurity knowledge and threat protection capabilities.',
    totalQuestions: 55,
    duration: '85 minutes',
    difficulty: 'Intermediate to Advanced',
    topics: [
      { name: 'Security Fundamentals', questions: 10, weight: 18 },
      { name: 'Network Security', questions: 12, weight: 22 },
      { name: 'Threat Detection', questions: 10, weight: 18 },
      { name: 'Security Operations', questions: 8, weight: 15 },
      { name: 'Risk Assessment', questions: 8, weight: 15 },
      { name: 'Compliance & Governance', questions: 7, weight: 12 }
    ],
    skillsTested: [
      'Network Security Implementation',
      'Threat Detection & Analysis',
      'Security Monitoring & Incident Response',
      'Vulnerability Assessment',
      'Risk Management',
      'Security Compliance'
    ],
    preparationTips: [
      'Review network security concepts',
      'Practice threat detection scenarios',
      'Study security frameworks and compliance',
      'Understand incident response procedures',
      'Brush up on security tools and technologies'
    ]
  },
  'cloud-engineer': {
    title: 'Cloud Engineer Skill Assessment',
    description: 'Evaluate your cloud infrastructure design and management expertise.',
    totalQuestions: 48,
    duration: '70 minutes',
    difficulty: 'Intermediate to Advanced',
    topics: [
      { name: 'Cloud Fundamentals', questions: 8, weight: 17 },
      { name: 'Cloud Services', questions: 12, weight: 25 },
      { name: 'Infrastructure as Code', questions: 10, weight: 21 },
      { name: 'Cloud Security', questions: 8, weight: 17 },
      { name: 'Networking', questions: 6, weight: 12 },
      { name: 'Cost Optimization', questions: 4, weight: 8 }
    ],
    skillsTested: [
      'Cloud Platform Services (AWS/Azure/GCP)',
      'Infrastructure Automation',
      'Cloud Security Implementation',
      'Networking & Connectivity',
      'Cost Management & Optimization',
      'Disaster Recovery & High Availability'
    ],
    preparationTips: [
      'Review cloud service offerings',
      'Practice infrastructure as code',
      'Study cloud security best practices',
      'Understand networking concepts',
      'Brush up on cost optimization strategies'
    ]
  },
  'ai-engineer': {
    title: 'AI Engineer Skill Assessment',
    description: 'Test your artificial intelligence and machine learning engineering skills.',
    totalQuestions: 60,
    duration: '100 minutes',
    difficulty: 'Advanced',
    topics: [
      { name: 'AI/ML Fundamentals', questions: 10, weight: 17 },
      { name: 'Deep Learning', questions: 12, weight: 20 },
      { name: 'Natural Language Processing', questions: 10, weight: 17 },
      { name: 'Computer Vision', questions: 10, weight: 17 },
      { name: 'AI System Design', questions: 8, weight: 13 },
      { name: 'AI Ethics & Deployment', questions: 10, weight: 16 }
    ],
    skillsTested: [
      'Deep Learning Architectures',
      'NLP & Computer Vision Implementation',
      'AI Model Training & Optimization',
      'AI System Architecture',
      'Model Deployment & MLOps',
      'Ethical AI Considerations'
    ],
    preparationTips: [
      'Review neural network architectures',
      'Practice NLP and computer vision tasks',
      'Study model deployment strategies',
      'Understand AI ethics and fairness',
      'Brush up on AI frameworks and tools'
    ]
  },
  'blockchain': {
    title: 'Blockchain Developer Skill Assessment',
    description: 'Evaluate your blockchain development and smart contract programming skills.',
    totalQuestions: 45,
    duration: '75 minutes',
    difficulty: 'Intermediate to Advanced',
    topics: [
      { name: 'Blockchain Fundamentals', questions: 8, weight: 18 },
      { name: 'Smart Contract Development', questions: 12, weight: 27 },
      { name: 'DApp Development', questions: 10, weight: 22 },
      { name: 'Blockchain Platforms', questions: 8, weight: 18 },
      { name: 'Cryptography', questions: 4, weight: 9 },
      { name: 'DeFi & NFTs', questions: 3, weight: 6 }
    ],
    skillsTested: [
      'Smart Contract Programming',
      'DApp Development & Integration',
      'Blockchain Platform Knowledge',
      'Cryptography & Security',
      'Web3 Technologies',
      'Decentralized Application Architecture'
    ],
    preparationTips: [
      'Review Solidity and smart contract concepts',
      'Practice DApp development',
      'Study different blockchain platforms',
      'Understand cryptography fundamentals',
      'Brush up on Web3.js and related technologies'
    ]
  }
}

const careerTitles = {
  'full-stack': 'Full Stack Developer',
  'data-scientist': 'Data Scientist',
  'ml-engineer': 'Machine Learning Engineer',
  'frontend': 'Frontend Developer',
  'backend': 'Backend Developer',
  'devops': 'DevOps Engineer',
  'mobile': 'Mobile Developer',
  'data-engineer': 'Data Engineer',
  'cybersecurity': 'Cybersecurity Analyst',
  'cloud-engineer': 'Cloud Engineer',
  'ai-engineer': 'AI Engineer',
  'blockchain': 'Blockchain Developer'
}

export default function CareerAssessmentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { id } = resolvedParams

  const careerTitle = careerTitles[id as keyof typeof careerTitles] || 'Developer'
  const assessment = careerAssessments[id as keyof typeof careerAssessments] || careerAssessments['full-stack']

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href={`/careers/${id}`} className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold">
          ← Back to Career Details
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {assessment.title}
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            {assessment.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Assessment Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assessment Details */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Assessment Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{assessment.totalQuestions}</div>
                  <div className="text-gray-700 font-semibold">Total Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{assessment.duration}</div>
                  <div className="text-gray-700 font-semibold">Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{assessment.difficulty}</div>
                  <div className="text-gray-700 font-semibold">Difficulty</div>
                </div>
              </div>

              {/* Topics Breakdown */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Topics Breakdown</h3>
                <div className="space-y-4">
                  {assessment.topics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-semibold text-gray-900">{topic.name}</div>
                        <div className="text-sm text-gray-600">{topic.questions} questions</div>
                      </div>
                      <div className="text-lg font-bold text-blue-600">{topic.weight}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Tested */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Skills Tested</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assessment.skillsTested.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <span className="font-semibold text-gray-900">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA & Preparation */}
          <div className="space-y-6">
            {/* Start Assessment CTA */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Test Your Skills?</h3>
              <p className="text-blue-100 mb-6">
                Take this assessment to evaluate your current {careerTitle} knowledge and identify areas for improvement.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">⏱️</div>
                  <span className="font-semibold">Timed Assessment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">📊</div>
                  <span className="font-semibold">Detailed Analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">🎯</div>
                  <span className="font-semibold">Personalized Feedback</span>
                </div>
              </div>

              <button className="w-full bg-white text-blue-600 text-center py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                Start Assessment
              </button>
            </div>

            {/* Preparation Tips */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Preparation Tips</h3>
              <ul className="space-y-3">
                {assessment.preparationTips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-green-500 font-bold mt-1">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}