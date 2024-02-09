import {List, ListItem, ListItemButton, Skeleton} from "@mui/material";
import {UserListItem} from "./UserListItem.tsx";
import {useFetchUsersQuery} from "../api/adminApi.ts";

export const Users = () => {
    const {data, isLoading, isFetching} = useFetchUsersQuery(undefined)

    console.log(isFetching, 'isFetching')

    if (isLoading) {
        return (
            <List>
                {new Array(6).fill(null).map(_ => (
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Skeleton width={'100%'} height={30} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        )
    }


    return (
        <List>
            {data?.map(user => (
                <UserListItem user={user} disabled={isFetching} />
            ))}
        </List>
    );
};

