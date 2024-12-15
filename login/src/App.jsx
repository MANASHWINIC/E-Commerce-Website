import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './Signup'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './login';
import Home from './Home';

function App() {
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/register' element ={<SignUp/>}></Route>
      <Route path='/login' element ={<Login/>}></Route>
      <Route path='/home' element ={<Home/>}></Route>

      
    </Routes>
    </BrowserRouter>
  )
}

export default App
