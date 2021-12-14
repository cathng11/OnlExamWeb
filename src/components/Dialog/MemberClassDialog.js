import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
export default function MemberClassDialog({ open, data, close, classID }) {
    const handleClose = () => {
        close();
    };
    const content = [
        {
            title: "UserID",
            text: data.UserID,
        },
        {
            title: "Username",
            text: data.Username,
        },
        {
            title: "First name",
            text: data.Firstname
        },
        {
            title: "Last name",
            text: data.Lastname,
        },
        {
            title: "Email",
            text: data.Email,
        },
        {
            title: "Gender",
            text: data.Gender ? "Male" : "Female",
        },
        {
            title: "Birthday",
            text: data.DateOfBirth,
        },
        {
            title: "Address",
            text: data.Address,
        },
        {
            title: "Phone",
            text: data.Phone,
        },
    ]
    return (
        <div>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'}>
                <DialogTitle align="center">Member Information In Class {classID}</DialogTitle>
                <Divider />
                <DialogContent>
                    <Grid container spacing={4}>
                        <Grid item xs={4} justify="center">
                            <Box sx={{width: '100%', height: '100%',mr:3}}>
                                <Avatar
                                    alt={data.Username}
                                    src={data.Avatar}
                                    sx={{ width: '100%', height: '100%', p: 5 }}
                                />
                            </Box>
                        </Grid>
                        <Grid container item xs={8} spacing={3}>
                            {content.map((item, index) => {
                                return (
                                    <Grid container item xs={12} key={index}>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" >
                                                {item.title}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="subtitle1">
                                                {item.text}
                                            </Typography>

                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}