import {Button, ButtonGroup, ListItem, ListItemText} from "@mui/material";
import {User, UserRoles} from "../model/User.ts";
import {MultipleSelectCheckmarks} from "./UserRoleSelect.tsx";
import {useRef, useState} from "react";
import {useUpdateUserRolesMutation} from "../api/adminApi.ts";
import LoadingButton from "@mui/lab/LoadingButton";

interface UserCardProps {
    user: User
    disabled?: boolean
}

const allRoles: UserRoles[] = ['User', 'Editor', 'Admin']

export const UserListItem = ({user, disabled}: UserCardProps) => {
    const [changedRoles, setChangedRoles] = useState<UserRoles[]>(user.roles)
    const [updateUserRoles, {isLoading}] = useUpdateUserRolesMutation()
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef()
    const hasRoleChanged = !(
        user.roles.every(role => changedRoles.includes(role))
        && changedRoles.every(role => user.roles.includes(role))
    )
    const onChange = (value: string[]) => {
        setChangedRoles(value as UserRoles[])
    }

    const onCancel = () => {
        setChangedRoles(user.roles)
    }

    const onClose = () => {
        setIsOpen(false)
    }

    const onSave = () => {
        updateUserRoles({
            userId: user.id,
            roles: changedRoles
        })
        onClose()
    }

    return (
        <ListItem disablePadding sx={{display: 'flex', justifyContent: 'space-between', gap: '15px'}}>
            <ListItemText primary={user.email} />
            {hasRoleChanged && (
                <ButtonGroup
                    disableElevation
                    variant="outlined"
                    aria-label="control button group"
                    disabled={isLoading}
                >
                    <LoadingButton loading={isLoading} variant="outlined" color="success" onClick={onSave}>
                        Save
                    </LoadingButton>
                    <Button
                        color="error"
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                </ButtonGroup>
            )}
            <MultipleSelectCheckmarks
                onChange={onChange}
                allValues={allRoles}
                selectedValues={changedRoles}
                id={`id-${user.id}`}
                labelId={`label-${user.id}`}
                label={'Roles'}
                disabled={isLoading}
                open={isOpen}
            />
        </ListItem>
    );
};
