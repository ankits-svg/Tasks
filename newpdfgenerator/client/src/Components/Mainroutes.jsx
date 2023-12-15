import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Pdf from './Pdf'
import Basic from './Basic'

const Mainroutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Basic/>}/>
      <Route path='/cert' element={<Pdf/>}/>
    </Routes>
  )
}

export default Mainroutes
