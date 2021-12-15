import {
    Backdrop, Box, Button, CircularProgress, Container, Paper, styled, TextField,
    Typography
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { Redirect } from 'react-router-dom';
import AlertBar from './../../components/Alert/AlertBar';
import ProfileService from './../../services/profile.service';

const CustomPaper = styled(Paper)(({ theme }) => ({
    height: '75vh',
    paddingTop: '30px',
    backdropFilter: 'blur(10px)',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
}));
const ContainerBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '50px',
}));
const WrapperContainer = styled(Container)(({ theme }) => ({
    background: 'white',
    marginTop: '50px',
    marginBottom: '20px'
}));

export default function MyAccount() {
    const [navigate, setNavigate] = useState(false);
    const old = useRef(null)
    const newPass = useRef(null)
    const confirm = useRef(null)
    const [state, setState] = useState({
        loading: false,
        alert: false,
        title: ''
    });
    const handleSave = (e) => {
        e.preventDefault();
        let _old = old.current.value;
        let _newPass = newPass.current.value;
        let _confirm = confirm.current.value;
        if (!_old || !_newPass || !_confirm) {
            setState(s => { return { ...s, alert: true, title: 'Input fields are required!' } });
        }
        else if (_newPass.length < 8) {
            setState(s => { return { ...s, alert: true, title: 'Password must be 8 characters long!' } });
        }
        else if (_confirm !== _newPass) {
            setState(s => { return { ...s, alert: true, title: 'Confirm password is not matched!' } });
        }
        else {

            let profileService = ProfileService.getInstance();
            profileService.updatePassword({ OldPassword: _old, NewPassword: _newPass })
                .then(items => {
                    if (items.status.Code === 200) {
                        setState(s => { return { alert: true, title: 'Changed password', loading: false } });
                        setTimeout(() => {
                            handleLogout()
                        }, 1000);
                    }
                    else {
                        setState(s => { return { alert: true, title: items.message, loading: false } });
                    }
                })
        }
    }
    function handleLogout() {
        localStorage.clear("token");
        localStorage.clear("roles")
        localStorage.clear("user")
        setNavigate(true);
    }
    if (navigate) {
        window.location.reload(false);
        return <Redirect to="/login" />
    }
    const handleReset = () => {
        old.current = null;
        newPass.current = null;
        confirm.current = null
    }
    const handleClose = () => {
        setState(s => { return { ...s, loading: false } });
    };
    return (
        <WrapperContainer maxWidth="sm">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={state.loading}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <AlertBar
                title={state.title}
                openAlert={state.alert}
                closeAlert={() => setState(s => { return { ...s, alert: false } })}
            />
            <CustomPaper >
                <ContainerBox >
                    <Typography variant="h5" sx={{ mb: 5, }}>
                        Create New Password
                    </Typography>
                    <TextField
                        id='current-password'
                        label="Current password"
                        name="Current password"
                        type="password"
                        margin="normal"
                        fullWidth={true}
                        size="small"
                        autoComplete="current-password"
                        inputRef={old}

                    />
                    <Typography variant="body1" sx={{ mb: 5 }}>
                        Your new password must be different from previous used password.
                    </Typography>
                    <TextField
                        id="new-password"
                        label="New password"
                        name="New password"
                        type="password"
                        sx={{ pb: 2 }}
                        fullWidth={true}
                        size="small"
                        autoComplete="new-password"
                        inputRef={newPass}

                    />
                    <TextField
                        id={'confirm-password'}
                        label="Confirm password"
                        name="Confirm password"
                        type="password"
                        margin="normal"
                        fullWidth={true}
                        size="small"
                        autoComplete="confirm-password"
                        inputRef={confirm}

                    />
                    <Box
                        sx={{
                            m: 3,
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <Button variant="outlined" sx={{ mr: 5 }} onClick={handleSave}>Save</Button>
                        <Button variant="contained" onClick={handleReset}>Reset</Button>
                    </Box>
                </ContainerBox>
            </CustomPaper>
        </WrapperContainer>
    )
}
