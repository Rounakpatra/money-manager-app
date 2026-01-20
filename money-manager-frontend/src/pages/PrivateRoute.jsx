import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem("token");
    
    let isAuthenticated=null;

    if(token){
        isAuthenticated=true;
    }else{
        isAuthenticated=false;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
