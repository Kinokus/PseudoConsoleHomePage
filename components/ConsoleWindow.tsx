'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './ConsoleWindow.module.css'

interface ConsoleWindowProps {
  title?: string
  children?: React.ReactNode
  borderStyle?: 'single' | 'double'
  onCommand?: (command: string) => string | void
}

const STORAGE_KEY = 'console_command_history'
const MAX_HISTORY_SIZE = 100

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
  const [savedCommands, setSavedCommands] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // Load command history from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as string[]
          setSavedCommands(parsed)
        } catch (e) {
          console.error('Failed to parse command history from localStorage', e)
        }
      }
    }
  }, [])

  // Save command history to localStorage
  const saveCommandToHistory = (cmd: string) => {
    if (typeof window === 'undefined') return
    
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return

    setSavedCommands(prev => {
      // Remove duplicate if exists and add to end
      const filtered = prev.filter(c => c !== trimmedCmd)
      const updated = [...filtered, trimmedCmd].slice(-MAX_HISTORY_SIZE)
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      } catch (e) {
        console.error('Failed to save command history to localStorage', e)
      }
      
      return updated
    })
  }

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
    const fullCommand = command.trim()

    // Handle clear command specially
    if (cmd === 'clear') {
      setCommandHistory([])
      setCommand('')
      setHistoryIndex(-1)
      inputRef.current?.focus()
      return
    }

    // Save command to history
    saveCommandToHistory(fullCommand)

    // Add command to history
    setCommandHistory(prev => [...prev, { type: 'input', text: fullCommand }])

    // Execute command
    let output = ''
    if (onCommand) {
      const result = onCommand(fullCommand)
      output = result || ''
    } else {
      // Default command handling
      output = `Command: ${fullCommand}`
    }

    if (output) {
      setCommandHistory(prev => [...prev, { type: 'output', text: output }])
    }

    setCommand('')
    setHistoryIndex(-1)
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (savedCommands.length === 0) return
      
      const newIndex = historyIndex === -1 
        ? savedCommands.length - 1 
        : Math.max(0, historyIndex - 1)
      
      setHistoryIndex(newIndex)
      setCommand(savedCommands[newIndex])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex === -1) return
      
      const newIndex = historyIndex + 1
      if (newIndex >= savedCommands.length) {
        setHistoryIndex(-1)
        setCommand('')
      } else {
        setHistoryIndex(newIndex)
        setCommand(savedCommands[newIndex])
      }
    }
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
              onChange={(e) => {
                setCommand(e.target.value)
                setHistoryIndex(-1)
              }}
              onKeyDown={handleKeyDown}
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

