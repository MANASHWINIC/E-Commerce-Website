import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Signup'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './login';
import Home from './Home';
import Admin from './Admin';
import Addproduct from './Addproduct';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element ={<SignUp/>}></Route>
      <Route path='/login' element ={<Login/>}></Route>
      <Route path='/home' element ={<Home/>}></Route>
      <Route path='/admin' element={<Admin/>}></Route>
      <Route path='/addaproduct' element={<Addproduct/>}></Route>

      
    </Routes>
    </BrowserRouter>
  )
}

export default App
