import {
    Box, Container,
    Grid,
    Paper
} from '@mui/material';
import React from 'react';
import { Prompt, useHistory, useLocation } from 'react-router';
import LoadingDoAssignment from '../../../../components/Skeleton/LoadingDoAssignment';
import AlertBar from './../../../../components/Alert/AlertBar';
import DoAssignmentContext from './../../../../context/DoAssignmentContext';
import useUnload from './../../../../hooks/useUnload';
import AssignmentService from './../../../../services/assignment.service';
import CountdownTimer from './Tool/CountdownTimer';
import ExamBox from './Tool/ExamBox';
import QuizProgress from './Tool/QuizProgress';
import StudentDetails from './Tool/StudentDetails';

export default function DoAssignment() {
    const { setAssignment } = React.useContext(DoAssignmentContext)

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
        alert: false,
        title: ''
    })
    const [data, setData] = React.useState(null)
    useUnload(e => {
        e.preventDefault();
        e.returnValue = '';
    });
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
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
                            console.log(item.Questions);
                            setAssignment(item)
                            setAssignment(s => { return { ...s, TimeBegin: new Date() } })
                            setData(item)
                            setProgress(100 / item.Questions.length)
                        }
                        else {
                            setState({ alert: true, title: `Cannot load data. Try again!` })
                            history.goBack()
                        }
                    }
                })
                .catch((err) => {
                    console.error(err)
                    setState({ alert: true, title: `Cannot load data. Try again!` })
                    history.goBack()
                });
        }
        return () => { mounted = false };// eslint-disable-next-line
    }, [])
    if (!data) {
        return (
            <Container maxWidth="full" sx={{ mt: 6, mb: 2 }}>
                <AlertBar
                    title={state.title}
                    openAlert={state.alert}
                    closeAlert={() => setState(s => { return { ...s, alert: false } })}
                />
                <LoadingDoAssignment />
            </Container>
        )
    }
    else
        return (
            <Container maxWidth="full" sx={{ mt: 6, mb: 2 }}>
                <Prompt
                    when={blockReloadPage}
                    message='You have unsaved changes, are you sure you want to leave?'
                />
                <AlertBar
                    title={state.title}
                    openAlert={state.alert}
                    closeAlert={() => setState(s => { return { ...s, alert: false } })}
                />
                <Grid container spacing={5}>
                    <Grid item xs={12} md={3} lg={3}>
                        <Paper sx={{ p: 3, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;' }}>
                            <StudentDetails data={data} />
                        </Paper>
                    </Grid>
                    <Grid container item xs={9} md={7} lg={7} spacing={2}>
                        <Grid item xs={12}>
                            <Paper sx={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;' }}>
                                <QuizProgress progress={progress} />
                            </Paper>

                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;' }}>
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
                            <CountdownTimer unit={'seconds'} timevalue={60} activeStep={activeStep} />
                            <CountdownTimer unit={'minutes'} timevalue={data.Duration} activeStep={activeStep} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>


        )

}
