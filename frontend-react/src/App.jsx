import { useState } from 'react'
import './assets/css/style.css'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import{ BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import AuthProvider from './AuthProvider'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AuthProvider>
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      <Footer />
      </Router>
    </AuthProvider>
    </>
  )
}

export default App
