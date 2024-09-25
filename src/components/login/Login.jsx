import React, { useState } from 'react';
import img from '../../assests/logo.png';
import cuate from '../../assests/cuate.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login, logout } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Set loading state
    setError(''); // Clear previous errors
  
    try {
      // Perform login request
      const response = await fetch('https://naql.nozzm.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password to login
      });
  
      const data = await response.json(); // Parse response data
  
      if (!response.ok || !data.data.token) {
        setError(data.message || 'Login failed'); 
        setIsLoading(false);
        return;
      }
  
      const token = data.data.token;

      login(token); 

      navigate('/Dashboard'); 
  
    } catch (error) {
   
      setError('Failed to fetch. Please check your network connection and try again.');
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };
  const handleLogout = async () => {
    await logout();
    navigate('/Login');
  };
  
  return (
    <div className="LoginPage row">
      <div className='rightSide col-md-6 bg-white'>
        <div>
          <img src={img} width="100" alt="logo"/>
          <a className='title'>خبراء النفس</a>
        </div>
        <div className='text-center LoginContent'>
          <h1>مرحباً !</h1>
          <p>مرحبا بعودتك! ادخل بياناتك</p>
          <form className='mt-5' onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder=" البريد الالكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="كلمة السر"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className='text-center'>
            <button type="submit" className="LoginPageButton" onClick={handleLogout} disabled={isLoading}>
                {isLoading ? 'جاري التسجيل...' : 'تسجيل الدخول'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='leftSide col-md-6'>
        <img src={cuate} alt="illustration" />
      </div>
    </div>
  );
}

export default Login;
