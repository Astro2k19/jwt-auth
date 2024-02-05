import { Outlet } from "react-router-dom"
import Grid from "@mui/material/Grid";

const Layout = () => {
    return (
        <Grid component="main" sx={{height: '100vh'}}>
            <Outlet />
        </Grid>
    )
}

export default Layout
