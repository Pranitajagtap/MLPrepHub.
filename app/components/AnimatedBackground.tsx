'use client'

export default function AnimatedBackground() {
  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        {/* ML-Themed Floating Elements */}
        <div className="absolute top-24 left-16 text-3xl opacity-15 animate-gentle-float">📈</div>
        <div className="absolute top-44 right-24 text-2xl opacity-20 animate-gentle-float animation-delay-1500">🔢</div>
        <div className="absolute bottom-36 left-20 text-4xl opacity-10 animate-gentle-float animation-delay-3000">🤖</div>
        <div className="absolute bottom-28 right-32 text-3xl opacity-15 animate-gentle-float animation-delay-4500">⚡</div>
        <div className="absolute top-1/2 left-1/3 text-2xl opacity-20 animate-gentle-float animation-delay-6000">🎯</div>
        <div className="absolute top-1/3 right-1/4 text-3xl opacity-15 animate-gentle-float animation-delay-7500">🔍</div>
        
        {/* Subtle dots */}
        <div className="absolute top-32 left-1/4 w-2 h-2 bg-blue-300 rounded-full opacity-30 animate-gentle-float"></div>
        <div className="absolute bottom-40 right-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-25 animate-gentle-float animation-delay-2000"></div>
      </div>
      
      <style jsx>{`
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(2deg); }
          50% { transform: translateY(-4px) rotate(0deg); }
          75% { transform: translateY(-12px) rotate(-2deg); }
        }
        .animate-gentle-float {
          animation: gentle-float 8s ease-in-out infinite;
        }
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        .animation-delay-4500 {
          animation-delay: 4.5s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        .animation-delay-7500 {
          animation-delay: 7.5s;
        }
      `}</style>
    </>
  )
}