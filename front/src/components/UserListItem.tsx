import {Button, ButtonGroup, ListItem, ListItemText} from "@mui/material";
import {User, UserRoles} from "../model/User.ts";
import {MultipleSelectCheckmarks} from "./UserRoleSelect.tsx";
import {useState} from "react";

interface UserCardProps {
    user: User
}

const allRoles: UserRoles[] = ['User', 'Editor', 'Admin']

export const UserListItem = ({user}: UserCardProps) => {
    const [changedRoles, setChangedRoles] = useState<UserRoles[]>(user.roles)
    const hasRoleChanged = !(
        user.roles.every(role => changedRoles.includes(role))
        && changedRoles.every(role => user.roles.includes(role))
    )
    const onChange = (value: UserRoles[]) => {
        setChangedRoles(value)
    }

    return (
        <ListItem disablePadding sx={{display: 'flex', justifyContent: 'space-between', gap: '15px'}}>
            <ListItemText primary={user.email} />
            <MultipleSelectCheckmarks
                onChange={onChange}
                allValues={allRoles}
                selectedValues={changedRoles}
                id={`id-${user.id}`}
                labelId={`label-${user.id}`}
                label={'Roles'}
            />
            {hasRoleChanged && (
                <ButtonGroup
                    disableElevation
                    variant="outlined"
                    aria-label="Disabled button group"
                >
                    <Button color="success">Save</Button>
                    <Button color="error">Cancel</Button>
                </ButtonGroup>
            )}
        </ListItem>
    );
};
