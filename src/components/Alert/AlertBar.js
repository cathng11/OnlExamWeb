import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

export default function AlertBar({ openAlert, closeAlert,title }) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        closeAlert(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                component="div"
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleClose}
                message={title}
                action={action}
            />
        </div>
    );
}
