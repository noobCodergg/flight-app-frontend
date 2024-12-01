import React,{useEffect} from 'react'
import RegistrationImage from '../Components/RegistrationImage'
import LoginForm from '../Components/LoginForm'

function Login() {


  return (
    <div className="w-full h-screen flex items-center justify-center ">
    <div className="w-3/4 h-3/4 flex h-auto hover:shadow-2xl hover:shadow-teal-950 transition-all duration-1000 flex items-center justify-center">
       <RegistrationImage/>
       <LoginForm/>
    </div>
  </div>
  )
}

export default Login
