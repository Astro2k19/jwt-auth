import {Link} from "react-router-dom"
import Typography from "@mui/material/Typography";
import {Users} from "../components/Users.tsx";
import {Page} from "../components/Page.tsx";

const Editor = () => {
    return (
        <Page>
            <Typography variant={'h3'} gutterBottom>Editors Page</Typography>
            <Typography>You must have been assigned an Editor role.</Typography>
            <Users />
        </Page>
    )
}

export default Editor
