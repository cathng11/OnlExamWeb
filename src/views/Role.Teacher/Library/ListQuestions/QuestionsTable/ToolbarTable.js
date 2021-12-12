import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';
import {
    alpha,
    Button, IconButton, Toolbar, Tooltip, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { matchPath, useHistory } from "react-router-dom";
import SearchBtn from './../../../../../components/Button/SearchBtn';
import AlertBar from './../../../../../components/Alert/AlertBar';


export default function ToolbarTable(props) {
    let history = useHistory();
    const [openDialog, setOpenDialog] = React.useState(false)
    const [state, setState] = React.useState({
        alert: false,
        title: ''
    })
    const { numSelected, selected } = props;

    function handleAdd() {
        history.push(`${history.location.pathname}`);
    }
    function handleEdit() {
        history.push(`${history.location.pathname}?editID=${selected}`);
    }
    function handleDelete() {
        console.log(selected);
        setOpenDialog(true)
    }
    function handleAcceptDel() {
        setState({ alert: true, title: `Deleted questions ${selected}!` })
        handleClose()
    }
    function handleClose() {
        setOpenDialog(false)
    }
    return (
        <div>
            <AlertBar
                title={state.title}
                openAlert={state.alert}
                closeAlert={() => setState(s => { return { ...s, alert: false } })}
            />
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
                        <Button color="inherit" startIcon={<AddIcon />} onClick={handleAdd}>ADD</Button>
                        {/* <Button color="inherit" startIcon={<FileUploadIcon />}>IMPORT</Button>
                    <Button color="inherit" startIcon={<FileDownloadIcon />}>EXPORT</Button> */}
                    </>
                )}
            </Toolbar>
        </div>

    );
};

ToolbarTable.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
