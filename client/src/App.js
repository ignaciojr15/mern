import React,{Fragment,useEffect} from 'react';
import { Route,Routes} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import {Landing} from './components/layout/Landing'
import './App.css';
import  Login  from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
//redux
import { Provider } from 'react-redux';
import store from './store';
import { setAuthToken } from './Utils/setAuthToken';
import { loadUser } from './action/auth';
import { Dashboard } from './components/Dashboard/Dashboard ';
if(localStorage.token){
  setAuthToken(localStorage.token);
}
const App=()=> {
  useEffect(()=>{
     store.dispatch(loadUser())
    },[]) 
  return (
    <Provider store={store}>
    <Fragment>

      <Navbar/>
      <section className='container'>
        <Alert /> 
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<h1>404 page not found</h1>} />
        </Routes> 
      </section>

    </Fragment>
    </Provider>
  );
}

export default App;
