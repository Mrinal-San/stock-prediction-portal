import { useState } from 'react'
import './assets/css/style.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import{ BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './components/Register'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      <Footer />
      </Router>
    </>
  )
}

export default App
