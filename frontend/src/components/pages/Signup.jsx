import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../ThemeContext';
import axios from 'axios';

const Signup = () => {
  const { theme } = useContext(ThemeContext);

  const [formError, setFormError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setsuccessMsg] = useState('');
  const baseUrl = 'http://petcarex-backend.onrender.com/api/';

  const [registerFormData, setRegisterFormData] = useState({
    "name": '',
    "email": '',
    "mobile": '',
    "password": ''
  });

  const inputHandler = (event) => {
    setRegisterFormData({
      ...registerFormData,
      [event.target.name]: event.target.value
    })
  };

  const submitHandler = (event) => {
    const formData = new FormData();

    formData.append('name', registerFormData.name);
    formData.append('email', registerFormData.email);
    formData.append('mobile', registerFormData.mobile);
    formData.append('password', registerFormData.password);

    axios.post(baseUrl + 'customer/login/', formData)
      .then(function (response) {
        if (response.data.bool == false) {
          setFormError(true);
          setErrorMsg(response.data.msg)
        } else {
          setRegisterFormData({
            "name": '',
            "email": '',
            "mobile": '',
            "password": ''
        });
          setFormError(false);
          setsuccessMsg('Thank you for registration... You can login now')
        }

      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const checkCustomer = localStorage.getItem('customer_login');
  if (checkCustomer) {
    window.location.href = '/customer/dashboard';
  }


  const buttonEnable = (registerFormData.name != '') && (registerFormData.email != '') && (registerFormData.mobile != '') && (registerFormData.password != '')


  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <p>
          <span className="font-bold">Note</span>: All fields are required
        </p>
        {successMsg && <p>successMsg</p>}
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <input
              type="text"
              name='name'
              id="name"
              onChange={inputHandler}
              value={registerFormData.name}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              name='email'
              onChange={inputHandler}
              value={registerFormData.email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block mb-1">Mobile</label>
            <input
              type="number"
              id="mobile"
              name='mobile'
              onChange={inputHandler}
              value={registerFormData.mobile}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
            />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              id="password"
              name='password'
              onChange={inputHandler}
              value={registerFormData.password}
              placeholder="Create a password"
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
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center">
          Already have an account?{' '}
          <a href="/customer/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
