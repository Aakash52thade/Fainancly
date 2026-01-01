import React from 'react'

const CustomInput = ({label, state, setState, placeholder}) => {

  return (
    <div>
        <p>{label}</p>
        <input 
          type='text'
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder={placeholder}
        />
    </div>
  )
}

export default CustomInput