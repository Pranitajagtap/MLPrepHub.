// app/resume/analyze/page.tsx
'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ResumeData } from '../types'

interface AnalysisResult {
  score: number
  strengths: string[]
  improvements: string[]
  atsScore: number
  keywordAnalysis: {
    missing: string[]
    found: string[]
    suggestion: string
  }
  sectionAnalysis: {
    section: string
    score: number
    feedback: string
    tips: string[]
  }[]
}

// Component that uses useSearchParams
function AnalyzeContent() {
  const searchParams = useSearchParams()
  const resumeId = searchParams.get('id')
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const loadResume = async () => {
      if (!resumeId) return

      try {
        setIsLoading(true)
        // Try to load from database first
        const response = await fetch(`/api/resumes/${resumeId}`)
        if (response.ok) {
          const data = await response.json()
          setResumeData(data)
          analyzeResume(data)
        } else {
          // Fallback to localStorage
          const saved = localStorage.getItem(`resume-${resumeId}`)
          if (saved) {
            const data = JSON.parse(saved)
            setResumeData(data)
            analyzeResume(data)
          }
        }
      } catch (error) {
        console.error('Error loading resume:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadResume()
  }, [resumeId])

  const analyzeResume = (data: ResumeData) => {
    // Mock AI analysis - in real app, this would call an API
    const analysisResult: AnalysisResult = {
      score: calculateOverallScore(data),
      strengths: analyzeStrengths(data),
      improvements: analyzeImprovements(data),
      atsScore: calculateATSScore(data),
      keywordAnalysis: analyzeKeywords(data),
      sectionAnalysis: analyzeSections(data)
    }
    setAnalysis(analysisResult)
  }

  const calculateOverallScore = (data: ResumeData): number => {
    let score = 0
    if (data.personalInfo.name) score += 10
    if (data.personalInfo.email) score += 10
    if (data.summary.length > 50) score += 15
    if (data.skills.length >= 5) score += 15
    if (data.experiences.length > 0) score += 20
    if (data.education.length > 0) score += 15
    if (data.projects.length > 0) score += 15
    return Math.min(score, 100)
  }

  const calculateATSScore = (data: ResumeData): number => {
    let atsScore = 70 // Base score
    
    // Check for ATS-friendly formatting
    if (data.skills.length >= 8) atsScore += 10
    if (data.experiences.some(exp => exp.achievements && exp.achievements.length > 0)) atsScore += 10
    if (data.summary.length > 100 && data.summary.length < 300) atsScore += 10
    
    return Math.min(atsScore, 100)
  }

  const analyzeStrengths = (data: ResumeData): string[] => {
    const strengths = []
    
    if (data.skills.length >= 8) {
      strengths.push("Strong technical skills section with good variety")
    }
    
    if (data.experiences.length >= 2) {
      strengths.push("Good work experience history")
    }
    
    if (data.projects.length >= 2) {
      strengths.push("Excellent project portfolio showcasing practical skills")
    }
    
    if (data.summary.length > 100) {
      strengths.push("Well-written professional summary")
    }
    
    if (data.experiences.some(exp => exp.achievements && exp.achievements.length >= 2)) {
      strengths.push("Quantifiable achievements in work experience")
    }
    
    return strengths.length > 0 ? strengths : ["Good foundation - let's build on it!"]
  }

  const analyzeImprovements = (data: ResumeData): string[] => {
    const improvements = []
    
    if (data.skills.length < 5) {
      improvements.push("Add more technical skills (aim for 8-12 relevant skills)")
    }
    
    if (data.experiences.length === 0) {
      improvements.push("Include work experience, even internships or volunteer work")
    }
    
    if (data.summary.length < 50) {
      improvements.push("Expand your professional summary to 3-4 sentences")
    }
    
    if (!data.experiences.some(exp => exp.achievements && exp.achievements.length > 0)) {
      improvements.push("Add quantifiable achievements to your work experience")
    }
    
    if (data.projects.length === 0) {
      improvements.push("Include personal projects to showcase your skills")
    }
    
    if (!data.personalInfo.linkedin) {
      improvements.push("Add your LinkedIn profile for professional networking")
    }
    
    return improvements.length > 0 ? improvements : ["Your resume looks great! Minor tweaks could make it perfect."]
  }

  const analyzeKeywords = (data: ResumeData) => {
    const commonKeywords = ['javascript', 'react', 'node', 'python', 'java', 'sql', 'aws', 'docker', 'git', 'agile']
    const foundKeywords = commonKeywords.filter(keyword => 
      data.skills.some(skill => skill.toLowerCase().includes(keyword)) ||
      data.summary.toLowerCase().includes(keyword) ||
      data.experiences.some(exp => 
        exp.description.toLowerCase().includes(keyword) ||
        exp.position.toLowerCase().includes(keyword)
      )
    )
    
    const missingKeywords = commonKeywords.filter(keyword => !foundKeywords.includes(keyword))
    
    return {
      missing: missingKeywords.slice(0, 5),
      found: foundKeywords,
      suggestion: foundKeywords.length >= 5 ? 
        "Great keyword coverage!" : 
        "Consider adding more industry-relevant keywords"
    }
  }

  const analyzeSections = (data: ResumeData) => {
    return [
      {
        section: 'Professional Summary',
        score: data.summary.length > 50 ? 85 : 40,
        feedback: data.summary.length > 50 ? 
          'Engaging and informative' : 
          'Too brief - expand to showcase your value',
        tips: [
          'Keep it 3-4 sentences long',
          'Include your top 2-3 key skills',
          'Mention your career objectives'
        ]
      },
      {
        section: 'Skills',
        score: Math.min(data.skills.length * 10, 100),
        feedback: data.skills.length >= 8 ? 
          'Comprehensive skills list' : 
          'Add more relevant technical skills',
        tips: [
          'Group similar skills together',
          'Include both hard and soft skills',
          'Update with latest technologies'
        ]
      },
      {
        section: 'Experience',
        score: data.experiences.length > 0 ? 80 : 30,
        feedback: data.experiences.length > 0 ? 
          'Good work history' : 
          'Consider adding internships or projects',
        tips: [
          'Use action verbs (Developed, Managed, Improved)',
          'Include quantifiable results',
          'Focus on achievements, not just responsibilities'
        ]
      },
      {
        section: 'Projects',
        score: data.projects.length > 0 ? 75 : 25,
        feedback: data.projects.length > 0 ? 
          'Shows practical application' : 
          'Projects demonstrate real-world skills',
        tips: [
          'Include live demos or GitHub links',
          'Describe the technologies used',
          'Explain the problem you solved'
        ]
      },
      {
        section: 'Education',
        score: data.education.length > 0 ? 90 : 20,
        feedback: data.education.length > 0 ? 
          'Educational background included' : 
          'Add your educational qualifications',
        tips: [
          'Include relevant coursework',
          'Mention academic achievements',
          'Add certifications if applicable'
        ]
      }
    ]
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 border-green-200'
    if (score >= 60) return 'bg-yellow-100 border-yellow-200'
    return 'bg-red-100 border-red-200'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Analyzing your resume...</h2>
          <p className="text-gray-600 mt-2">Our AI is reviewing your content</p>
        </div>
      </div>
    )
  }

  if (!resumeData || !analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find the resume you're looking for.</p>
          <Link 
            href="/resume" 
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all font-semibold"
          >
            ← Back to Resumes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 mb-6">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">AI-Powered Resume Analysis</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Resume Analysis
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Detailed insights to help you optimize your resume and stand out to employers
          </p>
        </div>

        {/* Main Score Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Overall Score */}
            <div className="text-center">
              <div className={`w-32 h-32 mx-auto rounded-full border-8 ${getScoreBgColor(analysis.score)} flex items-center justify-center mb-4`}>
                <span className={`text-3xl font-bold ${getScoreColor(analysis.score)}`}>
                  {analysis.score}%
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Overall Score</h3>
              <p className="text-gray-600">
                {analysis.score >= 80 ? 'Excellent! Your resume is strong' :
                 analysis.score >= 60 ? 'Good foundation with room for improvement' :
                 'Needs significant improvement'}
              </p>
            </div>

            {/* ATS Score */}
            <div className="text-center">
              <div className={`w-32 h-32 mx-auto rounded-full border-8 ${getScoreBgColor(analysis.atsScore)} flex items-center justify-center mb-4`}>
                <span className={`text-3xl font-bold ${getScoreColor(analysis.atsScore)}`}>
                  {analysis.atsScore}%
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">ATS Compatibility</h3>
              <p className="text-gray-600">
                {analysis.atsScore >= 80 ? 'Highly compatible with applicant tracking systems' :
                 analysis.atsScore >= 60 ? 'Moderately compatible' :
                 'May have issues with ATS parsing'}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Skills Listed</span>
                <span className="font-semibold text-gray-900">{resumeData.skills.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Experiences</span>
                <span className="font-semibold text-gray-900">{resumeData.experiences.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Projects</span>
                <span className="font-semibold text-gray-900">{resumeData.projects.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Keywords Found</span>
                <span className="font-semibold text-gray-900">{analysis.keywordAnalysis.found.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['overview', 'strengths', 'improvements', 'keywords', 'sections'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab === 'overview' ? '📊 Overview' :
               tab === 'strengths' ? '✅ Strengths' :
               tab === 'improvements' ? '🎯 Improvements' :
               tab === 'keywords' ? '🔑 Keywords' :
               '📝 Sections'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Resume Overview</h3>
              
              {/* Strengths & Improvements Side by Side */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                    <span>✅</span> What's Working Well
                  </h4>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, index) => (
                      <li key={index} className="text-green-800 flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h4 className="text-lg font-bold text-orange-900 mb-4 flex items-center gap-2">
                    <span>🎯</span> Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {analysis.improvements.map((improvement, index) => (
                      <li key={index} className="text-orange-800 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <span>⚡</span> Quick Actions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link 
                    href={`/resume/${resumeId}`}
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all font-semibold text-center"
                  >
                    ✏️ Edit Resume
                  </Link>
                  <button className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all font-semibold">
                    📥 Download PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Strengths Tab */}
          {activeTab === 'strengths' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Resume Strengths</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysis.strengths.map((strength, index) => (
                  <div key={index} className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">✓</span>
                      </div>
                      <h4 className="font-semibold text-green-900">Strength #{index + 1}</h4>
                    </div>
                    <p className="text-green-800">{strength}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Improvements Tab */}
          {activeTab === 'improvements' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Actionable Improvements</h3>
              <div className="space-y-4">
                {analysis.improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-orange-900 font-medium">{improvement}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Keywords Tab */}
          {activeTab === 'keywords' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Keyword Analysis</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h4 className="text-lg font-bold text-green-900 mb-4">✅ Keywords Found</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywordAnalysis.found.map((keyword, index) => (
                      <span key={index} className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                  <h4 className="text-lg font-bold text-orange-900 mb-4">🎯 Suggested Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywordAnalysis.missing.map((keyword, index) => (
                      <span key={index} className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h4 className="text-lg font-bold text-blue-900 mb-2">💡 Recommendation</h4>
                <p className="text-blue-800">{analysis.keywordAnalysis.suggestion}</p>
              </div>
            </div>
          )}

          {/* Sections Tab */}
          {activeTab === 'sections' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Section-by-Section Analysis</h3>
              <div className="space-y-4">
                {analysis.sectionAnalysis.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-gray-900">{section.section}</h4>
                      <div className={`px-3 py-1 rounded-full font-semibold ${getScoreBgColor(section.score)} ${getScoreColor(section.score)}`}>
                        {section.score}%
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{section.feedback}</p>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900 mb-2">💡 Pro Tips:</h5>
                      <ul className="space-y-1">
                        {section.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-gray-600 text-sm flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <Link 
            href={`/resume/${resumeId}`}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all font-semibold text-lg"
          >
            ✏️ Edit Your Resume
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Main page component with Suspense boundary
export default function ResumeAnalyze() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading analysis...</h2>
          <p className="text-gray-600 mt-2">Preparing your resume insights</p>
        </div>
      </div>
    }>
      <AnalyzeContent />
    </Suspense>
  )
}