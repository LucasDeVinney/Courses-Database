// Imports
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "../context/UserContext";
import Forbidden from './Forbidden'

const PrivateRoute = () => {
    // Hook
    const { authUser } = useContext(UserContext);

    // Returns forbidden if there is no authenticated user
    if (authUser) {
        return <Outlet />
    } else {
        return <Forbidden />
    }
}

export default PrivateRoute;