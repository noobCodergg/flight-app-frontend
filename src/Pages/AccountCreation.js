import React from 'react'
import gif1 from '../Media/gif1.gif'
import { useNavigate } from 'react-router-dom'
function AccountCreation() {
const navigate=useNavigate();
setTimeout(()=>{
   navigate('/')
},2000)
  return (
    <div className='flex items-center justify-center h-screen'>
        <div>
      <img src={gif1} alt='gif1' className='h-1/4 w-full'/>
      <h1 className='text-2xl pt-10 text-teal-900 '>Creating Your account. Sit tight!</h1>
      </div>
    </div>
  )
}

export default AccountCreation
