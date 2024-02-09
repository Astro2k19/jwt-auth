import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import AdbIcon from '@mui/icons-material/Adb';
import {Link, List, ListItem} from "@mui/material";
import {RouterLink} from "./RouterLink.tsx";
import {useNavigate} from "react-router-dom";
import {useLogoutMutation} from "../api/authApi.ts";
import {useAppSelector} from "../store/store.ts";

const pages = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'Editors',
        path: '/editor'
    },
    {
        title: 'Admins',
        path: '/admin'
    },
    {
        title: 'Lounge',
        path: '/lounge'
    },
    {
        title: 'Links page',
        path: '/linkpage'
    }
];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const {isAuth} = useAppSelector(state => state.user)
    const [logout] = useLogoutMutation()
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (callback?: () => void) => {
        setAnchorElUser(null);
        callback?.();
    };

    const signOut = async () => {
        await logout({});
        navigate('/linkpage');
    }

    const settings = [
        {
            title: 'Profile',
            href: '/profile'
        },
        {
            title:'Logout',
            click: signOut
        }
    ];

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Link sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                      component={RouterLink}
                      fontSize={18}
                      to={'/'}
                    >LOGO</Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map(({title, path}) => (
                                <MenuItem key={title} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link component={RouterLink} fontSize={18} to={path}>{title}</Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <List sx={{ flexGrow: 1, p: 0, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map(({title, path}) => (
                            <ListItem
                                key={title}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', width: 'auto', ':hover': {backgroundColor: 'rgba(255, 255, 255, 0.08)'} }}
                                color={'warning'}
                            >
                                <Link component={RouterLink} underline={'none'} color={'white'} to={path}>{title}</Link>
                            </ListItem>
                        ))}
                    </List>
                    {isAuth && (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={() => handleCloseUserMenu()}
                            >
                                {settings.map((setting) => {

                                    if (setting.href) {
                                        return (
                                            <MenuItem key={setting.title} onClick={() => handleCloseUserMenu()}>
                                                <Typography textAlign="center">
                                                    <Link component={RouterLink} to={setting.href} underline={'none'} color={'white'}>{setting.title}</Link>
                                                </Typography>
                                            </MenuItem>
                                        )
                                    }

                                    return (
                                        <MenuItem key={setting.title} onClick={() => handleCloseUserMenu(setting.click)}>
                                            <Typography textAlign="center">{setting.title}</Typography>
                                        </MenuItem>
                                    )
                                })}
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
