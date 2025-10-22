import Link from 'next/link'

export default function LearnPage() {
  const mlTracks = [
    {
      id: 'ml-fundamentals',
      title: 'Machine Learning Fundamentals',
      description: 'Master core ML concepts, algorithms, and practical implementations',
      modules: 12,
      duration: '8 weeks',
      progress: 35,
      level: 'Beginner',
      color: 'blue',
      icon: '🧠',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'data-science',
      title: 'Data Science & Analytics',
      description: 'Extract insights and build predictive models from data',
      modules: 10,
      duration: '6 weeks', 
      progress: 20,
      level: 'Beginner',
      color: 'green',
      icon: '📊',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'deep-learning',
      title: 'Deep Learning & Neural Networks',
      description: 'Build and train neural networks for complex problems',
      modules: 15,
      duration: '12 weeks',
      progress: 10,
      level: 'Advanced',
      color: 'purple',
      icon: '🔬',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'mlops',
      title: 'MLOps & Deployment',
      description: 'Deploy and maintain ML models in production',
      modules: 8,
      duration: '6 weeks',
      progress: 5,
      level: 'Intermediate',
      color: 'orange',
      icon: '⚙️',
      gradient: 'from-orange-500 to-red-500'
    }
  ]

  const interviewPrep = [
    {
      id: 'mcq-assessment',
      type: 'MCQ Assessment',
      category: 'Technical & Aptitude',
      questions: 20,
      duration: '60 mins',
      completed: false,
      icon: '📝',
      color: 'blue'
    },
    {
      id: 'coding-assessment',
      type: 'Technical Assessment', 
      category: 'Coding Round',
      questions: 3,
      duration: '90 mins',
      completed: false,
      icon: '💻',
      color: 'green'
    },
    {
      id: 'technical-interview',
      type: 'Technical Interview',
      category: 'Live Coding & Design',
      duration: '45 mins',
      completed: false,
      icon: '🎤',
      color: 'purple'
    },
    {
      id: 'hr-interview',
      type: 'HR Interview',
      category: 'Behavioral Questions',
      questions: 15,
      duration: '30 mins', 
      completed: false,
      icon: '👔',
      color: 'orange'
    }
  ]

  const recentProgress = [
    { topic: 'Linear Regression', score: 85, date: '2 hours ago', type: 'MCQ', trend: 'up' },
    { topic: 'Python Pandas', score: 92, date: '1 day ago', type: 'Coding', trend: 'up' },
    { topic: 'Statistics Fundamentals', score: 78, date: '2 days ago', type: 'MCQ', trend: 'down' }
  ]

  const quickStats = [
    { label: 'Learning Streak', value: '7 days', icon: '🔥', color: 'red' },
    { label: 'Questions Solved', value: '156', icon: '✅', color: 'green' },
    { label: 'Hours Learned', value: '42h', icon: '⏰', color: 'blue' },
    { label: 'Skills Mastered', value: '8/15', icon: '🎯', color: 'purple' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/20 mb-6">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Active Learning Mode</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ML Interview Prep
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Master machine learning concepts through interactive learning tracks and 
            <span className="font-semibold text-blue-600"> real interview simulations</span>
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center space-x-3">
                <div className={`text-2xl ${stat.color === 'red' ? 'text-red-500' : stat.color === 'green' ? 'text-green-500' : stat.color === 'blue' ? 'text-blue-500' : 'text-purple-500'}`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left 2/3 */}
          <div className="lg:col-span-2 space-y-8">
            {/* ML Career Tracks with Gradient Cards */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Career Learning Tracks</h2>
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  Choose your path
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mlTracks.map((track) => (
                  <Link 
                    key={track.id}
                    href={`/learn/tracks/${track.id}`}
                    className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block"
                  >
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${track.gradient}`}></div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{track.icon}</div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                              {track.title}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1">{track.description}</p>
                          </div>
                        </div>
                        <span className={`bg-${track.color}-100 text-${track.color}-800 text-xs px-3 py-1 rounded-full font-semibold`}>
                          {track.level}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>📚 {track.modules} modules</span>
                          <span>⏱️ {track.duration}</span>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-700">Progress</span>
                            <span className="font-semibold text-gray-900">{track.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${track.gradient} transition-all duration-1000 ease-out`}
                              style={{ width: `${track.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 bg-gray-100 text-gray-700 group-hover:text-white py-3 rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-105 text-center">
                          Continue Journey →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Interview Preparation Stages */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Interview Preparation Roadmap</h2>
              <div className="space-y-6">
                {interviewPrep.map((stage) => (
                  <Link
                    key={stage.id}
                    href={`/learn/assessments/${stage.id}`}
                    className={`group relative p-6 rounded-2xl border-2 transition-all duration-500 hover:scale-105 block ${
                      stage.completed 
                        ? 'border-green-200 bg-green-50/80 shadow-lg' 
                        : 'border-gray-200 bg-white/60 hover:border-blue-300 hover:shadow-2xl'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`text-2xl ${stage.completed ? 'text-green-500' : 'text-gray-400'}`}>
                          {stage.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{stage.type}</h3>
                          <p className="text-gray-600">{stage.category}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-2">
                          {stage.questions && `📝 ${stage.questions} questions • `}⏱️ {stage.duration}
                        </div>
                        <div className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-110 inline-block ${
                          stage.completed 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl'
                        }`}>
                          {stage.completed ? '🎉 Review' : 'Start Practice'}
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress indicator */}
                    {!stage.completed && (
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-1000 ease-out"></div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Right 1/3 */}
          <div className="space-y-8">
            {/* Progress Overview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Learning Analytics</h3>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-full border-8 border-gray-200">
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900">42%</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 w-32 h-32 rounded-full border-8 border-transparent border-t-blue-500 border-r-purple-500 transform -rotate-45"></div>
                  </div>
                  <div className="mt-4 text-lg font-semibold text-gray-900">Overall Progress</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700">MCQ Accuracy</span>
                    </div>
                    <span className="font-bold text-gray-900">78%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50/50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700">Coding Complete</span>
                    </div>
                    <span className="font-bold text-gray-900">8/15</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {recentProgress.map((activity, index) => (
                  <div 
                    key={index}
                    className="group p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {activity.topic}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm mt-1">
                          <span className="text-gray-600">{activity.type}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-500">{activity.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          {activity.trend === 'up' ? (
                            <span className="text-green-500 text-lg">↗</span>
                          ) : (
                            <span className="text-red-500 text-lg">↘</span>
                          )}
                          <span className="text-lg font-bold text-gray-900">{activity.score}%</span>
                        </div>
                        <div className="text-xs text-gray-500">Score</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-6 text-white">
              <h3 className="text-2xl font-bold mb-6">Quick Practice</h3>
              <div className="space-y-4">
                <Link 
                  href="/learn/assessments/mcq-assessment"
                  className="block w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-4 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105 font-semibold text-center"
                >
                  🎯 Take MCQ Test
                </Link>
                <Link 
                  href="/learn/assessments/coding-assessment"
                  className="block w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-4 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105 font-semibold text-center"
                >
                  💻 Coding Challenge
                </Link>
                <Link 
                  href="/learn/assessments/technical-interview"
                  className="block w-full bg-white/20 backdrop-blur-sm border border-white/30 text-white py-4 rounded-xl hover:bg-white/30 transition-all duration-300 transform hover:scale-105 font-semibold text-center"
                >
                  🎤 Mock Interview
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}