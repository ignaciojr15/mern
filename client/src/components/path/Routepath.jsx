import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import { Login } from '../auth/Login';
import { Register } from '../auth/Register';
export const Routepath = () => {
  return (
  
    <Routes>
    <Route  path="/login" component={Login} />
    <Route  path="/resgister" component={Register} />
    </Routes>
  )
}
