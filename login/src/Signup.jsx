import {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import {useNavigate} from "react-router-dom";

function SignUp(){
const[name,setName]=useState('');
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');
const navigate=useNavigate('');
const handleSubmit=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:4000/register',{name,email,password})
    .then(result=>{console.log(result)
      navigate('/login')
    })
    .catch(err=>console.log(err))

}
  return (
    <div>
       <nav style={styles.navbar}>
          <h1 style={styles.title}>E-Commerce Application</h1>

      </nav>
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#6c757d' }}>
      <div className="register-container bg-white p-4 rounded shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">SignUp</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-bold">Name</label>
            <input type="text" id="name" className="form-control" placeholder="Enter Name"  onChange={(e)=>setName(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email</label>
            <input type="email" id="email" className="form-control" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">Password</label>
            <input type="password" id="password" className="form-control" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>

        <div className="login-link text-center mt-4">
          <p>Already Have an Account?</p>
          <Link to="/login" type="button" className="btn btn-outline-secondary w-100" onClick={() => window.location.href = '/login'}>
            Login
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};
const styles = {
  navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#333',
      color: 'white',
  },
  title: {
      fontSize: '24px',
      margin: 0,
  },
  button: {
      padding: '8px 16px',
      fontSize: '16px',
      color: '#333',
      backgroundColor: '#f0f0f0',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
  },
};

export default SignUp;