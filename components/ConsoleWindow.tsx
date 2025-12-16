'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './ConsoleWindow.module.css'

interface ConsoleWindowProps {
  title?: string
  children?: React.ReactNode
  borderStyle?: 'single' | 'double'
  onCommand?: (command: string) => string | void
}

export default function ConsoleWindow({ 
  title = 'Console', 
  children,
  borderStyle = 'single',
  onCommand
}: ConsoleWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false)
  const [command, setCommand] = useState('')
  const [commandHistory, setCommandHistory] = useState<Array<{ type: 'input' | 'output', text: string }>>([
    { type: 'output', text: 'Welcome to the console' },
    { type: 'output', text: 'Type your commands here...' }
  ])
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll to bottom when new output is added
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [commandHistory])

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim()) return

    const cmd = command.trim().toLowerCase()

    // Handle clear command specially
    if (cmd === 'clear') {
      setCommandHistory([])
      setCommand('')
      inputRef.current?.focus()
      return
    }

    // Add command to history
    setCommandHistory(prev => [...prev, { type: 'input', text: command }])

    // Execute command
    let output = ''
    if (onCommand) {
      const result = onCommand(command)
      output = result || ''
    } else {
      // Default command handling
      output = `Command: ${command}`
    }

    if (output) {
      setCommandHistory(prev => [...prev, { type: 'output', text: output }])
    }

    setCommand('')
    inputRef.current?.focus()
  }

  return (
    <div className={styles.consoleWindow}>
      {/* Top Menu Bar */}
      <div className={styles.menuBar}>
        <div className={styles.menuItem}>File</div>
        <div className={styles.menuItem}>Edit</div>
        <div className={styles.menuItem}>View</div>
        <div className={styles.menuItem}>Terminal</div>
        <div className={styles.menuItem}>Help</div>
      </div>

      {/* Window Frame */}
      <div className={`${styles.frame} ${styles[`border${borderStyle === 'double' ? 'Double' : 'Single'}`]}`}>
        {/* Content Area */}
        <div className={styles.content}>
          <div className={styles.inner} ref={outputRef}>
            {children || (
              <div className={styles.output}>
                {commandHistory.map((item, index) => (
                  <div key={index} className={styles.line}>
                    {item.type === 'input' ? (
                      <>
                        <span className={styles.prompt}>$</span>{' '}
                        <span>{item.text}</span>
                      </>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Command Input */}
        <div className={styles.commandInput}>
          <form onSubmit={handleCommand} className={styles.commandForm}>
            <span className={styles.prompt}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className={styles.input}
              placeholder="Enter command..."
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  )
}

