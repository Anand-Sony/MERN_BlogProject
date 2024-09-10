import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "../utils/axiosInstance";

import sendCodeValidator from "../validators/sendCodeValidator";
import recoverPasswordValidator from "../validators/recoverPasswordValidator";

const initialFormData = {
    email:"" , 
    code:"" , 
    password:""
};
const initialFormError = {
    code:"" , 
    password:""
};

const ForgotPassword = ()=>{

    const [formData , setFormData] = useState(initialFormData);
    const [formError , setFormError] = useState(initialFormError);
    const [loading , setLoading] = useState(false);
    const [emailError , setEmailError] = useState("");
    const [hasEmail , setHasEmail] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value }));
    }

    const handleSendCode = async (e)=>{
        e.preventDefault();

        const errors = sendCodeValidator({email : formData.email})
        if (errors.email) {
            setEmailError(errors.email);
        }
        else{
            try{
                setLoading(true);

                // api request : 

                const response = await axios.post("/auth/forgot-password-code" , {email : formData.email});
                const data = response.data;

                setHasEmail(true);

                toast.success(data.message , {
                    position: "top-right",
                    autoClose : true
                })
                
                setLoading(false);
                
            }
            catch(error){
                setLoading(false); 
                
                const response = error.response;
                const data = response.data;  

                toast.error(data.message , {
                    position: "top-right",
                    autoClose : true
                })
           }
        }
    }

    const handleRecoverPassword = async (e)=>{  // we will pass this in the form as the submit function
        e.preventDefault();

        const errors = recoverPasswordValidator({
            code : formData.code,
            password : formData.password
        });

        if(errors.code || errors.password){
            setFormError(errors)
        }
        else{
            try{
                setLoading(true);

                // api request
                const response = await axios.post("/auth/recover-password" , formData);
                const data = response.data;
                toast.success(data.message , {
                    position: "top-right",
                    autoClose : true
                })
                
                setFormData(initialFormData);
                setFormError(initialFormError);  
                setLoading(false);
                navigate("/login");
            }
            catch(error){
                setLoading(false); 
                setFormError(initialFormError);       

                const response = error.response;
                const data = response.data;
                toast.error(data.message , {
                    position: "top-right",
                    autoClose : true
                })
           }
        }
    };

    return (
            <div className="form-container" >
                <form className="inner-container" onSubmit={!hasEmail ? handleSendCode : handleRecoverPassword} >
                    <h2 className="form-title">{`${!hasEmail ? "Recover Password" : "New Password"}`}</h2>

                    {!hasEmail ? (
                        <div className="form-group" >
                        <label>Email</label>
                        <input className="form-control" type="text" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
                        {emailError && <p className="error" >{emailError}</p>}
                    </div>
                    ) : (
                        <>
                            <div className="form-group" >
                                <label>Code</label>
                                <input className="form-control" type="text" name="code" placeholder="Enter Code" value={formData.code} onChange={handleChange} />
                                {formError.code && <p className="error" >{formError.code}</p>}
                            </div>
                            
                            <div className="form-group" >
                                <label>New Password</label>
                                <input className="form-control" type="password" name="password" placeholder="********" value={formData.password} onChange={handleChange} />
                                {formError.password && <p className="error" >{formError.password}</p>}
                            </div>

                        </>
                    )}


                    <div className="form-group" >
                        <input className="button" type="submit" value={`${loading ? "Sending..." : "Send"}`} />
                    </div>

                </form>
            </div>
    )
};
export default ForgotPassword;