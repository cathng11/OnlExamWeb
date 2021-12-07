import React from 'react'
import {
    Container,
    Grid,
    Paper,
    Box
} from '@mui/material'
import data from '../../../../data/DataNoAns';
import QuizProgress from './Tool/QuizProgress';
import CountdownTimer from './Tool/CountdownTimer';
import StudentDetails from './Tool/StudentDetails';
import ExamBox from './Tool/ExamBox';

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

export default function DoAssignment() {
    const [activeStep, setActiveStep] = React.useState(1);
    const [progress, setProgress] = React.useState(100/data.length);
    const setCurrentProgress = (progress, activeStep) => {
        setActiveStep(activeStep);
        setProgress(progress);
    }
    return (
        <Container maxWidth="full" sx={{ mt: 4, mb: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper sx={{ p: 3 }}>
                        <StudentDetails info={info} data={data}/>
                    </Paper>
                </Grid>
                <Grid container item xs={12} md={8} lg={8} spacing={2}>
                    <Grid item xs={12}>
                        <Paper>
                            <QuizProgress progress={progress}/>
                        </Paper>

                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <ExamBox data={data} setCurrentProgress={setCurrentProgress}/>
                        </Paper>
                    </Grid>

                </Grid>
                <Grid item xs={12} md={2} lg={1}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <CountdownTimer unit={'seconds'} timevalue={60} activeStep={activeStep} />
                        <CountdownTimer unit={'minutes'} timevalue={5} activeStep={activeStep} />
                    </Box>
                </Grid>
            </Grid>
        </Container>


    )

}
