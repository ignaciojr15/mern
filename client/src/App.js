import React,{Fragment} from 'react';
import {Route,Routes} from 'react-router-dom'
import {Navbar} from './components/layout/Navbar'
import {Landing} from './components/layout/Landing'
import './App.css';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
function App() {
  return (
    <Fragment>
      <Navbar/>
      <section className='container'>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Landing />} />
        </Routes>
      </section>
    </Fragment>
  );
}

export default App;
