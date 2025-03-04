import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../ThemeContext';
import axios from 'axios';
const Login = () => {
  const baseUrl = 'http://127.0.0.1:8000/api/';
  const [formError, setFormError]= useState(false);
  const [errorMsg, setErrorMsg] = useState('');
 
  const { theme } = useContext(ThemeContext);

  const [loginFormData, setLoginFormData] = useState({
    "username": '',
    "password": ''
  });

  const inputHandler = (event) => {
    setLoginFormData({
      ...loginFormData,
      [event.target.name]: event.target.value
    })
  };

    

  const submitHandler = (event) => {
    const formData = new FormData();
  
    formData.append('username', loginFormData.username);
    formData.append('password', loginFormData.password);
    
    axios.post(baseUrl+'customer/login/',formData)
    .then(function(response){
      if(response.data.bool==false){
        setFormError(true);
        setErrorMsg(response.data.msg)
      }else{
        localStorage.setItem('customer_login',true);

        localStorage.setItem('customer_username',response.data.user);
        setFormError(false);
        setErrorMsg('')
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  
  const checkCustomer = localStorage.getItem('customer_login');
  if (checkCustomer){
    window.location.href = '/customer/dashboard';
  }

  const buttonEnable = (loginFormData.username != '') && (loginFormData.password != '')

  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {formError && 
            <p className='text-danger'>{errorMsg}</p>
        }
        <form className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor='username' className="block mb-1">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your email"
              onChange={inputHandler}
              value={loginFormData.username}
              className="w-full px-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
            />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={inputHandler}
              value={loginFormData.password}
              className="w-full px-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
            />
          </div>
          {/* Submit Button */}
          <button
            type="button"
            disabled={!buttonEnable}
            onClick={submitHandler}
            className={`w-full py-2 px-4 rounded-lg shadow-md text-white ${buttonEnable
                ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600'
                : 'bg-gray-400 '
              }`}
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center">
          Don't have an account?{' '}
          <a href="/customer/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
