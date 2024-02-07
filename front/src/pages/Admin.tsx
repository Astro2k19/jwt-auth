import {Users} from "../components/Users.tsx";
import Typography from "@mui/material/Typography";
import {Page} from "../components/Page.tsx";
import {RouterLink} from "../components/RouterLink.tsx";
import { Link } from "@mui/material";

const Admin = () => {
    return (
        <Page>
            <Typography variant={'h3'} gutterBottom>Admins Page</Typography>
            <Typography>You must have been assigned an Admin role.</Typography>
            <Users />
        </Page>
    )
}

export default Admin
