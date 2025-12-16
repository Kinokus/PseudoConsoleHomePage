import ConsoleWindow from '@/components/ConsoleWindow'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#000', padding: '20px' }}>
      <ConsoleWindow title="PseudoConsole Terminal" borderStyle="single">
        <div className="console-output" style={{ fontFamily: 'monospace' }}>
          <div style={{ marginBottom: '4px' }}>
            <span style={{ color: '#00ff00', fontWeight: 'bold' }}>$</span>{' '}
            <span style={{ color: '#00ff00' }}>Welcome to PseudoConsole</span>
          </div>
          <div style={{ marginBottom: '4px' }}>
            <span style={{ color: '#00ff00', fontWeight: 'bold' }}>$</span>{' '}
            <span style={{ color: '#00ff00' }}>Console window with CSS borders</span>
          </div>
          <div style={{ marginBottom: '4px' }}>
            <span style={{ color: '#00ff00', fontWeight: 'bold' }}>$</span>{' '}
            <span style={{ color: '#00ff00' }}>Using monospace font for consistent display</span>
          </div>
          <div style={{ marginBottom: '4px' }}>
            <span style={{ color: '#00ff00', fontWeight: 'bold' }}>$</span>{' '}
            <span style={{ color: '#00ff00' }}>Borders are styled with CSS, not pseudographics</span>
          </div>
          <div style={{ marginBottom: '4px' }}>
            <span style={{ color: '#00ff00', fontWeight: 'bold' }}>$</span>{' '}
            <span style={{ color: '#00ff00', animation: 'blink 1s infinite' }}>█</span>
          </div>
        </div>
      </ConsoleWindow>
    </main>
  )
}

