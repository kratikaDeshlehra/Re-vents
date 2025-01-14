import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/Layout/style.css'
import App from './app/Layout/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
