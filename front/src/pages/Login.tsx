import {FormEventHandler, useEffect, useRef, useState,} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useLoginMutation} from "../api/authApi.ts";
import {userActions} from "../slices/userSlice.ts";
import {useAppDispatch, useAppSelector} from "../store/store.ts";
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {ApiError} from "../model/response/ApiError.ts";
import {Alert, Link} from "@mui/material";
import {RouterLink} from "../components/RouterLink.tsx";
import LoadingButton from "@mui/lab/LoadingButton";

const Login = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    const [login, {isLoading}] = useLoginMutation()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<ApiError | null>(null);
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const dispatch = useAppDispatch()
    const {isPersist} = useAppSelector(state => state.user)

    useEffect(() => {
        emailRef.current?.focus();
    }, [])

    useEffect(() => {
        setError(null);
    }, [email, password])

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        try {
            await login({email, password}).unwrap()
            navigate(from, {replace: true})
        } catch (error) {
            const apiError = error as {data: ApiError}
            setError(apiError.data)
        }
    }

    const togglePersist = (_: any, checked: boolean) => {
        dispatch(userActions.setPersist(checked))
        localStorage.setItem('persist', JSON.stringify(checked))
    }

    return (
        <Grid container component="main" sx={{height: '100vh'}}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 1, width: '100%'}}>
                        {error && <Alert severity="error">{error.message}</Alert>}
                        <TextField
                            type="email"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            ref={emailRef}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                            value={isPersist}
                            onChange={togglePersist}
                        />
                        <LoadingButton
                            type="submit"
                            loading={isLoading}
                            loadingPosition="end"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            <span>Sign In</span>
                        </LoadingButton>
                        <Grid container>
                            <Grid item>
                                <Link component={RouterLink} to="/register">Don't have an account? Sign Up</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Login
