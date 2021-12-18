import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';
import {
    alpha,
    Button, IconButton, Toolbar, Tooltip, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { matchPath, useHistory } from "react-router-dom";
import SearchBtn from '../../components/Button/SearchBtn';
import ModalDialog from './../Dialog/ModalDialog';
import AlertBar from './../Alert/AlertBar';
import ClassService from './../../services/class.service';
import AssignmentService from './../../services/assignment.service';



export default function TableToolbar({ numSelected, view, selected, refresh }) {
    let history = useHistory();
    const page = { 'Result': 'result', 'Student': 'students', 'Assignment': 'assignments' }
    const match = matchPath(history.location.pathname, {
        path: `/classes/:id/${page[view]}`,
        exact: true,
        strict: false
    });
    const [openDialog, setOpenDialog] = React.useState(false)
    const [state, setState] = React.useState({
        alert: false,
        title: ''
    })
    // let { id_class } = useParams();
    const [openModal, setOpenModal] = React.useState({
        pageName: 'Student', isOpen: false, id: ''
    });

    function handleClickAdd() {
        if (view === 'Assignment') {
            history.push(`/create-assignment?inClass=${match.params.id}`);
        }
        else if (view === 'Student') {
            history.push(`${history.location.pathname}?addMembersInClass`);
            setOpenModal({ pageName: 'Student', isOpen: true, id: '' });
        }
        else if (view === 'Result') {
            // history.push(`/${data.id_class}/grade`);
        }
    }
    function handleClickEdit() {
        if (view === 'Assignment') {
            history.push(`${history.location.pathname}?edit=${selected}`);
            setOpenModal({ pageName: 'Assignments', isOpen: true, id: '' });
        }
        else if (view === 'Student') {
            setState({ alert: true, title: `Not allowed to edit!` })
        }
        else if (view === 'Result') {
            // history.push(`/${data.id}/grade`);
        }
    }
    function handleDelete() {
        setOpenDialog(true)
    }
    function handleAcceptDel() {
        if (view === 'Assignment') {
            let assignmentService = AssignmentService.getInstance()
            assignmentService.deleteAssignment(selected, { ClassID: match.params.id })
                .then(items => {
                    if (items.status.Code === 200) {
                        setState({ alert: true, title: `Deleted assignment ${selected} from this class` })
                        refresh()
                    }
                    else {
                        setState({ alert: true, title: items.message })
                    }
                })
                .catch(err => console.error(err))
        }
        else if (view === 'Student') {
            let classService = ClassService.getInstance()
            let classID = match.params.id
            classService.deleteMembersInClass(classID, { UserID: selected })
                .then(items => {
                    if (items.status.Code === 200) {
                        refresh()
                        setState({ alert: true, title: `Deleted members ${selected} from this class` })
                    }
                    else {
                        setState({ alert: true, title: items.message })
                    }
                })
                .catch(err => console.error(err))
        }
        else if (view === 'Result') {
            // history.push(`/${data.id}/grade`);
        }
        handleCloseDialog()
    }
    const handleClose = (value) => {
        history.push(`${history.location.pathname}`);
        refresh();
        setOpenModal(s => { return { ...s, isOpen: false } });
    };
    const handleImportStudents = () => {
        setOpenModal({ pageName: 'ImportStudents', isOpen: true, id: '' });

    }
    function handleCloseDialog() {
        setOpenDialog(false)
    }
    return (
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
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <div>
                            <IconButton disabled={numSelected > 1 ? true : false} onClick={handleClickEdit}>
                                <EditIcon />
                            </IconButton>
                        </div>

                    </Tooltip>
                </>

            ) : (
                <>
                    {/* <Tooltip title="Add">
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Import">
                        <IconButton>
                            <FileUploadIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Export">
                        <IconButton>
                            <FileDownloadIcon />
                        </IconButton>
                    </Tooltip> */}
                    {view === 'Result' ? <></> :
                        <Button color="primary" startIcon={<AddIcon />} onClick={handleClickAdd} sx={{ p: 3 }}>ADD</Button>
                    }
                    {view === 'Student' ? <Button color="primary" startIcon={<FileUploadIcon />} onClick={handleImportStudents} >IMPORT</Button> : <></>}
                    {/* <Button color="inherit" startIcon={<FileDownloadIcon />}>EXPORT</Button> */}
                </>
            )}
            <ModalDialog open={openModal} handleClose={handleClose} />
            <AlertBar
                title={state.title}
                openAlert={state.alert}
                closeAlert={() => setState(s => { return { ...s, alert: false } })}
            />
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"DolphinExam: "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleAcceptDel} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </Toolbar>
    );
};

TableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
