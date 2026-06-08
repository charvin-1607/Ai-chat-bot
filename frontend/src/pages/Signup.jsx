import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import {
  signupRequestStart,
  signupRequestSuccess,
  signupRequestFail
} from "../redux/auth/authSlice";

import { signupAPI } from "../services/authFunction";

import { Link, useNavigate } from "react-router-dom";


function Signup() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { signupRequest } = useSelector(
    (state) => state.auth
  );


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    dispatch(signupRequestStart());

    try {

      const res = await signupAPI(formData);

      if (!res || res.error || res.success === false) {

        dispatch(
          signupRequestFail(res.message || "Signup failed")
        );
        alert("error message = " + (res.message || "Signup failed"));
      }


      dispatch(signupRequestSuccess(res));

      setFormData({
        name: "",
        email: "",
        password: ""
      });

      navigate("/login");


    } catch (error) {

      dispatch(signupRequestFail(error.message));
      alert("inside catch block = ", error.message);

    }

  };


  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-indigo-900 to-purple-900">

      <div className="w-full max-w-md p-[05px] rounded-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">

        <div className="bg-zinc-950 rounded-3xl p-8">

          <h1 className="text-4xl font-bold text-center text-white mb-2">
            Create Account
          </h1>

          <p className="text-zinc-400 text-center mb-8">
            Build your AI journey
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
            />

            {/* <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
            /> */}


            <div className="relative">

              <input
                 type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 pr-12 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30 transition-all"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>


            <p className="text-xs text-gray-400 leading-relaxed px-1">
              Password must be at least
              <span className="text-violet-400 font-medium"> 6 characters </span>
              long. Uppercase, lowercase, numbers and special characters are recommended.
            </p>


            <button
              type="submit"
              disabled={signupRequest.loading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-purple-500/30"
            >
              {
                signupRequest.loading
                  ? "Signing up..."
                  : "Create Account"
              }
            </button>

          </form>

          {
            signupRequest.success && (
              <p className="text-green-400 text-center mt-4">
                {signupRequest.message}
              </p>
            )
          }

          {
            signupRequest.error && (
              <p className="text-red-400 text-center mt-4">
                {signupRequest.error}
              </p>
            )
          }

          <p className="text-zinc-400 text-center mt-6">
            Already have an account?

            <Link
              to="/login"
              className="ml-2 text-pink-400 hover:text-purple-400 transition"
            >
              Login
            </Link>
          </p>

        </div>

      </div>

    </div>
  );

}

export default Signup;