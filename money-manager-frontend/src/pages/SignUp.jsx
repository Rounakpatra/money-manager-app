import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { assets } from "../assets/assets.js";
import InputField from '../components/InputField.jsx';
import { validateEmail } from '../util/validation.js';
import axiosConfig from '../util/axiosConfig.jsx';
import { API_ENDPOINTS } from '../util/apiEndPoints.js';
import toast from 'react-hot-toast';
import { LoaderCircle } from 'lucide-react';
import ProfilePhotoSelctor from '../components/ProfilePhotoSelctor.jsx';
import uploadProfileImage from '../util/uploadProfileImage.js';



const SignUp = () => {

  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [profilePhoto, setprofilePhoto] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let profileImageUrl="";

    setisLoading(true);

    //basic validations

    if (!fullName.trim()) {
      seterror("Please enter your full name");
      setisLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      seterror("Please enter your email");
      setisLoading(false);
      return;
    }

    if (!password.trim()) {
      seterror("Please enter your password");
      setisLoading(false);
      return;
    }

    seterror("");


    //signup api call

    try {

      //upload image if present

      if(profilePhoto){
        const imageUrl=await uploadProfileImage(profilePhoto);
        profileImageUrl=imageUrl || ""; 
      }

      const response = await axiosConfig.post(API_ENDPOINTS.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl
      })

      if (response.status === 201) {
        toast.success("Profile created successfully.");
      }

      navigate("/login");

    } catch (err) {

      toast.error("Something went wrong");
      console.error('Something went wrong', err);
      seterror(err.message);

    } finally {
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
            Create an Account
          </h3>

          <p
            className="
          text-sm text-slate-600 text-center mb-2 leading-relaxed
          transition-colors duration-200
          hover:text-slate-700
        "
          >
            Start tracking your spendings by joining with us.
          </p>

          {/* form */}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex justify-center mb-2">
              {/* Profile Image */}
              <ProfilePhotoSelctor image={profilePhoto} setImage={setprofilePhoto}/>
            </div>

            <div className="grid grid-cols-1 gap-0.0001">
              <InputField
                value={fullName}
                onchange={(e) => setfullName(e.target.value)}
                label="Full Name"
                placeholder="John Doe"
                type="text"
              />

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
                  <span>Signing up…</span>
                </>
              ) : (
                "Register"
              )}
            </button>


            <p className="text-sm text-slate-600 text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className=" text-blue-600 font-medium
      hover:text-blue-700
      transition-colors">
                LogIn
              </Link>
            </p>

          </form>


        </div>
      </div>

    </div>


  )
}

export default SignUp;