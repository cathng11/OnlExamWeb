import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {
    Box, Button, MobileStepper, Paper, Typography, useTheme
} from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router';
import { handleDataAssignment } from '../../../../../utils';
import Essay from '../../../../Role.Teacher/Classes/Results/DetailResult/QuizType/Essay';
import MultipleChoice from '../../../../Role.Teacher/Classes/Results/DetailResult/QuizType/MultipleChoice';
import SingleChoice from '../../../../Role.Teacher/Classes/Results/DetailResult/QuizType/SingleChoice';
import TrueFalse from '../../../../Role.Teacher/Classes/Results/DetailResult/QuizType/TrueFalse';
import MessageDialog from './../../../../../components/Dialog/MessageDialog';
import LoadingAlert from './../../../../../components/Loading/LoadingAlert';
import DoAssignmentContext from './../../../../../context/DoAssignmentContext';
import QuestionContext from './../../../../../context/QuestionContext';
import AssignmentService from './../../../../../services/assignment.service';

export default function ExamBox({ data, setCurrentProgress, setDisableBlock }) {
    let history = useHistory();
    const { assignment } = React.useContext(DoAssignmentContext)
    const { question } = React.useContext(QuestionContext)
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = data.length;
    const [progress, setProgress] = React.useState(2 * 100 / maxSteps);
    const [openDialog, setOpenDialog] = React.useState(false)
    const [state, setState] = React.useState({
        loading: false,
        alert: false,
        title: ''
    })
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 100 / maxSteps));
        setCurrentProgress(progress, activeStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 2);
        setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress - 100 / maxSteps));
        setCurrentProgress(progress, activeStep);
    };

    const handleAccept = () => {
        setState(s => { return { ...s, loading: true } })
        setOpenDialog(false)
        let user = JSON.parse(localStorage.getItem("user"))
        let result = handleDataAssignment(assignment, question)
        let assignmentService = AssignmentService.getInstance()
        assignmentService.submitAssignment(result)
            .then(items => {
                if (items.status.Code === 200) {
                    setState({ loading: false, alert: true, title: `Submitted your assignment!` })
                    setDisableBlock()
                    setTimeout(() => {
                        history.replace(`/${user.Username}/assignment`)
                    }, 3000);
                }
                else {
                    setState({ loading: false, alert: true, title: `Cannot submit. Try again!` })
                }

            })
            .catch((err) => {
                console.error(err)
                setState({ loading: false, alert: true, title: `Cannot submit. Try again!` })
            });
    }
    const type = {
        'Single Choice': <SingleChoice Solution={data[activeStep].Solution} index={activeStep} />,
        'Multiple Choices': <MultipleChoice Solution={data[activeStep].Solution} index={activeStep} />,
        'True/False': <TrueFalse Solution={data[activeStep].Solution} index={activeStep} />,
        'Essay': <Essay Solution={data[activeStep].Solution} index={activeStep} />
    }
    return (
        <Box sx={{
            flexGrow: 1,
            fontSize: '1.25rem',
            height: '70vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
        }}>
            <Paper
                square
                elevation={0}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 5,
                    pb: 0,
                }}
            >
                <Typography variant="h6">Q{activeStep + 1}: {data[activeStep].Question}</Typography>
            </Paper>
            <Box sx={{ maxHeight: '100%', height: '70%', width: '100%', pl: 5, pt: 2 }}>
                {type[data[activeStep].Type]}
            </Box>
            <MobileStepper
                variant={"text"}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                }}
                nextButton={
                    <Box>
                        {activeStep === maxSteps - 1 ?
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => setOpenDialog(true)}>Finish</Button> :
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                            >
                                Next
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>}

                    </Box>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
            <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
            <MessageDialog
                open={openDialog}
                close={() => setOpenDialog(false)}
                accepted={handleAccept}
                content={"Are you sure to submit this assignment?"}
            />
        </Box>
    )
}
