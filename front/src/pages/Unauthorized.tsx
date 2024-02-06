import {useNavigate} from "react-router-dom"
import {Page} from "../components/Page.tsx";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Page>
            <Typography variant='h3' gutterBottom>Unauthorized</Typography>
            <Typography gutterBottom>You do not have access to the requested page.</Typography>
            <Button
                type="button"
                variant="contained"
                sx={{mt: 3, mb: 2}}
                onClick={goBack}
            >
                Go Back
            </Button>
        </Page>
    )
}

export default Unauthorized
