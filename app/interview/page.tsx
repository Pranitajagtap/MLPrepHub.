export default function InterviewPage() {
  const practiceTypes = [
    {
      type: 'technical',
      title: 'Technical Interview',
      description: 'Practice coding problems and technical concepts',
      questions: 50,
      duration: '2-3 hours',
      difficulty: 'Medium to Hard'
    },
    {
      type: 'hr',
      title: 'HR Interview', 
      description: 'Prepare for behavioral and situational questions',
      questions: 30,
      duration: '1-2 hours',
      difficulty: 'Easy to Medium'
    },
    {
      type: 'system-design',
      title: 'System Design',
      description: 'Practice designing large-scale systems',
      questions: 15,
      duration: '1-2 hours',
      difficulty: 'Hard'
    }
  ]

  const recentPractices = [
    { type: 'Technical', score: 75, date: '2 days ago' },
    { type: 'HR', score: 88, date: '1 week ago' },
    { type: 'System Design', score: 62, date: '2 weeks ago' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interview Preparation</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master technical interviews, HR rounds, and system design with our comprehensive practice platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {practiceTypes.map((practice) => (
            <div key={practice.type} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{practice.title}</h3>
                <p className="text-gray-600 mb-4">{practice.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Questions</span>
                    <span className="font-semibold">{practice.questions}+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-semibold">{practice.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Difficulty</span>
                    <span className="font-semibold">{practice.difficulty}</span>
                  </div>
                </div>

                <a 
                  href={`/interview/practice/${practice.type}`}
                  className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Start Practice
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Practice Sessions</h2>
            <div className="space-y-4">
              {recentPractices.map((practice, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{practice.type} Interview</h3>
                    <p className="text-gray-600 text-sm">{practice.date}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    practice.score >= 80 ? 'bg-green-100 text-green-800' :
                    practice.score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {practice.score}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Interview Tips</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full p-2 mr-4">💡</div>
                <div>
                  <h3 className="font-semibold">Think Out Loud</h3>
                  <p className="text-gray-600 text-sm">Explain your thought process during technical questions</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-green-100 text-green-800 rounded-full p-2 mr-4">🎯</div>
                <div>
                  <h3 className="font-semibold">Ask Questions</h3>
                  <p className="text-gray-600 text-sm">Clarify requirements before solving problems</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-purple-100 text-purple-800 rounded-full p-2 mr-4">⏱️</div>
                <div>
                  <h3 className="font-semibold">Time Management</h3>
                  <p className="text-gray-600 text-sm">Practice with time constraints to build confidence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}