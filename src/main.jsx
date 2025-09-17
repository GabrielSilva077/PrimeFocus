import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App'
import './index.css'
import Home from './Home'
import Navbar from './components/Navbar'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar />
    <Home />
  </React.StrictMode>,
)
