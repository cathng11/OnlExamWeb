import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import FileUploadIcon from '@mui/icons-material/FileUpload';
import EditIcon from '@mui/icons-material/Edit';
import {
    alpha,
    Button, IconButton, Toolbar, Tooltip, Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { matchPath, useHistory } from "react-router-dom";
import SearchBtn from '../../components/Button/SearchBtn';
import ModalDialog from './../Dialog/ModalDialog';


export default function TableToolbar(props) {
    let history = useHistory();
    const pageview = { 'Result': 'result', 'Student': 'student', 'Assignment': 'assignments' }
    const match = matchPath(history.location.pathname, {
        path: `/classes/:id/${pageview[props.view]}`,
        exact: true,
        strict: false
    });
    const { numSelected, view } = props;
    // let { id_class } = useParams();
    const [open, setOpen] = React.useState({
        pageName: 'Student', isOpen: false, id: ''
    });
    function handleClickAdd() {
        if (view === 'Assignment') {
            history.push(`/create-assignment?inClass=${match.params.id}`);
        }
        else if (view === 'Student') {
            // history.push(`/add`);
            setOpen({ pageName: 'Student', isOpen: true, id: '' });
        }
        else if (view === 'Result') {
            // history.push(`/${data.id_class}/grade`);
        }
    }
    function handleClickEdit() {
        if (view === 'Assignment') {
            history.push(`/assignment/${props.selected}/edit`);
        }
        else if (view === 'Student') {
            history.push(`/`);
        }
        else if (view === 'Result') {
            // history.push(`/${data.id}/grade`);
        }
    }
    const handleClose = (value) => {
        setOpen({ pageName: 'Student', isOpen: value, id: '' });
    };
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
                    <SearchBtn onClick={()=>alert('hi')}/>
                </Typography>
            )}
            {numSelected > 0 ? (
                <>
                    <Tooltip title="Delete">
                        <IconButton>
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
                    {props.view === 'Result' ? <></> : <Button color="inherit" startIcon={<AddIcon />} onClick={handleClickAdd}>ADD</Button>}
                    {/* <Button color="inherit" startIcon={<FileUploadIcon />}>IMPORT</Button>
                    <Button color="inherit" startIcon={<FileDownloadIcon />}>EXPORT</Button> */}
                </>
            )}
            <ModalDialog open={open} handleClose={handleClose} />
        </Toolbar>
    );
};

TableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
