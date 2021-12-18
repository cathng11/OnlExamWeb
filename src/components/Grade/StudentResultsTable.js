import * as React from 'react'
import {
    Container,
    Typography,
    Grid
} from '@mui/material'
import CustomTable from '../Helper/CustomTable/CustomTable'

function createData(id,classname,subject,name,finishedTime, _status, _correct, totalAnswers) {
    let status = _status === 1 ? 'Accepted' : 'Pending';
    let correct = `${_correct}/${totalAnswers}`
    let grade = (_correct / totalAnswers * 10).toFixed(2);
    console.log(grade)
    return { id,classname,subject,name,finishedTime, status, correct,grade }
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
        id: 'finishedTime',
        label: 'Finished Time (m)',
        disablePadding: false,
    },
    {
        id: 'status',
        label: 'Status',
        disablePadding: false,
    },
    {
        id: 'correct',
        label: 'Correct Answers',
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
const rows = [
    createData(1,'18N13','Database','MidTearm', 40, 1, 11, 41),
    createData(2,'18N14','OOP','Homework',33, 40, 0, 11, 41),
    createData(3,'18N13','Testing','Final exam',12, 40, 1, 11, 41),
]
export default function StudentResultsTable() {
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
                        Your Exam Results
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable rows={rows} headCells={headCells} view={'Grade'} autha={'Student'}/>
                </Grid>
            </Grid>
        </Container>
    )
}
