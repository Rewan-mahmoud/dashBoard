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
  const { login } = useAuth(); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://naql.nozzm.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        setIsLoading(false);
        return;
      }

   
      login(); 
      navigate('/Dashboard');
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch. Please check your network connection and try again.');
      setIsLoading(false);
    }
  };


  return (
    <div className="LoginPage row">
      <div className='rightSide col-md-6 bg-white'>
        <div>
          <img src={img} width="100" alt=""/>
          <a className='title'>خبراء النفس</a>
        </div>
        <div className='text-center LoginContent'>
          <h1 className=''>مرحباً !</h1>
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
              <button type="submit" className="LoginPageButton" disabled={isLoading}>
                {isLoading ? 'جاري التسجيل...' : 'تسجيل الدخول'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='leftSide col-md-6'>
        <img src={cuate} alt="" />
      </div>
    </div>
  );
}

export default Login;