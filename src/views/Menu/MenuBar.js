import React from 'react'
import {
    MenuItem,
    Menu,
    Divider,
    ListItemIcon,
    Box
} from '@mui/material'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import FaceIcon from '@mui/icons-material/Face';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {
    Link,
} from "react-router-dom";
function ItemMenu({ to, name, exact, icon }) {
    return (
        <Box>
            <MenuItem>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <Link to={to} exact={exact}>{name}</Link>

            </MenuItem>
            {name === 'My Account' ? <Divider /> : <></>}
        </Box>
    )
}
const menus = [
    // {
    //     name: 'Profile',
    //     to: '/profile',
    //     exact: false,
    //     icon: <FaceIcon fontSize="small" />
    // },
    {
        name: 'My Account',
        to: '/account',
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
export default function MenuBar({ anchorEl, open, setAnchor }) {

    const handleClose = () => {
        setAnchor(null)
    }
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
