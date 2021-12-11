import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Box, Chip, Stack, styled, TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import * as React from 'react';

const Input = styled('input')({
    display: 'none',
});

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
const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 36,
    height: 36,
    border: `2px solid ${theme.palette.background.paper}`,
}));
function AssignmentsDialog() {
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
function LibraryDialog() {
    return (
        <Box>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ pb: 4 }}>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        <SmallAvatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" >
                            <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </SmallAvatar>
                    }
                >
                    <Avatar sx={{ width: '150px', height: '150px' }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />

                </Badge>
            </Stack>
            <TextField
                id="name-text"
                label="Name Folder"
                variant="filled"
                fullWidth={true}
                sx={{ pb: 3 }}
                size="small"
            />
            <TextField
                id="name-text"
                label="Description"
                variant="filled"
                fullWidth={true}
                sx={{ pb: 3 }}
                size="small"
                multiline={true}
                rows={5}
            />
        </Box>
    )
}
function ClassesDialog() {
    return (
        <Box>
            <TextField
                id="name-text"
                label="Class Name"
                variant="filled"
                fullWidth={true}
                sx={{ pb: 3 }}
                size="small"
            />
        </Box>
    )
}
function StudentsDialog() {
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
    return (
        <Box>
            <TextField
                id="name-text"
                label="Class Name"
                variant="filled"
                fullWidth={true}
                sx={{ pb: 3 }}
                size="small"
            />
            <Chip
                label="Clickable Deletable"
                onClick={handleClick}
                onDelete={handleDelete}
            />
            <Chip
                label="Clickable Deletable"
                variant="outlined"
                onClick={handleClick}
                onDelete={handleDelete}
            />
        </Box>
    )
}
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
    const Close = () => {
        handleClose(false)
    };
    const pageDialog = {
        'Library': <LibraryDialog />,
        'Assignments': <AssignmentsDialog />,
        'Classes': <ClassesDialog />,
        'Result': <ResultDialog />,
        'Students': <StudentsDialog />
    }
    const titleCreate = {
        'Library': 'Create New Questions Folder',
        'Assignments': 'Create New Class',
        'Classes': 'Create New Class',
        'Result': 'Create New Class',
        'Students': 'Add students'
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
                        // sx={{
                        //     display: 'flex',
                        //     flexDirection: 'column',
                        //     m: 'auto',
                        //     width: 'fit-content',
                        // }}
                        noValidate
                        autoComplete="off"
                    >
                        {pageDialog[open.pageName]}
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={Close}>
                        Save
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}