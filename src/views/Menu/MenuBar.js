import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import {
    Box, Divider,
    ListItemIcon, Menu, MenuItem
} from '@mui/material';
import React from 'react';
import {
    Link, Redirect
} from "react-router-dom";
function ItemMenu({ to, name, exact, icon }) {
    const [navigate, setNavigate] = React.useState(false);

    function handleLogout() {
        localStorage.clear("token");
        localStorage.clear("roles")
        localStorage.clear("user")
        setNavigate(true);
    }
    if (navigate) {
        window.location.reload(false);
        return <Redirect to="/login" />
    }
    let _exact = exact ? 1 : 0
    return (
        <Box>
            <MenuItem>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                {name === 'Logout' ?
                    <Link to={to} exact={_exact} onClick={handleLogout} >{name}</Link>
                    : <Link to={to} exact={_exact}>{name}</Link>}

            </MenuItem>
            {name === 'My Account' ? <Divider /> : <></>}
        </Box>
    )
}

export default function MenuBar({ anchorEl, open, setAnchor }) {

    const handleClose = () => {
        setAnchor(null)
    }
    let ROLE=localStorage.getItem('roles')
    let USER=JSON.parse(localStorage.getItem('user'))
    let accountPath=ROLE==="STUDENT"?`/${USER.Username}/account`:'/account'
    let menus = [
        {
            name: 'My Account',
            to: accountPath,
            exact: false,
            icon: <AccountBoxIcon fontSize="small" />
        },
        {
            name: 'Settings',
            to: '/settings',
            exact: false,
            icon: <Settings fontSize="small" />
        },
        {
            name: 'Logout',
            to: '',
            exact: false,
            icon: <Logout fontSize="small" />
        },
    ]
    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    }
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            {menus.map((menu, index) =>
                <ItemMenu
                    key={index}
                    to={menu.to}
                    name={menu.name}
                    exact={menu.exact}
                    icon={menu.icon}
                />)}

        </Menu>
    )
}
