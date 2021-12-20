import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Box, Button, Card, CardActionArea,
    CardActions, IconButton,
    Menu, MenuItem
} from '@mui/material';
import React from 'react';
import { useHistory } from "react-router-dom";
import ClassService from './../../services/class.service';
import LibraryService from './../../services/library.service';
import MessageDialog from './../Dialog/MessageDialog';
import LoadingAlert from './../Loading/LoadingAlert';
import CardAreaClass from './CardAreaClass';
import CardAreaLibrary from './CardAreaLibrary';
export default function FolderItem({ data, edit, view, refresh }) {
    const history = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [state, setState] = React.useState({
        loading: false,
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
            edit(data.ClassID)
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
        setState(s => { return { ...s, loading: true } })
        if (view === 'Library') {
            let id = data.LibraryFolderID
            let libraryService = LibraryService.getInstance();
            libraryService.delete(id)
                .then(items => {
                    if (items.status.Code === 200) {
                        setState({ loading: false, alert: true, title: `Deleted folder ${id}!` })
                        history.push('/library')
                        refresh()
                    }
                    else {
                        setState({ loading: false, alert: true, title: items.message })
                    }
                })
                .catch(err => {
                    console.error(err)
                    setState({ loading: false, alert: true, title: 'Error. Try again!' })
                })
        }
        if (view === 'Classes') {
            let id = data.ClassID
            let classService = ClassService.getInstance();
            classService.deleteClass(id)
                .then(items => {
                    if (items.status.Code === 200) {
                        setState({ loading: false, alert: true, title: `Deleted class ${id}!` })
                        history.push('/classes')
                        refresh()
                    }
                    else {
                        setState({ loading: false, alert: true, title: items.message })
                    }
                })
                .catch(err => {
                    console.error(err)
                    setState({ loading: false, alert: true, title: 'Error. Try again!' })

                })
        }
        handleClose()
        setState(s => { return { ...s, loading: false } })

    }
    const heightCard = view === 'Library' ? '55vh' : '40vh';
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
            background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);'
        }}
            key={view === 'Library' ? data.LibraryFolderID : data.ClassID}>
            <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
            <CardActionArea sx={{
                height: '50vh',
                background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);',
            }} onClick={handleDetail}>
                {view === 'Library' ? <CardAreaLibrary data={data} /> : <CardAreaClass data={data} />}
            </CardActionArea>
            <CardActions
                sx={{
                    height: '5vh',
                    background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);',
                    width: '100%',
                    borderTop: '1px solid gray'
                }}
                disableSpacing={true}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);',
                    width: '100%'
                }}>
                    <Button size="small" color="error" onClick={handleDetail}>
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
            <MessageDialog
                open={openDialog}
                close={handleClose}
                accepted={handleAcceptDel}
                content={"Are you sure to delete this folder?"}
            />
        </Card >
    )
}
