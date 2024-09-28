import { Navigate , Outlet } from "react-router-dom";
import PrivateNavbar from "../PrivateNavbar";
import { useAuth } from "../context/AuthContext";

const PrivateLayout = ()=>{
    const auth = useAuth();

    if (!auth) {
        return <Navigate to="/login" />;
    }

    return(
        //<div>  don't need to use "<div>" tag :- because you can also use "<>" this tag
        <>
            <PrivateNavbar />
            <Outlet />
        </>
        //</div>
    )
};
export default PrivateLayout;