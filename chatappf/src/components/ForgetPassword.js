//forgetPasswordpage
import  axios  from "axios";
import React, { useState } from "react";
import './forgetPassword.css'

const ForgetPassword = () => {
    const [email , setEmail] = useState('')
      
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/generateResetToken', {email})
            console.log(response.data)
            
        } catch (error) {
            console.error(error);
            
        }



        //create logic for sending request for token 

    }


    return (
        <div className="forget-password">
            <h2> Forget Password </h2>
            <form onSubmit = {handleSubmit}>
                <babel> Email: </babel>

                <input type="email" value={email} onChange={handleEmailChange}required />
                <button type="submit"> send reset Link </button>
            
            
            </form>

        </div>
    )

}

export default ForgetPassword;