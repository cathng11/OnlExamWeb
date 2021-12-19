import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {
    alpha,
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Toolbar, Tooltip, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from "react-router-dom";
import SearchBtn from './../../../../../components/Button/SearchBtn';
import ModalDialog from './../../../../../components/Dialog/ModalDialog';
import LoadingAlert from './../../../../../components/Loading/LoadingAlert';
import LibraryService from './../../../../../services/library.service';


export default function ToolbarTable({ numSelected, selected, refresh }) {
    let history = useHistory();
    const [openDialog, setOpenDialog] = React.useState(false)
    const [state, setState] = React.useState({
        loading: false,
        alert: false,
        title: ''
    })
    const [openModal, setOpenModal] = React.useState({
        pageName: 'ImportQuestions', isOpen: false, id: ''
    });
    function handleEdit() {
        history.push(`${history.location.pathname}?editID=${selected}`);
    }
    function handleDelete() {
        history.push(`${history.location.pathname}`);
        setOpenDialog(true)
    }
    const handleImportStudents = () => {
        setOpenModal({ pageName: 'ImportQuestions', isOpen: true, id: '' });
    }
    const handleModalClose = (value) => {
        refresh();
        setOpenModal(s => { return { ...s, isOpen: false } });
    };
    function handleAcceptDel() {
        setState(s => { return { ...s, loading: true } })
        let libraryService = LibraryService.getInstance()
        libraryService.deleteQuestions({ QuestionID: selected })
            .then(items => {
                if (items.status.Code === 200) {
                    setState({ loading: false, alert: true, title: `Deleted questions ${selected}!` })
                    refresh();
                } else {
                    setState({ loading: false, alert: true, title: items.message })
                }
            }).catch(err => {
                console.error(err)
                setState({ loading: false, alert: true, title: 'Error. Try again!' })
            })
        handleClose()
    }
    function handleClose() {
        setOpenDialog(false)
    }
    return (
        <div>
            <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
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
                        Are you sure you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAcceptDel} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
            <ModalDialog open={openModal} handleClose={handleModalClose} />

            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        <SearchBtn onClick={() => alert('hi')} />
                    </Typography>
                )}
                {numSelected > 0 ? (
                    <>
                        <Tooltip title="Delete">
                            <IconButton onClick={handleDelete} >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                            <div>
                                <IconButton disabled={numSelected > 1 ? true : false} onClick={handleEdit}>
                                    <EditIcon />
                                </IconButton>
                            </div>

                        </Tooltip>
                    </>

                ) : (
                    <>
                        <Button 
                        color="primary" 
                        startIcon={<FileUploadIcon />} 
                        onClick={handleImportStudents} 
                        sx={{p:3}}
                        >IMPORT</Button>
                    </>
                )}
            </Toolbar>
        </div>

    );
};

ToolbarTable.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
