'use client'

import { useState } from 'react'

const commonQuestions = [
  "How long should my resume be?",
  "What skills should I include for a machine learning role?",
  "How do I make my resume ATS-friendly?",
  "Should I include personal projects?",
  "How to write a good professional summary?"
]

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your resume assistant 🤖 I can help you build the perfect resume for tech roles. Ask me anything!", isUser: false }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { text: input, isUser: true }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "For a strong resume, focus on quantifiable achievements. Instead of 'Worked on projects', try 'Developed 3 machine learning models that improved accuracy by 25%'.",
        "Make sure to include relevant technical skills for your target role. For ML roles, highlight Python, TensorFlow, PyTorch, and any specific domains like NLP or Computer Vision.",
        "Your professional summary should be 2-3 sentences highlighting your key strengths and what you bring to the role. Tailor it for each job application.",
        "Include personal projects that demonstrate your skills, especially if you're early in your career. Describe the technologies used and the impact or learning outcomes.",
        "Use the STAR method (Situation, Task, Action, Result) to structure your experience bullet points for maximum impact.",
        "Keep your resume to 1-2 pages maximum. Focus on your most relevant experiences and achievements.",
        "Start bullet points with strong action verbs like 'Developed', 'Implemented', 'Optimized', 'Led', 'Created'.",
        "Include numbers and metrics wherever possible - they make your achievements more concrete and impressive.",
        "Tailor your resume for each job by including keywords from the job description. This helps with ATS systems.",
        "Don't forget to include links to your GitHub, portfolio, or LinkedIn profile - they provide valuable context."
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setMessages(prev => [...prev, { text: randomResponse, isUser: false }])
      setIsLoading(false)
    }, 1000)
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
    // Auto-send after setting the question
    setTimeout(() => {
      const userMessage = { text: question, isUser: true }
      setMessages(prev => [...prev, userMessage])
      setInput('')
      setIsLoading(true)

      // Simulate AI response
      setTimeout(() => {
        const responses: { [key: string]: string } = {
          "How long should my resume be?": "For students and early-career professionals, 1 page is ideal. For experienced professionals with 5+ years, 2 pages is acceptable. Focus on quality over quantity!",
          "What skills should I include for a machine learning role?": "For ML roles: Python, TensorFlow/PyTorch, scikit-learn, pandas, numpy, SQL, AWS/GCP, Docker, Git. Also include specific domains like NLP, Computer Vision, or Reinforcement Learning if relevant.",
          "How do I make my resume ATS-friendly?": "Use standard section headings, include keywords from job descriptions, avoid graphics/tables, use common fonts, and save as PDF. Our analyzer will check your ATS compatibility!",
          "Should I include personal projects?": "Absolutely! Personal projects demonstrate initiative and practical skills. Include 2-3 relevant projects with descriptions of technologies used and what you accomplished.",
          "How to write a good professional summary?": "Keep it 2-3 sentences. Start with your role/experience, mention key skills/technologies, and highlight what value you bring. Tailor it for each job application."
        }
        
        const response = responses[question] || "That's a great question! For resume building, focus on clarity, relevance, and quantifiable achievements. Make sure each section demonstrates your value to potential employers."
        setMessages(prev => [...prev, { text: response, isUser: false }])
        setIsLoading(false)
      }, 1000)
    }, 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-linear-to-r from-purple-600 to-blue-600 text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center text-2xl hover:scale-110"
          title="Chat with Resume Assistant"
        >
          🤖
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="bg-linear-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white text-purple-600 rounded-full flex items-center justify-center font-bold text-sm">
                AI
              </div>
              <div>
                <h3 className="font-bold text-sm">Resume Assistant</h3>
                <p className="text-purple-100 text-xs">Ready to help! ✨</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 text-lg transition-colors"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[300px]">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                  message.isUser 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  {message.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none p-3">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="px-4 py-2 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-2">Quick questions:</div>
            <div className="flex flex-wrap gap-1">
              {commonQuestions.slice(0, 3).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded-lg text-xs hover:bg-gray-200 transition-all"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about resume building..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}