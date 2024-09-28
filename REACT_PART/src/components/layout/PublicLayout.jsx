import { Navigate , Outlet } from "react-router-dom";
import PublicNavbar from "../PublicNavbar";
import { useAuth } from "../context/AuthContext";

const PublicLayout = ()=>{
    const auth = useAuth();

    if (auth) {
        return <Navigate to="/" />;
    }

    return(
        //<div>  don't need to use "<div>" tag :- because you can also use "<>" this tag
        <>
            <PublicNavbar />
            <Outlet />
        </>
        //</div>
    )
};
export default PublicLayout;