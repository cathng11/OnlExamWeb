import {
    Box, Button, Paper, Step, StepLabel, Stepper
} from '@mui/material';
import React from 'react';
import { useHistory } from "react-router-dom";
import MessageDialog from './../../../../../../components/Dialog/MessageDialog';
import LoadingAlert from './../../../../../../components/Loading/LoadingAlert';
import AssignmentContext from './../../../../../../context/AssignmentContext';
import AssignmentService from './../../../../../../services/assignment.service';
import BriefInfo from './DetailFormStep/BriefInfo';
import ExtraOptions from './DetailFormStep/ExtraOptions';
import RandQuizOptions from './DetailFormStep/RandQuizOptions';

const steps = ['Fill Brief Information', 'Create Exam Questions', 'Finish Step']

function ActiveStep({ activeStep, currentClass, classes, library }) {
    const info = { currentClass, classes, library }
    if (activeStep === 0) {
        return <BriefInfo info={info} />
    } else if (activeStep === 1) {
        return <RandQuizOptions />
    } else if (activeStep === 2) {
        return <ExtraOptions />
    }
}
export default function Steppers({ currentClass, classes, library }) {
    const { assign, setAssign } = React.useContext(AssignmentContext);
    const [state, setState] = React.useState({
        loading: false,
        alert: false,
        title: ''
    })
    const [openDialog, setOpenDialog] = React.useState({
        state: false,
        title: '',
        action: ''
    })
    let history = useHistory();

    const [activeStep, setActiveStep] = React.useState(0)

    const handleNext = () => {
        if (activeStep === 0) {
            if (!assign.LibraryFolderID || !assign.ExamName || assign.Duration === 0) {
                setState(s => { return { alert: true, title: 'Input fields are required' } })
            }
            else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
            }
        }
        if (activeStep === 1) {
            if (assign.Type && assign.Type.length > 2 && assign.Type.includes('Essay') && assign.MaxEssay === 0) {
                setState(s => { return { alert: true, title: 'Maximum mark for the essay fields is required' } })
            }
            else if (!assign.Questions) {
                setState(s => { return { alert: true, title: 'Questions field is required' } })
            }
            else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
            }
        }
        if (activeStep === 2) {
            if (!assign.TimeBegin || !assign.TimeEnd) {
                setState(s => { return { alert: true, title: 'Input fields are required' } })
            }
            else if (assign.TimeEnd <= assign.TimeBegin) {
                setState(s => { return { alert: true, title: 'Invalid range time' } })
            }
            else {
                setOpenDialog({ state: true, title: "Are you sure to create this assignment ?", action: 'create' })
            }
        }
    }

    const handleBack = () => {
        setOpenDialog({ state: true, title: "Are you sure to reset process and go back ?", action: 'back' })

    }

    const handleReset = () => {
        setActiveStep(0)
    }
    const handleAccept = () => {
        if (openDialog.action === 'back') {
            handleReset()
            setAssign(null)
            handleCloseDialog()
        }
        else if (openDialog.action === 'create') {
            handleCloseDialog()
            setState(s => { return { ...s, loading: true } })
            let questionsID = assign.Questions.map(i => { return i.QuestionID })
            let classID = assign.ClassID.map(i => { return i.ClassID }).concat(parseInt(currentClass))
            let assignment = {
                ClassID: classID,
                ExamName: assign.ExamName,
                TimeBegin: assign.TimeBegin,
                TimeEnd: assign.TimeEnd,
                Duration: parseInt(assign.Duration),
                QuestionID: questionsID,
                MaxEssay: assign.MaxEssay,
            }
            let assignmentService = AssignmentService.getInstance()
            assignmentService.createAssignment(assignment)
                .then(items => {
                    if (items.status.Code === 200) {
                        setState({ loading: false, alert: true, title: 'Created this assignment' })
                        history.replace(`/classes/${currentClass}/assignments`)
                    }
                    else {
                        setState({ loading: false, alert: true, title: 'Error. Try again' })
                        history.goBack()
                    }

                })
                .catch((err) => {
                    console.error(err)
                    setState(s => { return { ...s, loading: false } })
                });
            setState(s => { return { ...s, loading: false } })
        }

    }
    const handleCloseDialog = () => {
        setOpenDialog(s => { return { ...s, state: false } })
    }
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
            <MessageDialog
                open={openDialog.state}
                close={handleCloseDialog}
                accepted={handleAccept}
                content={openDialog.title}
            />
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {}
                    const labelProps = {}
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    )
                })}
            </Stepper>
            <Box>
                <Paper sx={{ mt: 1 }}>
                    <ActiveStep activeStep={activeStep} currentClass={currentClass} classes={classes} library={library} />

                </Paper>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />

                    <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
