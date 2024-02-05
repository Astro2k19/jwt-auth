import { useNavigate, Link } from "react-router-dom";
import {useLogoutMutation} from "../api/authApi.ts";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {Users} from "../components/Users.tsx";
import Button from "@mui/material/Button";

const Home = () => {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation()

    const signOut = async () => {
        await logout({});
        navigate('/linkpage');
    }

    return (
        <Grid>
            <Typography variant={'h3'} gutterBottom>Editors Page</Typography>
            <Typography>You must have been assigned an Editor role.</Typography>
            <Users />
            <Link to="/">Home</Link>

            <Typography variant={'h3'} gutterBottom>Home</Typography>
            <Typography>You are logged in!</Typography>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                onClick={signOut}
            >
                Sign Out
            </Button>
        </Grid>
    )
}

export default Home
