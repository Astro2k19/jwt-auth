import {useAppSelector} from "../store/store.ts";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {UserRoles} from "../model/User.ts";

interface RequiredAuthProps {
    allowedRoles?: UserRoles[]
}

export const RequiredAuth = ({allowedRoles}:RequiredAuthProps) => {
    const authData = useAppSelector(state => state.user)
    const location = useLocation()
    const hasAllowedRoles = authData?.user?.roles.some(userRole => allowedRoles?.includes(userRole))

    console.log(location, 'location')

    return (
        hasAllowedRoles
            ? <Outlet />
            : authData.isAuth
                ? <Navigate to={'/unauthorized'} state={{from: location}} replace />
                : <Navigate to={'/login'} state={{from: location}} replace />
    );
};
