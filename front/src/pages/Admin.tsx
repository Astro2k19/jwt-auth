import { Link } from "react-router-dom"
import {Users} from "../components/Users.tsx";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Admin = () => {
    return (
        <Grid>
            <Typography variant={'h3'} gutterBottom>Admins Page</Typography>
            <Typography>You must have been assigned an Admin role.</Typography>
            <Users />
            <Link to="/">Home</Link>
        </Grid>
    )
}

export default Admin
