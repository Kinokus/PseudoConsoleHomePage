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
    
    // Handle help <command> - show description of specific command
    if (cmd.startsWith('help ')) {
      const helpCommand = cmd.substring(5).trim()
      if (commands[helpCommand as keyof typeof commands]) {
        const commandInfo = commands[helpCommand as keyof typeof commands]
        return commandInfo.description || `No description available for '${helpCommand}'`
      } else {
        return `Command '${helpCommand}' not found. Type 'help' for available commands.`
      }
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
    
    // Handle history command
    if (cmd === 'history') {
      if (typeof window === 'undefined') {
        return 'History not available'
      }
      
      const stored = localStorage.getItem('console_command_history')
      if (!stored) {
        return 'No command history found.'
      }
      
      try {
        const history = JSON.parse(stored) as string[]
        if (history.length === 0) {
          return 'No command history found.'
        }
        
        return history.map((cmd, index) => `${index + 1}. ${cmd}`).join('\n')
      } catch (e) {
        return 'Error reading command history.'
      }
    }
    
    // Command not found
    const availableCommands = Object.keys(commands).join(', ')
    return `Command not found: ${command}. Type 'help' for available commands.`
  }

  return (
    <main style={{ height: '100vh', background: '#000', display: 'flex', flexDirection: 'column' }}>
      <ConsoleWindow 
        title="PseudoConsole Terminal" 
        borderStyle="single"
        onCommand={handleCommand}
      />
    </main>
  )
}

