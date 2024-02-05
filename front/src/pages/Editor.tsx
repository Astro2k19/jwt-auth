import { Link } from "react-router-dom"
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Users} from "../components/Users.tsx";

const Editor = () => {
    return (
        <Grid>
            <Typography variant={'h3'} gutterBottom>Editors Page</Typography>
            <Typography>You must have been assigned an Editor role.</Typography>
            <Users />
            <Link to="/">Home</Link>
        </Grid>
    )
}

export default Editor
