'use client'

import commandsData from '@/commands.json'
import ConsoleWindow from '@/components/ConsoleWindow'

export default function Home() {
  const handleCommand = (command: string): string => {
    const cmd = command.trim().toLowerCase()
    const commands = commandsData.commands
    
    // Handle help command
    if (cmd === 'help') {
      return commands.help.output
    }
    
    // Handle date command
    if (cmd === 'date') {
      return new Date().toLocaleString()
    }
    
    // Handle version command
    if (cmd === 'version') {
      return commands.version.output
    }
    
    // Handle echo command
    if (cmd.startsWith('echo ')) {
      return command.substring(5)
    }
    
    // Command not found
    const availableCommands = Object.keys(commands).join(', ')
    return `Command not found: ${command}. Type 'help' for available commands.`
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

