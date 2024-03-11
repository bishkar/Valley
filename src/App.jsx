import { useState } from 'react'
import './App.css'

import { Route, Routes } from 'react-router-dom'

import { Mainpage } from './Pages/Main.jsx'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Mainpage />} />
      </Routes>
    </div>
  )
}

export default App
