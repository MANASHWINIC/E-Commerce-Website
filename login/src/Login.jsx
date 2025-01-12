import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to track login errors
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors before making the request

    axios.post('http://localhost:4000/login', { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === 'Success') {
          if (email === "admin@gmail.com") {
            navigate('/admin'); // Redirect to admin page
          } else {
            navigate('/home'); // Redirect to home page for other users
          }
        } else {
          setError('Incorrect email or password'); // Set error if login fails
        }
      })
      .catch((err) => {
        console.log(err);
        setError('Incorrect email or password'); // Handle network errors or server issues
      });
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <h1 style={styles.title}>E-Commerce Application</h1>
      </nav>
      <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#6c757d' }}>
        <div className="register-container bg-white p-4 rounded shadow" style={{ maxWidth: '400px', width: '100%' }}>
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}

            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>

          <div className="login-link text-center mt-4">
            <p>Don't Have an Account?</p>
            <Link to="/register" className="btn btn-outline-secondary w-100">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

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
};

export default Login;
