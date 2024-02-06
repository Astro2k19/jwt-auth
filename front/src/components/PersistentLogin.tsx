import {useRefreshQuery} from "../api/authApi.ts";
import {useAppSelector} from "../store/store.ts";
import {Outlet} from "react-router-dom";
import {PageLoader} from "./PageLoader.tsx";

export const PersistentLogin = () => {
    const {isAuth, isPersist} = useAppSelector(state => state.user)
    const { isLoading, error} = useRefreshQuery(undefined, {
        skip: isAuth || (!isAuth && !isPersist)
    })

    return (
        !isPersist
            ? <Outlet />
            : isLoading
                ? <PageLoader />
                : <Outlet />
    );
};


