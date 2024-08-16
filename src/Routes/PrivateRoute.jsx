import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Bars } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth()

    const location = useLocation()

    if (loading) {
        return <div className="flex items-center justify-center">
            <Bars
                height="60"
                width="60"
                color="#F29120"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass="mt-10"
                visible={true}
            />

        </div>
    }

    if (user) {
        return children
    }

    return <Navigate to='/login' state={location?.pathname || '/'} replace></Navigate>
};

export default PrivateRoute;