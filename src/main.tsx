import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// No <StrictMode> here on purpose: it renders and runs effects twice in development,
// which would make the screen disagree with the tests. Exercise 02 explains it.
createRoot(document.getElementById('root')!).render(<App />)
