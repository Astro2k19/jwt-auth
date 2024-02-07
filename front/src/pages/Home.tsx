
import Typography from "@mui/material/Typography";
import {Page} from "../components/Page.tsx";

const Home = () => {

    return (
        <Page>
            <Typography variant={'h3'} gutterBottom>Home</Typography>
            <Typography>You are logged in!</Typography>
        </Page>
    )
}

export default Home
