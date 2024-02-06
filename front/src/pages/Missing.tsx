
import {Page} from "../components/Page.tsx";
import Typography from "@mui/material/Typography";
import {RouterLink} from "../components/RouterLink.tsx";
import { Link } from "@mui/material";

const Missing = () => {
    return (
        <Page>
            <Typography variant='h3' gutterBottom>Oops!</Typography>
            <Typography gutterBottom>Page Not Found</Typography>
            <Link component={RouterLink} to="/">Home</Link>
        </Page>
    )
}

export default Missing
