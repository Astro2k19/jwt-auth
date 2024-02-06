import {useNavigate} from "react-router-dom";
import {useLogoutMutation} from "../api/authApi.ts";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link, List, ListItem} from "@mui/material";
import {RouterLink} from "../components/RouterLink.tsx";
import {Page} from "../components/Page.tsx";

const Home = () => {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation()

    const signOut = async () => {
        await logout({});
        navigate('/linkpage');
    }

    return (
        <Page>
            <Typography variant={'h3'} gutterBottom>Home</Typography>
            <Typography>You are logged in!</Typography>
            <List>
                <ListItem>
                    <Link component={RouterLink} to="/editor">Go to the Editor page</Link>
                </ListItem>
                <ListItem>
                    <Link component={RouterLink} to="/admin">Go to the Admin page</Link>
                </ListItem>
                <ListItem>
                    <Link component={RouterLink} to="/lounge">Go to the Lounge</Link>
                </ListItem>
                <ListItem>
                    <Link component={RouterLink} to="/linkpage">Go to the link page</Link>
                </ListItem>
            </List>
            <Button
                type="submit"
                variant="contained"
                sx={{mt: 3, mb: 2}}
                onClick={signOut}
            >
                Sign Out
            </Button>
        </Page>
    )
}

export default Home
