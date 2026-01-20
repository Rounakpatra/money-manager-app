import React, { useContext, useState } from 'react'
import InputField from '../components/InputField.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from "../assets/assets.js";
import { validateEmail } from '../util/validation.js';
import axios from 'axios';
import axiosConfig from '../util/axiosConfig.jsx';
import { API_ENDPOINTS } from '../util/apiEndPoints.js';
import { AppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';

const LogIn = () => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const {setuser} =useContext(AppContext);

  const navigate = useNavigate();


  const handleSubmit = async (e)=>{
    e.preventDefault();

    setisLoading(true);

    //basic validations

    if(!validateEmail(email)){
      seterror("Please enter your email");
      setisLoading(false);
      return;
    }

    if(!password.trim()){
      seterror("Please enter your password");
      setisLoading(false);
      return;
    }

    seterror("");

    //login api call

    try{

      const response = await axiosConfig.post(API_ENDPOINTS.LOGIN,{
        email,
        password,
      });

      const {token,user}=response.data;

      if(token){
        localStorage.setItem("token",token);
        localStorage.setItem("user", JSON.stringify(user));
        
        setuser(user);

        toast.success("LogIn successful.");

        navigate("/dashboard");
      }

    }catch(err){
      
      if(err.response && err.response.data.message){
        seterror(err.response.data.message);
        
      }else{
        seterror(err.message);
        console.log("Something went Wrong",err);
      }

      toast.error("Something went wrong");

    }finally{
      setisLoading(false);
    }

  }


  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">

      {/* Background Image with blur */}
      <img
        src={assets.login_bg}
        alt="Background"
        className="
      absolute inset-0 w-full h-full object-cover
      blur-md scale-105
      transition-transform duration-700 ease-out
      hover:scale-110
    "
      />

      {/* Dark overlay for premium contrast */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 w-full max-w-md px-6">
        <div
          className="
        bg-white/90 backdrop-blur-xl
        rounded-2xl p-8
        border border-white/30
        shadow-[0_20px_50px_rgba(0,0,0,0.25)]
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:shadow-[0_30px_70px_rgba(0,0,0,0.35)]
      "
        >

          <h3
            className="
          text-3xl font-bold text-slate-900 text-center mb-3
          transition-colors duration-200
          hover:text-slate-800
        "
          >
            Welcome Back!
          </h3>

          <p
            className="
          text-sm text-slate-600 text-center mb-2 leading-relaxed
          transition-colors duration-200
          hover:text-slate-700
        "
          >
            LogIn to Continue
          </p>

          {/* form */}

          <form onSubmit={handleSubmit} className="space-y-3">
            

            <div className="grid grid-cols-1 gap-0.0001">
              

              <InputField
                value={email}
                onchange={(e) => setemail(e.target.value)}
                label="Email"
                placeholder="johndoe@example.com"
                type="text"
              />

              <InputField
                value={password}
                onchange={(e) => setpassword(e.target.value)}
                label="Password"
                placeholder="******"
                type="password"
              />

            </div>

            {error && (
              <p
                className="
      text-red-600 text-sm text-center
      bg-red-50/70
      px-4 py-2.5
      rounded-xl
      border border-red-200
      transition-all duration-200
    "
              >
                {error}
              </p>
            )}

            {/* <button type='submit' className="
    w-full py-3 
    rounded-xl
    bg-emerald-600
    text-white text-sm font-semibold
    shadow-md
    transition-all duration-200 ease-out
    hover:bg-emerald-700
    hover:shadow-lg
    active:scale-[0.98]
    disabled:opacity-60 disabled:cursor-not-allowed
  ">
              Log In
            </button> */}

            <button
              type="submit"
              className="
    w-full py-3
    rounded-xl
    bg-emerald-600
    text-white text-sm font-semibold
    shadow-md

    flex items-center justify-center gap-2

    transition-all duration-200 ease-out
    hover:bg-emerald-700
    hover:shadow-lg
    active:scale-[0.98]

    disabled:opacity-60
    disabled:cursor-not-allowed
    disabled:hover:bg-emerald-600
    disabled:hover:shadow-md
  "
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="w-5 h-5 animate-spin" />
                  <span>Logging In..</span>
                </>
              ) : (
                "Log In"
              )}
            </button>

            <p className="text-sm text-slate-600 text-center mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className=" text-blue-600 font-medium
      hover:text-blue-700
      transition-colors">
                Regsiter
              </Link>
            </p>

          </form>


        </div>
      </div>

    </div>
  )
}

export default LogIn;