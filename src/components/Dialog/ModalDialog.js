import CloseIcon from '@mui/icons-material/Close';
import { Box, styled, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import * as React from 'react';
import AssignmentDialog from './ChildDialog/AssignmentDialog';
import ClassDialog from './ChildDialog/ClassDialog';
import LibraryDialog from './ChildDialog/LibraryDialog';
import StudentDialog from './ChildDialog/StudentDialog';
import ImportStudentsDialog from './ChildDialog/ImportStudentsDialog';
import ImportQuestionsDialog from './ChildDialog/ImportQuestionsDialog';



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

function ResultDialog() {
    return (
        <Box>
            <TextField
                id="name-text"
                label="Name Folder"
                variant="filled"
                fullWidth={true}
                sx={{ pb: 3 }}
                size="small"
            />
        </Box>
    )
}
export default function ModalDialog({ open, handleClose }) {
    const [refresh, setRefresh] = React.useState(false)
    const [isSave, setIsSave] = React.useState(false)
    const [isEdit, setIsEdit] = React.useState({
        value: open.id !== '' ? true : false,
        id: open.id
    })
    const handleSave = () => {
        setIsSave(true)
    }
    React.useEffect(() => {
        setIsEdit({
            value: open.id !== '' ? true : false,
            id: open.id
        })
    }, [open]);
    const handleRefresh = () => {
        setRefresh(!refresh)
        setIsSave(false)
        Close()
    }
    const Close = () => {
        handleClose(false)
    };
    let pageDialog = {
        'Library': <LibraryDialog isSave={isSave} isEdit={isEdit} refresh={handleRefresh} />,
        'Assignments': <AssignmentDialog isSave={isSave} refresh={handleRefresh}/>,
        'Classes': <ClassDialog isSave={isSave} isEdit={isEdit} refresh={handleRefresh} />,
        'Result': <ResultDialog />,
        'Student': <StudentDialog isSave={isSave} refresh={handleRefresh}/>,
        'ImportStudents': <ImportStudentsDialog isSave={isSave} refresh={handleRefresh}/>,
        'ImportQuestions': <ImportQuestionsDialog isSave={isSave} refresh={handleRefresh}/>
    }

    const titleCreate = {
        'Library': 'Create New Questions Folder',
        'Assignments': 'Edit Information Assignment',
        'Classes': 'Create New Class',
        'Result': 'Result Assignment',
        'Student': 'Add New Students',
        'ImportStudents': 'Import Multiple Students',
        'ImportQuestions': 'Import Multiple Questions',

    }
    const titleEdit = {
        'Library': 'Edit Questions Folder ID - ' + open.id,
        'Assignments': 'Edit Information Class ID - ' + open.id,
        'Classes': 'Edit Information Class ID - ' + open.id,
        'Result': 'Edit Information Class ID - ' + open.id,
    }
    return (
        <div>
            <BootstrapDialog
                onClose={Close}
                aria-labelledby="customized-dialog-title"
                open={open.isOpen}
            >

                <BootstrapDialogTitle id="customized-dialog-title" onClose={Close}>
                    {open.id === '' ? titleCreate[open.pageName] : titleEdit[open.pageName]}
                </BootstrapDialogTitle>
                <DialogContent dividers >
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '125ch' },
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}

                        noValidate
                        autoComplete="off"
                    >
                        {pageDialog[open.pageName]}
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}