import {FormEventHandler, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useRegisterMutation} from "../api/authApi.ts";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import {Alert, Link} from "@mui/material";
import TextField from "@mui/material/TextField";
import {ApiError} from "../model/response/ApiError.ts";
import {RouterLink} from "../components/RouterLink.tsx";
import LoadingButton from "@mui/lab/LoadingButton";


const Register = () => {
    const [register, {isLoading}] = useRegisterMutation()
    const emailRef = useRef<HTMLInputElement | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState('');
    const [error, setError] = useState<ApiError | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        emailRef.current?.focus();
    }, [])


    useEffect(() => {
        setError(null);
    }, [email, password, passwordMatch])

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        console.log('ere')
        try {
            await register({email, password})
            navigate('/', {replace: true})
        } catch (error) {
            setError(error as ApiError)
        }

    }

    return (
        <Grid container sx={{height: '100%'}}>
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
                        Sign Up
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password-match"
                            label="Password match"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={passwordMatch}
                            onChange={(event) => setPasswordMatch(event.target.value)}
                        />
                        <LoadingButton
                            type="submit"
                            loading={isLoading}
                            loadingPosition="end"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            <span>Sign Up</span>
                        </LoadingButton>
                        <Grid container>
                            <Grid item>
                                <Link component={RouterLink} to="/login">Have an account? Sign In</Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export default Register

