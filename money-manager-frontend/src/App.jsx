import Home from "./pages/Home.jsx";
import Income from "./pages/Income.jsx";
import Expense from "./pages/Expense.jsx";
import Category from "./pages/Category.jsx";
import Filter from "./pages/Filter.jsx";
import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import PrivateRoute from "./pages/PrivateRoute.jsx";

import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>

      <Toaster />

      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root/>}/>
          <Route path="/dashboard" element={<Home />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
          <Route path='/category' element={<Category />} />
          <Route path='/filter' element={<Filter />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />

          
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />

          
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/category" element={<Category />} />
            <Route path="/filter" element={<Filter />} />
          </Route>
        </Routes>
      </BrowserRouter> 

    </>



  )
}



const Root = () => {

  const isAuth = !!localStorage.getItem("token");

  if (isAuth) {

    return <Navigate to="/dashboard" />

  } else {
    return <Navigate to="/login" />
  }

}


export default App;