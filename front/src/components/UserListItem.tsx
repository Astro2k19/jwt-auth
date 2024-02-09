import {Button, ButtonGroup, ListItem, ListItemText} from "@mui/material";
import {User, UserRoles} from "../model/User.ts";
import {MultipleSelectCheckmarks} from "./UserRoleSelect.tsx";
import {useState} from "react";
import {useUpdateUserRolesMutation} from "../api/adminApi.ts";
import LoadingButton from "@mui/lab/LoadingButton";
import {useAppSelector} from "../store/store.ts";
import Typography from "@mui/material/Typography";
import {ApiError} from "../model/response/ApiError.ts";
import { toast } from 'react-toastify';

interface UserCardProps {
    user: User
    disabled?: boolean
}

const allRoles: UserRoles[] = ['User', 'Editor', 'Admin']

export const UserListItem = ({user, disabled}: UserCardProps) => {
    const {user: currentUser} = useAppSelector(state => state)
    const [changedRoles, setChangedRoles] = useState<UserRoles[]>(user.roles)
    const [updateUserRoles, {isLoading, error}] = useUpdateUserRolesMutation()
    const [controlButtonsShown, setControlButtonsShown] = useState(false)
    const onChange = (value: string[]) => {
        setChangedRoles(value as UserRoles[])
        setControlButtonsShown(() => !(
            user.roles.every(role => value.includes(role))
            && value.every(role => user.roles.includes(role))
        ))
    }

    const onCancel = () => {
        setChangedRoles(user.roles)
        setControlButtonsShown(false)
    }

    const onSave = async () => {
        try {
            await updateUserRoles({
                userId: user.id,
                roles: changedRoles
            }).unwrap();
            setControlButtonsShown(false);
        } catch (error) {
            const apiError = error as {data: ApiError}
            toast.error(apiError.data.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    console.log(error, 'error')

    return (
        <ListItem disablePadding sx={{display: 'flex', justifyContent: 'space-between', gap: '15px'}}>
            <ListItemText primary={
                <>
                    <Typography variant={'h6'}>{user.email}</Typography>
                    {currentUser?.user?.id === user.id && <Typography variant={'subtitle2'} color={'success'}>Current user</Typography>}
                </>
            } />
            {controlButtonsShown && (
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
            />
        </ListItem>
    );
};
