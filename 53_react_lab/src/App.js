import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Todo from './Todo'
import Home from './Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/todo' element={<Todo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App