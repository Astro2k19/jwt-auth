import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

export const PageLoader = () => {
    return (
        <Grid container sx={{height: '100%'}} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress size={65}/>
        </Grid>
    );
};
