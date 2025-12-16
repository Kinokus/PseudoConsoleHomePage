'use client'

import { useState } from 'react'
import styles from './ConsoleWindow.module.css'

interface ConsoleWindowProps {
  title?: string
  children?: React.ReactNode
  borderStyle?: 'single' | 'double'
}

export default function ConsoleWindow({ 
  title = 'Console', 
  children,
  borderStyle = 'single'
}: ConsoleWindowProps) {
  const [isMaximized, setIsMaximized] = useState(false)

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
        {/* Top Border */}
        {/* <div className={styles.borderTop}>
          <span className={styles.title}>{title}</span>
          <span className={styles.controls}>
            <button 
              className={styles.btn}
              onClick={() => setIsMaximized(!isMaximized)}
              aria-label="Maximize"
            >
              □
            </button>
            <button 
              className={styles.btn}
              aria-label="Close"
            >
              ✕
            </button>
          </span>
        </div> */}

        {/* Content Area */}
        <div className={styles.content}>
          <div className={styles.inner}>
            {children || (
              <div className={styles.output}>
                <div className={styles.line}>
                  <span className={styles.prompt}>$</span>{' '}
                  <span>Welcome to the console</span>
                </div>
                <div className={styles.line}>
                  <span className={styles.prompt}>$</span>{' '}
                  <span>Type your commands here...</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Border */}
        {/* <div className={styles.borderBottom}>
          <span className={styles.status}>Ready</span>
        </div> */}
      </div>
    </div>
  )
}

