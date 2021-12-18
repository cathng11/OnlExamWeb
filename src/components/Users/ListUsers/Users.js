import * as React from 'react';
import CustomTable from '../../Helper/CustomTable/CustomTable';
import { Container, Typography, Grid } from '@mui/material'
import data from '../../../data/Data_Users.json'

const rows = data
const headCells = [
    {
        id: 'avatar',
        label: 'Avatar',
        disablePadding: true,
    },
    {
        id: 'id',
        label: 'User ID',
        disablePadding: false,
    },

    {
        id: 'firstname',
        label: 'First Name',
        disablePadding: false,
    },
    {
        id: 'lastname',
        label: 'Last Name',
        disablePadding: false,
    },
    {
        id: 'email',
        label: 'Email',
        disablePadding: false,
    },
    {
        id: 'phone',
        label: 'Phone',
        disablePadding: false,
    },
    {
        id: 'gender',
        label: 'Gender',
        disablePadding: false,
    },
    {
        id: 'verified',
        label: 'Verified',
        disablePadding: true,
    },
    {
        id: 'action',
        label: 'Action',
        disablePadding: true,
    },

];
export default function Users() {
    return (
        <Container maxWidth="full">
            <Grid container >
                <Grid item xs={12}>
                    <Typography
                        sx={{ p:3 }}
                        color="inherit"
                        variant="h5"
                        component="div"
                    >
                        Class - 18N13
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable rows={rows} headCells={headCells} view={'Classes'} autha={'Teacher'}/>
                </Grid>
            </Grid>
        </Container>
    )
}



