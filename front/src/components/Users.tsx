import {useFetchUsersQuery} from "../api/authApi.ts";
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";

export const Users = () => {
    const {data, isLoading} = useFetchUsersQuery(undefined)

    console.log(data, 'data')

    return (
        isLoading ?
            <p>Loading...</p>
            : <div>
                <List>
                    {data?.map(user => (
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemText primary={user.email} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </div>
    );
};

