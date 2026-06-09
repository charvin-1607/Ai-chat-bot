import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  loginRequestStart,
  loginRequestSuccess,
  loginRequestFail
} from "../redux/auth/authSlice";

import { loginAPI } from "../services/authFunction";

import { Link, useNavigate } from "react-router-dom";


function Login() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loginRequest } = useSelector(
    (state) => state.auth
  );


  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    dispatch(loginRequestStart());

    try {

      const res = await loginAPI(formData.email,formData.password);

      if (!res || res.error) {

        dispatch(loginRequestFail(res.message || "Login failed"));
        alert("error message = " + (res.message || "Login failed"));
        return;
      }

      dispatch(loginRequestSuccess(res));
      alert(res.message || "Login successful");


      setFormData({
        email: "",
        password: ""
      });


      navigate("/chat");


    } catch (error) {

      dispatch(
        loginRequestFail(error.message));
        alert("error message inside catch block = " + error.message);

    }

  };


  
  return(

    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950">

    <div className="w-full max-w-md p-[2px] rounded-3xl bg-gradient-to-r from-violet-500 to-indigo-500">
  
      <div className="bg-black/90 rounded-3xl p-6 sm:p-8">
  
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white">
          Welcome Back
        </h1>
  
        <p className="text-center text-gray-400 mt-2 mb-8">
          Sign in to your account
        </p>
  
        <form onSubmit={handleSubmit} className="space-y-4">
  
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none"
          />
  
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none"
          />
  
          <button
            type="submit"
            disabled={loginRequest.loading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-xl font-semibold transition-all"
          >
            {loginRequest.loading ? "Logging in..." : "Login"}
          </button>
  
        </form>
  
        <p className="text-center text-gray-400 mt-6">
          Don't have an account?
          <Link
            to="/signup"
            className="ml-2 text-violet-400 hover:text-violet-300"
          >
            Sign Up
          </Link>
        </p>
  
      </div>
  
    </div>
  
  </div>
  );
}

export default Login; 