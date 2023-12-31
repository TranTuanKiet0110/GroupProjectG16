import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import '../../css/customer/signin.css'
import { Link } from "react-router-dom";


function CustomerLoginForm() {
  const { authState } = useContext(AuthContext);
  const { isAuthenticated } = authState;
  const [loginData, setLoginData] = useState(
    {
      email: '',
      phone: '',
      password: '',
      loginMethod: 'emailLogin',
    }
  )

  const [loginMethod, setloginMethod] = useState('emailLogin');
  const [message, setMessage] = useState('')

  const onLoginDataChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    })
    // console.log(loginData);
  }

  const { doCustomerLogin } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Call login API
    try {
      const res = await doCustomerLogin(loginData);
      setMessage(res.message);
    } catch (error) {
      console.log(error);
    }
  }

  const onLoginMethodChange = (e) => {
    const method = e.target.value;
    setloginMethod(method);
    if (method === 'emailLogin') {
      setLoginData({
        ...loginData,
        phone: '',
        password: '',
        loginMethod: method,
      })
    } else {
      setLoginData({
        ...loginData,
        email: '',
        password: '',
        loginMethod: method,
      })
    }
    // console.log(method);
  }

  const emailLoginForm =
    <form onSubmit={handleLogin}>
      <div className="form-group mb-2">
        <label htmlFor="loginEmail">Email:</label>
        <input onChange={onLoginDataChange} type="email" className="form-control" id="loginEmail" name="email" placeholder="Enter your email" value={loginData.email} />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="loginPassword">Password:</label>
        <input onChange={onLoginDataChange} type="password" className="form-control" id="loginPassword" name="password" placeholder="Enter your password" value={loginData.password} />
      </div>
  
      <button type="submit" className='button'>Login</button>
  
    </form>

  const phoneLoginForm =
    <form onSubmit={handleLogin}>
      <div className="form-group mb-2">
        <label htmlFor="loginPhone">Phone:</label>
        <input onChange={onLoginDataChange} type="tel" className="form-control" id="loginPhone" name="phone" placeholder="Enter your phone" value={loginData.phone} />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="loginPassword">Password:</label>
        <input onChange={onLoginDataChange} type="password" className="form-control" id="loginPassword" name="password" placeholder="Enter your password" value={loginData.password} />
      </div>
      <button type="submit" className="button">Login</button>
    </form>
  return (
    <>
      {(!isAuthenticated) ? (<>
        <div className='sign-in-main'>
          <div className='sign-in-container'>
            <div className='title'>Sign In</div>
              <div className="form-group mb-2">
                <label htmlFor="loginMethod">Select your login method</label>
                <select onChange={onLoginMethodChange} className="form-control" id="loginMethod">
                  <option value="emailLogin" name="emailLogin">By email</option>
                  <option value="phoneLogin" name="phoneLogin">By phone number</option>
                </select>
              </div>
            {(loginMethod === 'emailLogin') ? emailLoginForm : phoneLoginForm}
            <div>
              <div>
                <div>Not a member yet? <Link to={'/register'}>Register Now</Link></div>
              </div>
              <span>OR</span>
              <button className='button'><Link to={'/signIn'} style={{textDecoration:'none', color:'white'}}>Login as seller/admin</Link></button>

            </div>
            <div className='message'>{message}</div>
          </div>
        </div>
      </>) :
        (<Navigate to="/" replace />)
      }
    </>
  )
}

export default CustomerLoginForm