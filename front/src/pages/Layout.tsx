import {Outlet, useLocation} from "react-router-dom"
import Grid from "@mui/material/Grid";
import { createTheme } from "@mui/material/styles";
import {ThemeProvider} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveAppBar from "../components/Header.tsx";
import {useAppSelector} from "../store/store.ts";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Layout = () => {
    const {pathname} = useLocation()
    const notLoginOrRegister = !(pathname === '/login' || pathname === '/register')

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {notLoginOrRegister && <ResponsiveAppBar/>}
            <Grid component="main" sx={{height: 'calc(100vh - 68.5px)'}}>
                <Outlet />
            </Grid>
        </ThemeProvider>
    )
}

export default Layout
