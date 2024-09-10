import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "../components/context/AuthContext";

const VerifyUser = ()=>{

    const navigate = useNavigate();
    const auth = useAuth();

    const [loading , setLoading] = useState(false);
    const [code , setCode] = useState("");
    const [codeError , setCodeError] = useState("");
    const [loading2 , setLoading2] = useState(false);

    const handleSendVerificationCode = async (e)=>{
        e.preventDefault();

        try{
            setLoading(true);

            // Api request
            const response = await axios.post("/auth/send-verification-email" , {email: auth.email});
            const data = response.data;
            
            
            toast.success(data.message , {
                position: "top-right",
                autoClose: true,
            });
            setLoading(false);
        }
        catch(error){
            setLoading(false);
            const data = error.response?.data;
            toast.error(data.message , {
                position : "top-right",
                autoClose : true ,
            })
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if (code) {
            try{
                setLoading2(true);
    
                // Api request
                const response = await axios.post("/auth/verify-user" , {email: auth.email ,code:code});
                const data = response.data;
                
                setCode("");
                setCodeError("");
                window.localStorage.removeItem("blogData");
                navigate("/login");
                
                toast.success(data.message , {
                    position: "top-right",
                    autoClose: true,
                });
                setLoading2(false);
            }
            catch(error){
                setCode("");
                setCodeError("");
                setLoading2(false);
                const data = error.response?.data;
                toast.error(data.message , {
                    position : "top-right",
                    autoClose : true ,
                })
            }
        }
        else{
            setCodeError("Code is Required");
        }
    }

    return (
        <div>
            <button className="button button-block" onClick={()=>navigate(-1)} >Go Back</button>
            <button className="button button-block" onClick={handleSendVerificationCode} >{`${loading ? "Sending..." : "Send Verification Code"}`}</button>
            <div className="form-container" >

                <form className="inner-container" onSubmit={handleSubmit} >
                    <h2 className="form-title" >Verify User</h2>

                    <div className="form-group" >
                        <label>Confirmation Code</label>
                        <input className="form-control" type="text" name="code" placeholder="Enter Code" value={code} onChange={(e) => setCode(e.target.value)} />
                        {codeError && <p className="error" >{codeError}</p>}
                    </div>

                    <div className="form-group" >
                        <input className="button" type="submit" value={`${loading ? "Verifying..." : "Verify"}`}  />
                    </div>

                </form>
            </div>
        </div>
    )
};
export default VerifyUser;