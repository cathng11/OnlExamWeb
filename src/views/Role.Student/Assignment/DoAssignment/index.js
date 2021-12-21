import {
    Box, Container,
    Grid,
    Paper
} from '@mui/material';
import React from 'react';
import { Prompt, useHistory, useLocation } from 'react-router';
import LoadingDoAssignment from '../../../../components/Skeleton/LoadingDoAssignment';
import LoadingAlert from './../../../../components/Loading/LoadingAlert';
import DoAssignmentContext from './../../../../context/DoAssignmentContext';
import useUnload from './../../../../hooks/useUnload';
import AssignmentService from './../../../../services/assignment.service';
import CountdownTimer from './Tool/CountdownTimer';
import ExamBox from './Tool/ExamBox';
import QuizProgress from './Tool/QuizProgress';
import StudentDetails from './Tool/StudentDetails';
import QuestionContext from './../../../../context/QuestionContext';
import { handleDataAssignment } from '../../../../utils';

export default function DoAssignment() {
    const { assignment, setAssignment } = React.useContext(DoAssignmentContext)
    const { question } = React.useContext(QuestionContext)

    let location = useLocation();
    let history = useHistory();
    const [activeStep, setActiveStep] = React.useState(0);
    const [blockReloadPage, setBlockReloadPage] = React.useState(true)
    const [progress, setProgress] = React.useState(0);
    const setCurrentProgress = (progress, activeStep) => {
        setActiveStep(activeStep);
        setProgress(progress);
    }
    const [state, setState] = React.useState({
        loading: false,
        alert: false,
        title: ''
    })
    const [data, setData] = React.useState(null)
    const backupData = () => {
        let result = handleDataAssignment(assignment, question)
        localStorage.setItem('assignment', JSON.stringify(result))
    }
    useUnload(e => {
        backupData()
        e.preventDefault();
        e.returnValue = '';
    });
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    React.useEffect(() => {
        let query = new URLSearchParams(location.search)
        let classID = query.get("inClass")
        let examID = query.get("examID")

        let mounted = true;
        if (classID && examID) {
            let assignmentService = AssignmentService.getInstance()
            assignmentService.getAssignmentToDo(examID)
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            let item = items.data
                            item.Questions = shuffle(item.Questions);
                            setAssignment(item)
                            setAssignment(s => { return { ...s, TimeBegin: new Date() } })
                            setData(item)
                            setProgress(100 / item.Questions.length)
                        }
                        else {
                            setState(s => { return { ...s, alert: true, title: items.message } })
                            history.goBack()
                        }
                    }
                })
                .catch((err) => {
                    console.error(err)
                    setState(s => { return { ...s, alert: true, title: `Error. Try again!` } })
                    history.goBack()
                });
        }
        return () => { mounted = false };// eslint-disable-next-line
    }, [])
    if (!data) {
        return (
            <Container maxWidth="full" sx={{ mt: 6, mb: 2 }}>
                <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
                <LoadingDoAssignment />
            </Container>
        )
    }
    else
        return (
            <Container maxWidth="full" sx={{
                mt: 6, mb: 2,
                WebkitUserSelect: 'none',
                WebkitTouchCallout: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none',
                color: '#cc0000',
            }}>
                <Prompt
                    when={blockReloadPage}
                    message={(location, action) => {
                        let result = window.confirm(`You have unsaved changes, are you sure you want to submit and leave?`)
                        if (action === 'PUSH' && result) {
                            let result = handleDataAssignment(assignment, question)
                            let assignmentService = AssignmentService.getInstance()
                            assignmentService.submitAssignment(result)
                                .then(items => { console.log(items) })
                                .catch((err) => {
                                    console.error(err)
                                });
                        }
                    }}
                />
                <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />

                <Grid container spacing={5}>
                    <Grid item xs={12} md={3} lg={3}>
                        <Paper sx={{ p: 3, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',borderRadius: '10px' }}>
                            <StudentDetails data={data} />
                        </Paper>
                    </Grid>
                    <Grid container item xs={9} md={7} lg={7} spacing={2}>
                        <Grid item xs={12}>
                            <Paper sx={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',borderRadius: '10px' }}>
                                <QuizProgress progress={progress} />
                            </Paper>

                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',borderRadius: '10px' }}>
                                <ExamBox
                                    data={data.Questions}
                                    setCurrentProgress={setCurrentProgress}
                                    setDisableBlock={() => setBlockReloadPage(false)} />
                            </Paper>
                        </Grid>

                    </Grid>
                    <Grid item xs={3} md={2} lg={2}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <CountdownTimer unit={'minutes'} timevalue={data.Duration} activeStep={activeStep} />
                        </Box>
                    </Grid>
                </Grid>
            </Container >


        )

}
