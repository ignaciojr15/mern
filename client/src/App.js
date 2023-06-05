import React,{Fragment} from 'react';
import {Route,Routes} from 'react-router-dom'
import {Navbar} from './components/layout/Navbar'
import {Landing} from './components/layout/Landing'
import './App.css';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import Alert from './components/layout/Alert';
//redux
import { Provider } from 'react-redux';
import store from './store';
function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
