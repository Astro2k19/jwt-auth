import {ReactNode} from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

interface PageProps {
    children: ReactNode
}
export const Page = ({children}: PageProps) => {
    return (
        <Grid sx={{p: '15px', height: '100%'}}>
            <Paper sx={{p: '10px', height: '100%', borderRadius: '12px'}}>
                {children}
            </Paper>
        </Grid>
    );
};
