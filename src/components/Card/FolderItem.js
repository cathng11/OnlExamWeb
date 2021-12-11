import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Box, Button, Card, CardActionArea,
    CardActions, Divider, IconButton,
    Menu, MenuItem
} from '@mui/material';
import React from 'react';
import { useHistory } from "react-router-dom";
import CardAreaClass from './CardAreaClass';
import CardAreaLibrary from './CardAreaLibrary';
export default function FolderItem({ data, edit, view }) {
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleCloseMenu = () => {
        setAnchorEl(null)
    }
    const handleEdit = () => {
        if (view === 'Library') {
            edit(data.LibraryFolderID)
        }
        if (view === 'Classes') {
            edit(data.id)
        }

    }
    const handleDetail = () => {
        if (view === 'Library') {
            history.push(`/library/folder/${data.LibraryFolderName}/${data.LibraryFolderID}`)
        }
        if (view === 'Classes') {
            history.push(`/classes/${data.ClassID}`);
        }
    }
    const heightCard = view === 'Library' ? 400 : 320;
    return (
        <Card sx={{
            m: 5,
            height: heightCard,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
            borderRadius: '10px',
        }}
            key={view === 'Library' ? data.LibraryFolderID : data.ClassID}>
            <CardActionArea sx={{ height: heightCard - 50 }} onClick={handleDetail}>
                {view === 'Library' ? <CardAreaLibrary data={data} /> : <CardAreaClass data={data} />}
            </CardActionArea>
            <Divider />
            <CardActions
                sx={{
                    height: 50,
                    background: 'white',
                    width: '100%',
                    borderTop: '1px solid #bdc3c7'
                }}
                disableSpacing={true}
            >

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'white',
                    width: '100%'
                }}>
                    <Button size="small" color="primary" onClick={handleDetail}>
                        Detail
                    </Button>
                    <IconButton
                        aria-label="more"
                        id="button"
                        aria-controls="menu"
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Box>


                <Menu
                    id="menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                        'aria-labelledby': 'button',
                    }}
                >
                    <MenuItem onClick={handleEdit}>
                        <EditIcon sx={{ pr: 1 }} color="action" onClick={handleEdit} /> Edit
                    </MenuItem>
                    <MenuItem onClick={handleCloseMenu}>
                        <DeleteIcon sx={{ pr: 1 }} color="error" /> Delete
                    </MenuItem>
                </Menu>
            </CardActions>
        </Card >
    )
}
