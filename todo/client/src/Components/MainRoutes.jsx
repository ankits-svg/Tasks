import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './Signup'
import Login from './Login'
import Todo from './Todo'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/todo' element={<Todo/>}/>
    </Routes>
  )
}

export default MainRoutes
