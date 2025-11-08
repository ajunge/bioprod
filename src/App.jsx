import './App.css'

function App() {
  return (
    <div className="App" style={{ padding: '20px', minHeight: '100vh' }}>
      <header className="App-header">
        <h1 style={{ fontSize: '3rem', color: '#10b981', marginBottom: '1rem' }}>
          BioProd
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
          Productos Biodinámicos de Chile
        </p>
        <div className="info-box" style={{
          background: '#f3f4f6',
          border: '2px solid #10b981',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>
            🌱 Proyecto PWA React
          </h2>
          <p style={{ fontSize: '1rem', color: '#4b5563', marginBottom: '0.5rem' }}>
            Base del proyecto lista para desarrollo
          </p>
          <p style={{ fontSize: '1rem', color: '#4b5563' }}>
            Datos disponibles en la carpeta <code style={{
              background: '#e5e7eb',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              color: '#10b981'
            }}>datos/</code>
          </p>
        </div>
      </header>
    </div>
  )
}

export default App
