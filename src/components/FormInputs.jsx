import React, { useState } from 'react'

const FormInputs = (props) => {
    const [focused, setFocused] = useState(false)
    const {id, msg, onchange, ...inputProps} = props;

    const handleFocus =(e)=>{
        setFocused(true)
    }
  return (
    <div className='forminput'>
        <input {...inputProps} onChange={onchange} onBlur={handleFocus} focused={focused.toString()}
         onFocus={()=> inputProps.name === "cpassword" && setFocused(true)}
         />
        <span>{msg}</span>
    </div>
  )
}

export default FormInputs