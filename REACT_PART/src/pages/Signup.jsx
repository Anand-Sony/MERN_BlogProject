import "../assets/css/form.css";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "../utils/axiosInstance";
import signupValidator from "../validators/signupValidator";
import { useNavigate } from "react-router-dom";

const initialFormData = {name :"" , email:"" , password:"" , confirmPassword:""};
const initialFormError = {name :"" , email:"" , password:"" , confirmPassword:""};

const Signup = ()=>{
    const [formData , setFormData] = useState(initialFormData);
    const [formError , setFormError] = useState(initialFormError);
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e)=>{  // we will pass this in the form as the submit function
        e.preventDefault();

        const errors = signupValidator({name :formData.name , email:formData.email , password:formData.password , confirmPassword:formData.confirmPassword});

        if(errors.name || errors.email || errors.password || errors.confirmPassword){
            setFormError(errors)
        }
        else{
            try{
                setLoading(true);

                // api request
                const requestBody = {
                    name : formData.name,
                    email : formData.email,
                    password : formData.password
                }
                const response = await axios.post("/auth/signup" , requestBody);
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
                const data = error.response?.data;  

                toast.error(data.message , {
                    position: "top-right",
                    autoClose : true
                })
           }
        }
        console.log(formData);
    };

    return(
        <div className="form-container" >
            <form className="inner-container" onSubmit={handleSubmit} >
                <h2 className="form-title" > Signup Form </h2>
                
                <div className="form-group" >
                    <label> Name </label>
                    <input className="form-control" type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange}  />
                    {formError.name && <p className="error" > {formError.name} </p> }
                </div>


                <div className="form-group" >
                    <label > Email </label>
                    <input className="form-control" type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange}  />
                    {formError.email && <p className="error" >{formError.email}</p>}
                </div>


                <div className="form-group" >
                    <label > Password </label>
                    <input className="form-control" type="password" name="password" placeholder="********"  value={formData.password} onChange={handleChange}  />
                    {formError.password && <p className="error" > {formError.password} </p> }
                </div>


                <div className="form-group" >
                    <label > Confirm Password </label>
                    <input className="form-control" type="password" name="confirmPassword" placeholder="********"  value={formData.confirmPassword} onChange={handleChange}  />
                    {formError.confirmPassword && <p className="error" > {formError.confirmPassword} </p> }
                </div>


                <div className="form-group" >
                    <input className="button" type="submit" value={`${loading ? "Saving..." : "Signup"}`} />
                </div>

            </form>
        </div>
    )
};
export default Signup;