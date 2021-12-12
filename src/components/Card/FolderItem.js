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
import LibraryService from './../../services/library.service';
import { HistoryRounded } from '@mui/icons-material';
import AlertBar from '../Alert/AlertBar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
export default function FolderItem({ data, edit, view,isDeleted }) {
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [state, setState] = React.useState({
        alert: false,
        title: ''
    })
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
        setOpenDialog(false)
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
    const handleDelete = () => {
        setOpenDialog(true)
    }
    const handleAcceptDel = () => {
        if (view === 'Library') {
            let id = data.LibraryFolderID
            let libraryService = LibraryService.getInstance();
            libraryService.delete(id)
                .then(items => {
                    if (items.status.Code === 200) {
                        setState({ alert: true, title: `Deleted folder ${id}!` })
                        history.push('/library')
                        isDeleted()
                    }
                    else {
                        setState({ alert: true, title: 'Error. Try again!' })
                    }
                })
                .catch(err => console.error(err))
        }
        if (view === 'Classes') {
            edit(data.id)
        }
        handleClose()
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
            <AlertBar
                title={state.title}
                openAlert={state.alert}
                closeAlert={() => setState(s => { return { ...s, alert: false } })}
            />
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
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'button',
                    }}
                >
                    <MenuItem onClick={handleEdit}>
                        <EditIcon sx={{ pr: 1 }} color="action" onClick={handleEdit} /> Edit
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                        <DeleteIcon sx={{ pr: 1 }} color="error" /> Delete
                    </MenuItem>
                </Menu>
            </CardActions>
            <Dialog
                open={openDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"DolphinExam: "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this folder?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAcceptDel} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Card >
    )
}
