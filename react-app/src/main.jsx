import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>ADR Gate Test</div>
    <App />
  </StrictMode>,
)
console.log('test')
console.log('new ADR required test')
console.log('minor tweak')
console.log('app booted')
