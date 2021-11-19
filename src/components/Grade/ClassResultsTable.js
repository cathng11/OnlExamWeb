import * as React from 'react';
import CustomTable from '../Helper/CustomTable/CustomTable';
import { Container, Typography, Grid } from '@mui/material'
import data from '../../data/Data_Grade.json'
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
        id: 'finishedTime',
        label: 'Finished Time',
        disablePadding: false,
    },
    {
        id: 'status',
        label: 'Status',
        disablePadding: false,
    },
    {
        id: 'correct',
        label: 'Correct Ans',
        disablePadding: true,
    },
    {
        id: 'grade',
        label: 'Grade',
        disablePadding: false,
    },
    {
        id: 'action',
        label: 'Action',
        disablePadding: true,
    },

];
export default function ClassResultsTable() {
    return (
        <Container maxWidth="full">
            <Grid container >
                <Grid item xs={12}>
                    <Typography
                        sx={{ p: 3 }}
                        color="inherit"
                        variant="h5"
                        component="div"
                    >
                        Class - 18N13
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable rows={rows} headCells={headCells} view={'Grade'} autha={'Teacher'}/>
                </Grid>
            </Grid>
        </Container>
    )
}



