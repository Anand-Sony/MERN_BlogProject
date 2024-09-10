import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

import profileValidator from "../validators/profileValidator";

const initialFormData = {
    name :"" ,
    email:"" 
};

const initialFormError = {
    name :"" ,
    email:"" , 
};

const Profile = ()=>{
    const [formData , setFormData] = useState(initialFormData);
    const [formError , setFormError] = useState(initialFormError);
    const [loading , setLoading] = useState(false);
    const [oldEmail , setOldEmail] = useState(null);

    const navigate = useNavigate();

    useEffect(()=>{
        // Api Request : 
        const getUser = async ()=>{
            try{
                // Api request : 
                const response = await axios.get(`/auth/current-user`);
                const data = response.data;
                setFormData({name: formData.name , email:formData.email})
                setOldEmail(data.user.email);

            }
            catch(error){
                const response = error.response;
                const data = response.data;
                toast.error(data.message , {
                    position: "top-right",
                    autoClose: true,
                })
            }
        }
    })

    const handleChange = (e)=>{
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e)=>{  // we will pass this in the form as the submit function
        e.preventDefault();

        const errors = profileValidator({name :formData.name , email:formData.email });

        if(errors.name || errors.email ){
            setFormError(errors)
        }
        else{
            try{
                setLoading(true);

                // api request
                const response = await axios.put("/auth/update-profile" , formData);
                const data = response.data;
                toast.success(data.message , {
                    position: "top-right",
                    autoClose : true
                })
                
                setFormError(initialFormError);  
                setLoading(false);

                if(oldEmail !== formData.email){
                    window.localStorage.removeItem("blogData");
                    navigate("/login");
                }
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

    return (
        <div>
            <button className="button button-block" onClick={()=>navigate(-1)} > Go Back </button>

            <div className="form-container" >
                <form className="inner-container" onSubmit={handleSubmit} >
                    <h2 className="form-title" >Update Profile</h2>
                    
                    <div className="form-group" >
                        <label>Name</label>
                        <input className="form-control" type="text" name="name" placeholder="Enter Updated Name" value={formData.name} onChange={handleChange} />
                        {formError.name && <p className="error" >{formData.name}</p>}
                    </div>
                    
                    <div className="form-group" >
                        <label>Email</label>
                        <input className="form-control" type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} />
                        {formError.email && <p className="error" >{formData.email}</p>}
                    </div>

                    <div className="form-group">
                        <input className="button" type="submit" value={`${loading ? "Updating..." : "Update"}`} />
                    </div>
                </form>
            </div>
        </div>
    )
};
export default Profile;