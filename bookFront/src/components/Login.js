import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setSuccessMessage('Login exitoso. Redirigiendo a la Landing Page...');
      setTimeout(() => {
        navigate('/landing'); // Redirige a la landing page después de 2 segundos
      }, 2000);
      
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); 
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <form className="border p-4 rounded shadow" style={{ width: '400px', backgroundColor: '#f8f9fa' }} onSubmit={handleLogin}>
        <h2 className="text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>} 
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input 
            type="text" 
            className="form-control" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
        <div className="mt-3 text-center">
          <button type="button" className="btn btn-link" onClick={handleRegisterRedirect}>
            Don't have an account? Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
