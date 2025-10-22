import Link from 'next/link'

// This would be your actual module data
const moduleData = {
  'ml-fundamentals': {
    title: 'Machine Learning Fundamentals',
    description: 'Master core ML concepts, algorithms, and practical implementations',
    duration: '6 hours',
    level: 'Beginner',
    progress: 65,
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    icon: '🧠',
    content: `Machine Learning is transforming industries by enabling computers to learn from data and make intelligent decisions. This module covers the foundational concepts that every ML practitioner must master.`,
    objectives: [
      'Understand different types of machine learning',
      'Implement basic ML algorithms from scratch',
      'Evaluate model performance effectively',
      'Preprocess data for ML applications'
    ]
  },
  'data-science': {
    title: 'Data Science & Analytics',
    description: 'Extract insights and build predictive models from data',
    duration: '8 hours',
    level: 'Beginner',
    progress: 20,
    color: 'green',
    gradient: 'from-green-500 to-emerald-500',
    icon: '📊',
    content: `Data Science combines statistical analysis, programming, and domain knowledge to extract meaningful insights from data. Learn the complete data analysis pipeline.`,
    objectives: [
      'Master data cleaning and preprocessing',
      'Perform exploratory data analysis',
      'Build predictive models',
      'Create data visualizations'
    ]
  },
  'deep-learning': {
    title: 'Deep Learning & Neural Networks',
    description: 'Build and train neural networks for complex problems',
    duration: '12 hours',
    level: 'Advanced',
    progress: 10,
    color: 'purple',
    gradient: 'from-purple-500 to-pink-500',
    icon: '🔬',
    content: `Deep Learning has revolutionized AI with neural networks that can learn complex patterns from large datasets. Master architectures like CNNs, RNNs, and Transformers.`,
    objectives: [
      'Understand neural network architectures',
      'Train deep learning models effectively',
      'Work with computer vision and NLP tasks',
      'Optimize model performance'
    ]
  },
  'mlops': {
    title: 'MLOps & Deployment',
    description: 'Deploy and maintain ML models in production',
    duration: '10 hours',
    level: 'Intermediate',
    progress: 5,
    color: 'orange',
    gradient: 'from-orange-500 to-red-500',
    icon: '⚙️',
    content: `MLOps brings DevOps practices to machine learning, enabling reliable, scalable, and maintainable ML systems in production environments.`,
    objectives: [
      'Set up ML pipelines and workflows',
      'Deploy models to production',
      'Monitor and maintain ML systems',
      'Implement CI/CD for ML'
    ]
  }
}

interface ModulePageProps {
  params: Promise<{ moduleId: string }>
}

export default async function ModulePage({ params }: ModulePageProps) {
  // Await the params promise
  const resolvedParams = await params
  const moduleId = resolvedParams.moduleId
  
  const moduleContent = moduleData[moduleId as keyof typeof moduleData] || {
    title: 'Module Not Found',
    description: 'The requested module could not be found.',
    duration: '0 hours',
    level: 'Beginner',
    progress: 0,
    color: 'gray',
    gradient: 'from-gray-500 to-gray-700',
    icon: '❓',
    content: 'Please check the module URL and try again.',
    objectives: []
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/learn"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold"
        >
          <span>←</span>
          <span>Back to Learning Hub</span>
        </Link>

        {/* Module Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-white/20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <div className="text-4xl">{moduleContent.icon}</div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">{moduleContent.title}</h1>
                <p className="text-xl text-gray-600 mt-2">{moduleContent.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 px-4 py-2 rounded-xl">
                <div className="text-sm text-blue-600">Duration</div>
                <div className="font-semibold text-gray-900">{moduleContent.duration}</div>
              </div>
              <div className="bg-purple-50 px-4 py-2 rounded-xl">
                <div className="text-sm text-purple-600">Level</div>
                <div className="font-semibold text-gray-900">{moduleContent.level}</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-700">Module Progress</span>
              <span className="font-semibold text-gray-900">{moduleContent.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`h-3 rounded-full bg-gradient-to-r ${moduleContent.gradient} transition-all duration-1000 ease-out`}
                style={{ width: `${moduleContent.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="flex space-x-3">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {moduleId}
            </span>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Active
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              moduleContent.color === 'blue' ? 'bg-blue-100 text-blue-800' :
              moduleContent.color === 'green' ? 'bg-green-100 text-green-800' :
              moduleContent.color === 'purple' ? 'bg-purple-100 text-purple-800' :
              moduleContent.color === 'orange' ? 'bg-orange-100 text-orange-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {moduleContent.level}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Content */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Learning Content</h2>
              <div className="prose max-w-none">
                <div className="mb-6 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {moduleContent.content}
                  </p>
                </div>
              </div>

              {/* Detailed Content Sections */}
              <div className="space-y-6 mt-8">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">📚 Key Topics Covered</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {moduleContent.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">🎯 Learning Outcomes</h3>
                  <p className="text-gray-700">
                    {`By completing this module, you'll be able to apply ${moduleContent.title.toLowerCase()} concepts to real-world problems and build a strong foundation for advanced topics.`}
                  </p>
                </div>
              </div>

              {/* Practice Exercise */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🧪 Practice Exercise</h3>
                <p className="text-gray-700 mb-4 text-lg">
                  {`Ready to test your knowledge? Take the assessment to reinforce what you've learned and track your progress.`}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href={`/learn/assessments/${moduleId}`}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-semibold text-center"
                  >
                    Take Assessment
                  </Link>
                  <button className="border-2 border-blue-500 text-blue-600 px-6 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold">
                    Practice Exercises
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Learning Objectives */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 Learning Objectives</h3>
              <ul className="space-y-3">
                {moduleContent.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="bg-green-500 text-white rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Module Resources */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">📖 Resources</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📹</span>
                    <span className="font-semibold text-gray-900">Video Lectures</span>
                  </div>
                  <span className="text-sm text-gray-600">45 min</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">📖</span>
                    <span className="font-semibold text-gray-900">Study Notes</span>
                  </div>
                  <span className="text-sm text-gray-600">30 min</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition-all">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">💻</span>
                    <span className="font-semibold text-gray-900">Code Examples</span>
                  </div>
                  <span className="text-sm text-gray-600">60 min</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl shadow-2xl p-6 text-white">
              <h3 className="text-2xl font-bold mb-6">🚀 Quick Actions</h3>
              <div className="space-y-4">
                <button className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-4 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105 font-semibold">
                  Mark as Complete
                </button>
                <Link 
                  href={`/learn/assessments/${moduleId}`}
                  className="block w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-4 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105 font-semibold text-center"
                >
                  Take Assessment
                </Link>
                <button className="w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-4 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                  Save Progress
                </button>
              </div>
            </div>

            {/* Progress Tips */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl p-6 text-white">
              <h3 className="text-2xl font-bold mb-4">💡 Pro Tips</h3>
              <ul className="space-y-2 text-white/90">
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Complete all practice exercises
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Take notes for revision
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Join study groups
                </li>
                <li className="flex items-center">
                  <span className="mr-2">•</span>
                  Review previous concepts
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}