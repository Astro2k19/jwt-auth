import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import {useAppDispatch} from "../store/store.ts";
import {logoutApi} from "../api/logoutApi.ts";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const logout = async () => {
        dispatch(logoutApi())
        navigate('/linkpage');
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={logout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home
