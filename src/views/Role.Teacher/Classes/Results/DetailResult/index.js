import React from 'react'
import {
    Grid,
    Paper,
    Container,
} from '@mui/material'
import data from '../../../../../data/Data'
import CandidateInformation from './CandidateInformation'
import CandidateExamPaper from './CandidateExamPaper'

const info = [
    {
        content: 'UserID',
        value: '1209302',
    },
    {
        content: 'Fullname',
        value: 'John Henry',
    },
    {
        content: 'Email',
        value: 'john@gmail.com',
    },
    {
        content: 'Class',
        value: '19N32',
    },
    {
        content: 'Subject',
        value: 'Database',
    },
    {
        content: 'Assignment',
        value: 'Midterm Exam',
    },
]


export default function DetailResult() {
    return (
        <Container maxWidth="full" sx={{ mt: 4, mb: 2 }}>
            <Grid container spacing={5}>
                <Grid item xs={12} md={3} lg={3} sx={{ position: 'fixed' }}>
                    <Paper sx={{ p: 4 }}>
                        <CandidateInformation info={info} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={3} lg={3} sx={{ height: '600px', }}></Grid>
                <Grid item xs={12} md={9} lg={9} sx={{ position: 'relative' }}>
                    <Paper sx={{ pt: 2, pb: 2 }}>
                        <CandidateExamPaper data={data} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
