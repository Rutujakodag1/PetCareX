import React, { useContext, useState } from 'react';
import { ThemeContext } from '../../ThemeContext';
import axios from 'axios';

const Signup = () => {
  const { theme } = useContext(ThemeContext);

  const [formError, setFormError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setsuccessMsg] = useState('');
  const baseUrl = import.meta.env.VITE_API_URL;

  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    role: '',
    mobile: '',
    address: '',
    business_name: '',
    bank_account: ''
  });

  const inputHandler = (event) => {
    setRegisterFormData({
      ...registerFormData,
      [event.target.name]: event.target.value
    });
  };

  const submitHandler = async () => {

    if (registerFormData.password !== registerFormData.confirm_password) {
  setFormError(true);
  setErrorMsg('Passwords do not match');
  setsuccessMsg('');
  return;
}

    const formData = new FormData();
    formData.append('username', registerFormData.username);
    formData.append('email', registerFormData.email);
    // formData.append('mobile', registerFormData.mobile);
    formData.append('password', registerFormData.password);
    formData.append('role', registerFormData.role);
    formData.append('mobile', registerFormData.mobile);
    formData.append('address', registerFormData.address);

    if (registerFormData.role === 'seller') {

      formData.append('business_name', registerFormData.business_name);
      formData.append('bank_account', registerFormData.bank_account);
    }

    try {
      const response = await axios.post(baseUrl + '/register/', formData);
      if (response.data.bool === false) {
        setFormError(true);
        setErrorMsg(response.data.msg);
        setsuccessMsg('');
      } else {
        setRegisterFormData({
          username: '',
          email: '',
          password: '',
          role: '',
          mobile: '',
          address: '',
          business_name: '',
          bank_account: ''
        });
        setFormError(false);
        setsuccessMsg('Thank you for registration... You can login now');
        setErrorMsg('');
      }
    } catch (error) {
      console.error(error);
      setFormError(true);
      if (error.response && error.response.data && error.response.data.msg) {
        setErrorMsg(error.response.data.msg);
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
      setsuccessMsg('');
    }
  };


  // const checkCustomer = localStorage.getItem('customer_login');
  // if (checkCustomer) {
  //   window.location.href = '/customer/dashboard';
  // }


  useEffect(() => {
  const access = localStorage.getItem("access");
  setIsAuthenticated(!!access);
}, []);


  const buttonEnable =
    registerFormData.username.trim() !== '' &&
    registerFormData.email.trim() !== '' &&
    registerFormData.password.trim() !== '' &&
    registerFormData.confirm_password.trim() !== '' &&
    registerFormData.role.trim() !== '' &&
    (
      registerFormData.role !== 'seller' ||
      (
        registerFormData.mobile.trim() !== '' &&
        registerFormData.address.trim() !== '' &&
        registerFormData.business_name.trim() !== '' &&
        registerFormData.bank_account.trim() !== ''
      )
    );


  return (
    <div className={`min-h-screen flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <p>
          <span className="font-bold">Note</span>: All fields are required
        </p>
        {successMsg && <p className="text-green-500">{successMsg}</p>}
        {formError && <p className="text-red-500">{errorMsg}</p>}
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="username" className="block mb-1">Username</label>
            <input
              type="text"
              name='username'
              id="username"
              onChange={inputHandler}
              value={registerFormData.username}
              placeholder="Enter username"
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
            <label htmlFor="role" className="block mb-1">Role</label>
            <select
              name="role"
              value={registerFormData.role}
              onChange={inputHandler}
              className="w-full px-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Role</option>
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <div>
            <label htmlFor="mobile" className="block mb-1">Mobile Number</label>
            <input
              type="text"
              id="mobile"
              name='mobile'
              onChange={inputHandler}
              value={registerFormData.mobile}
              placeholder="Enter mobile number"
              className="w-full px-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="address" className="block mb-1">Address</label>
            <input
              type="text"
              id="address"
              name='address'
              onChange={inputHandler}
              value={registerFormData.address}
              placeholder="Enter address"
              className="w-full px-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
            />
          </div>
          {registerFormData.role === 'seller' && (
            <>

              <div>
                <label htmlFor="business_name" className="block mb-1">Business/Store Name</label>
                <input
                  type="text"
                  id="business_name"
                  name='business_name'
                  onChange={inputHandler}
                  value={registerFormData.business_name}
                  placeholder="Enter your business name"
                  className="w-full px-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="bankAccount" className="block mb-1">Bank Account Number</label>
                <input
                  type="text"
                  id="bankAccount"
                  name="bank_account"
                  onChange={inputHandler}
                  value={registerFormData.bank_account}
                  placeholder="Enter your bank account number"
                  className="w-full px-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white"
                />
              </div>


            </>
          )}


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
          <div>
  <label htmlFor="confirm_password" className="block mb-1">Confirm Password</label>
  <input
    type="password"
    id="confirm_password"
    name="confirm_password"
    onChange={inputHandler}
    value={registerFormData.confirm_password}
    placeholder="Re-enter your password"
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
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
