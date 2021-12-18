import {
    Snackbar, IconButton, Backdrop, CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import * as React from 'react';
export default function LoadingAlert({ state, close }) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        close(false);
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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={state.loading}
            >
                <CircularProgress color="primary" />
            </Backdrop>
            <Snackbar
                open={state.alert}
                autoHideDuration={6000}
                onClose={handleClose}
                message={state.title !== '' ? state.title.toString() : ' '}
                action={action}
            />
        </div>
    )
}
