import {useFetchUsersQuery} from "../api/authApi.ts";
import {List, ListItem, ListItemButton, ListItemText, Skeleton} from "@mui/material";

export const Users = () => {
    const {data, isLoading} = useFetchUsersQuery(undefined)

    if (isLoading) {
        return (
            <List>
                {new Array(6).fill(null).map(_ => (
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Skeleton  width={250} height={30} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        )
    }


    return (
        <List>
            {data?.map(user => (
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemText primary={user.email} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
};

