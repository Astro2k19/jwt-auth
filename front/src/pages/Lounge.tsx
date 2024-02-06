
import {Page} from "../components/Page.tsx";
import Typography from "@mui/material/Typography";
import {RouterLink} from "../components/RouterLink.tsx";
import { Link } from "@mui/material";

const Lounge = () => {
    return (
        <Page>
            <Typography variant='h3' gutterBottom>The Lounge</Typography>
            <Typography gutterBottom>Admins and Editors can hang out here.</Typography>
            <Link component={RouterLink} to="/">Home</Link>
        </Page>
    )
}

export default Lounge
