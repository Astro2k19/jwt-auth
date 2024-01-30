import {useRef, useState, useEffect, FormEventHandler, ChangeEventHandler} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useLoginMutation} from "../api/authApi.ts";
import {userActions} from "../slices/userSlice.ts";
import {useAppDispatch, useAppSelector} from "../store/store.ts";

const Login = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const errRef = useRef<HTMLParagraphElement | null>(null);
    const [login] = useLoginMutation()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const dispatch = useAppDispatch()
    const {isPersist} = useAppSelector(state => state.user)

    useEffect(() => {
        emailRef.current?.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await login({email, password})
        navigate(from, {replace: true})
    }

    const togglePersist: ChangeEventHandler<HTMLInputElement> = (event ) => {
        dispatch(userActions.setPersist(event.target.checked))
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
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={isPersist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
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
