import {useRef, useState, useEffect, FormEventHandler} from 'react';
import {loginApi} from "../api/loginApi.ts";
import {useAppDispatch} from "../store/store.ts";
import {Link, useLocation, useNavigate} from "react-router-dom";

const Login = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement | null>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    useEffect(() => {
        emailRef.current?.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        await dispatch(loginApi({email, password}))
        navigate(from, {replace: true})
    }

    return (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="emailname">Email:</label>
                <input
                    type="email"
                    id="emailname"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to={'/register'}> Sign up </Link>
                        </span>
            </p>
        </section>
    )
}

export default Login
