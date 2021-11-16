import * as React from 'react'
import {
    Container,
    Typography,
    Grid
} from '@mui/material'
import CustomTable from '../Helper/CustomTable/CustomTable'

function createData(id,classname,subject,name,duration,begin,end,status) {
    return { id,classname,subject,name,duration,begin,end,status }
}
const headCells = [
    {
        id: 'id',
        label: 'ID',
        disablePadding: false,
    },
    {
        id: 'class',
        label: 'Class',
        disablePadding: false,
    },

    {
        id: 'subject',
        label: 'Subject',
        disablePadding: false,
    },
    {
        id: 'name',
        label: 'Name',
        disablePadding: false,
    },
    {
        id: 'duration',
        label: 'Durations (m)',
        disablePadding: false,
    },
    {
        id: 'begin',
        label: 'Begin Time',
        disablePadding: false,
    },
    {
        id: 'end',
        label: 'End Time',
        disablePadding: false,
    },
    {
        id: 'status',
        label: 'Status',
        disablePadding: false,
    },
    {
        id: 'action',
        label: '',
        disablePadding: true,
    },

];
const rows = [
    createData(1,'18N13','Database','MidTearm',40,'20/10/2021 15:23:00','20/10/2021 17:23:00','Completed'),
    createData(2,'18N14','OOP','Homework',40,'20/10/2021 15:23:00','20/10/2021 17:23:00','Active'),
    createData(3,'18N13','Testing','Final exam',40,'20/10/2021 15:23:00','20/10/2021 17:23:00','Inactive'),
]

export default function StudentAssignments() {
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
                        Your Assignments
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable rows={rows} headCells={headCells} view={'Assignment'} autha={'Student'}/>
                </Grid>
            </Grid>
        </Container>
    )
}
