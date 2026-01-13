import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ShopContextProvider } from './context/ShopContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx' // <--- IMPORT THIS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider> {/* <--- WRAP HERE */}
      <ShopContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ShopContextProvider>
    </ThemeProvider> {/* <--- CLOSE WRAP */}
  </React.StrictMode>,
)