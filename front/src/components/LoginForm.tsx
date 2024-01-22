import {useState} from 'react';
import {loginApi} from "../api/loginApi.ts";
import {registerApi} from "../api/registerApi.ts";
import {useAppDispatch} from "../store/store.ts";

const LoginForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()


    return (
        <div>
            <label htmlFor="">login</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="">password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type={'button'} onClick={() => dispatch(loginApi({email, password}))}>Login</button>
            <button type={'button'} onClick={() => dispatch(registerApi({email, password}))}>Register</button>
        </div>
    );
};

export default LoginForm;
