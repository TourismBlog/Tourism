import React, { useState } from "react";
import axios from "axios";
import "./Styles.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    // confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.user_email || !emailRegex.test(formData.user_email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.user_password || formData.user_password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return Object.keys(errors).length === 0;
  };

  const redirectToLogin = () => {
    window.location.href = "/login";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
         await axios.post("http://localhost:8080/register", formData);
        // console.log(response.data.message);
        redirectToLogin();
        console.log(formData);
      } catch (error) {
        console.error("Error registering user:", error);
        // setErrors(error.response.data.errors);
      }
    }
  };

  const divStyle = {
    backgroundImage: 'url("https://vid.alarabiya.net/images/2017/08/30/40b212cc-b7b9-4d48-9421-c78b56987e0f/40b212cc-b7b9-4d48-9421-c78b56987e0f_16x9_1200x676.jpg")', // قم بتغيير المسار إلى مكان صورة الخلفية الخاصة بك
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat', 
  };

  return (
    <div style={divStyle} className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-extrabold text-black text-center">Register</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="user_name" className="sr-only">
                Username
              </label>
              <input
                id="user_name"
                name="user_name"
                type="text"
                autoComplete="user_name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border text-blue-900 border-blue-900 placeholder-blue-900 text-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10"
                placeholder="Username"
                value={formData.user_name}
                onChange={handleInputChange}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>
            <div>
              <label htmlFor="user_email" className="sr-only">
                Email address
              </label>
              <input
                id="user_email"
                name="user_email"
                type= "text"
                autoComplete="user_email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border text-blue-900 border-blue-900 placeholder-blue-900 text-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10"
                placeholder="user_email"
                value={formData.user_email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="user_Password" className="sr-only">
                Password
              </label>
              <input
                id="user_password"
                name="user_password"
                type= "text"
                autoComplete="user_password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border text-blue-900 border-blue-900 placeholder-blue-900 text-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10"
                placeholder="user_Password"
                value={formData.user_password}
                onChange={handleInputChange}
              />
              {errors.user_Password && <p className="text-red-500 text-xs mt-1">{errors.user_Password}</p>}
            </div>
            {/* <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border text-blue-900 border-blue-900 placeholder-blue-900 text-sm focus:outline-none focus:ring-blue-400 focus:border-blue-400 focus:z-10"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
              )}
            </div> */}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blue-950 bg-white hover:bg-white-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-950"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-blue-900 mt-2">
                    You already have account? 
                    <a href="/Login" className="text-blue-400 hover:underline">Login here</a>
                </p>
            </div>
        </div>
   
  );
};

export default RegisterForm;
