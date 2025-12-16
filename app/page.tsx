'use client'

import ConsoleWindow from '@/components/ConsoleWindow'

export default function Home() {
  const handleCommand = (command: string): string => {
    const cmd = command.trim().toLowerCase()
    
    switch (cmd) {
      case 'help':
        return 'Available commands: help, clear, echo, date, version'
      case 'date':
        return new Date().toLocaleString()
      case 'version':
        return 'PseudoConsole v1.0.0'
      default:
        if (cmd.startsWith('echo ')) {
          return command.substring(5)
        }
        return `Command not found: ${command}. Type 'help' for available commands.`
    }
  }

  return (
    <main style={{ minHeight: '100vh', background: '#000', padding: '20px' }}>
      <ConsoleWindow 
        title="PseudoConsole Terminal" 
        borderStyle="single"
        onCommand={handleCommand}
      />
    </main>
  )
}

