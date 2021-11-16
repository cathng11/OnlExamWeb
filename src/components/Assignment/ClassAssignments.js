import * as React from 'react';
import CustomTable from '../Helper/CustomTable/CustomTable';
import { Container, Typography, Grid } from '@mui/material'

function createData(id, name, subject, totalQuiz, createdOn,status) {
    return {
        id,
        name,
        subject,
        totalQuiz,
        createdOn,
        status
    };
}
function RandomInt() {
    return Math.floor(Math.random() * (999999999 - 100000000 + 1)) + 100000000;
}
const rows = [
    createData(RandomInt(),'Donut', 'DB', 40, '21/11/2020','Completed'),
    createData(RandomInt(),'Eclair', 'DB',40,'21/11/2020','Completed'),
    createData(RandomInt(),'Frozen yoghurt','DB', 40, '21/11/2020','Active'),
    createData(RandomInt(),'Gingerbread', 'DB', 40, '21/11/2020','Active'),
    createData(RandomInt(),'Honeycomb', 'DB',40,'21/11/2020','Inactive'),
    createData(RandomInt(),'Ice cream sandwich', 'DB', 40, '21/11/2020','Inactive'),
    createData(RandomInt(),'Jelly Bean', 'DB',40,'21/11/2020','Hidden'),
    createData(RandomInt(),'KitKat', 'DB', 40, '21/11/2020','Hidden'),
    createData(RandomInt(),'Lollipop', 'DB', 40, '21/11/2020','Hidden'),
];
const headCells = [
    {
        id: 'id',
        label: 'ID',
        disablePadding: false,
    },

    {
        id: 'name',
        label: 'Name',
        disablePadding: false,
    },
    {
        id: 'subject',
        label: 'Subject',
        disablePadding: false,
    },
    {
        id: 'totalQuiz',
        label: 'Total Quiz',
        disablePadding: false,
    },
    {
        id: 'createdOn',
        label: 'Created On',
        disablePadding: true,
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
export default function ClassAssignments() {
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
                        Assignments - 18N13
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable rows={rows} headCells={headCells} view={'Assignment'} autha={'Teacher'}/>
                </Grid>
            </Grid>
        </Container>
    )
}