import Typography from "@mui/material/Typography";
import {RouterLink} from "../components/RouterLink";
import {Link, List, ListItem} from "@mui/material";
import {useAppSelector} from "../store/store.ts";
import {Page} from "../components/Page.tsx";

const RouterLinkPage = () => {
    const {isAuth} = useAppSelector(state => state.user)

    return (
        <Page>
                <Typography variant={'h3'} gutterBottom>RouterLinks</Typography>
            <Typography variant={'h4'} gutterBottom>Public</Typography>
            <List>
                <ListItem>
                    <Link component={RouterLink} fontSize={18} to="/login">Login</Link>
                </ListItem>
                <ListItem>
                    <Link component={RouterLink} to="/register">Register</Link>
                </ListItem>
            </List>
                <Typography variant={'h4'} gutterBottom>Private</Typography>
                <List>
                    <ListItem>
                        <Link component={RouterLink} to="/">Home</Link>
                    </ListItem>
                    <ListItem>
                        <Link component={RouterLink} to="/editor">Editors Page</Link>
                    </ListItem>
                    <ListItem>
                        <Link component={RouterLink} to="/admin">Admin Page</Link>
                    </ListItem>
                </List>
        </Page>
    )
}

export default RouterLinkPage
