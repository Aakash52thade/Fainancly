import React from 'react'
import Header from "../components/Header"
import SignupSignin from "../components/SignupSignin"

const Signup = () => {
  return (
    <div>
      <Header />
      <h1 className='flex justify-center items-center h-[90vh] text-3xl'>
         <SignupSignin />
      </h1>
    </div>
  )
}

export default Signup
