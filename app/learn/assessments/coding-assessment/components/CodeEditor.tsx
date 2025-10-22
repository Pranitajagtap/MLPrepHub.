'use client'

// Remove useState import since it's not used anymore

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  height?: string
}

export default function CodeEditor({ value, onChange, language, height = '400px' }: CodeEditorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      
      const newValue = value.substring(0, start) + '  ' + value.substring(end)
      onChange(newValue)
      
      // Set cursor position after the inserted tabs
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2
      }, 0)
    }
  }

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden bg-gray-900">
      {/* Editor Header */}
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
        <div className="text-sm text-gray-300">{language.toUpperCase()} • MLPrepHub Code Editor</div>
        <div className="text-sm text-gray-400">
          Ln 1, Col 1
        </div>
      </div>

      {/* Code Area */}
      <div className="relative">
        <textarea
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full h-full font-mono text-sm text-green-400 bg-gray-900 outline-none resize-none p-4"
          style={{ height }}
          spellCheck="false"
          placeholder={`Write your ${language} code here...`}
        />
        
        {/* Line Numbers */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800 text-gray-500 text-right font-mono text-sm overflow-hidden">
          {value.split('\n').map((_, index) => (
            <div key={index} className="pr-2 leading-6">{index + 1}</div>
          ))}
        </div>
      </div>

      {/* Editor Footer */}
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center text-xs text-gray-400">
        <div>💡 Use Tab for indentation</div>
        <div>🚀 Press Ctrl+Enter to run code</div>
      </div>
    </div>
  )
}