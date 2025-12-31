import React from 'react'

const Header = () => {

    const handleClick = () => {
        alert("logout")
    }

  return (
    <div className='flex items-center justify-between p-4 bg-gray-100'>
      <h1 className='text-4xl font-bold text-red-900'>Fainancly</h1>
      <p onClick={handleClick}>Logout</p>
    </div>
  )
}

export default Header