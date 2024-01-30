import {useRefreshQuery} from "../api/authApi.ts";
import {useAppSelector} from "../store/store.ts";
import {Outlet} from "react-router-dom";
import {useRef} from "react";

export const PersistentLogin = () => {
    console.log('PersistentLogin')
    const {isAuth, isPersist} = useAppSelector(state => state.user)
    const timestampRef = useRef(Date.now()).current;
    console.log(isAuth, 'isAuth')
    console.log(isPersist, 'isPersist')
    console.log(isAuth && !isPersist, 'isAuth && !isPersist')
    const { isLoading, error} = useRefreshQuery({sessionId: timestampRef}, {
        skip: isAuth && !isPersist
    })


    return (
        isLoading
            ? <p>Loading...</p>
            : <Outlet />
    );
};


