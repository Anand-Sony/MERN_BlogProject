import axios from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import addCategoryValidator from "../../validators/addCategoryValidator";

const initialFormData = {
    title : "",
};
const initialFormError = {
    title : "",
}

const NewCategory = ()=>{
    const [formData , setFormData] = useState(initialFormData);
    const [formError , setFormError] = useState(initialFormError);
    const [loading , setLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleChange = (e)=>{
        setFormData((prev)=>({...prev , [e.target.name]: e.target.value }))
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();

        const errors = addCategoryValidator({title : formData.title});
        if (errors.title) {
            setFormError(errors);
        }
        else{
            try{
                setLoading(true);

                // Api request
                const response = await axios.post("/category" , formData);
                const data = response.data;
                
                
                toast.success(data.message , {
                    position: "top-right",
                    autoClose: true,
                });
                setFormData(initialFormData);
                setFormError(initialFormError);
                setLoading(false);
                navigate("/categories")
            }
            catch(error){
                setLoading(false);
                setFormError(initialFormError);
                const data = error.response?.data;
                toast.error(data.message , {
                    position : "top-right",
                    autoClose : true ,
                })
            }
        }
    }

    return (
        <div>
            <button className="button button-block" onClick={()=>navigate(-1)} >Go Back</button>
            <div className="form-container" >
                <form className="inner-container" onSubmit={handleSubmit} >
                    <h2 className="new-title" >New Category</h2>
                    <div className="form-group" >
                        <label> Title </label>
                        <input type="text" className="form-control" name="title" placeholder="Technology" value={formData.title} onChange={handleChange} />
                        {formError.title && <p className="error" >{formError.title}</p>}
                    </div>

                    <div className="form-group" >
                        <label> Description </label>
                        <textarea className="form-control" name="desc" placeholder="Lorem ipsum" value={formData.desc} onChange={handleChange}  ></textarea>
                    </div>

                    <div className="form-group" >
                        <input className="button" type="submit" value={`${loading ? "Adding..." : "Add"}`} />
                    </div>
                </form>
            </div>
        </div>
    )
};
export default NewCategory;