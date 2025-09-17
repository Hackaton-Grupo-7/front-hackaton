import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar arriba */}
      <Navbar />

      {/* Contenido principal */}
      <main style={{ flexGrow: 1, padding: '2rem', textAlign: 'center' }}>
        <div>
          <a href="https://vite.dev" target="_blank" rel="noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>

        <h1>Vite + React</h1>

        <div className="card" style={{ margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>

        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </main>

      {/* Footer abajo */}
      <Footer />
    </div>
  )
}

export default App
