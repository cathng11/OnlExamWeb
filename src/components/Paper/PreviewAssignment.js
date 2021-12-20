import {
    Box,
    Divider, Grid,
    Typography
} from '@mui/material';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LoadingPreviewAssignment from '../Skeleton/LoadingPreviewAssignment';
import AssignmentService from './../../services/assignment.service';
import ResultService from './../../services/result.service';
import Essay from './../../views/Role.Teacher/Classes/Results/DetailResult/QuizType/Essay';
import MultipleChoice from './../../views/Role.Teacher/Classes/Results/DetailResult/QuizType/MultipleChoice';
import SingleChoice from './../../views/Role.Teacher/Classes/Results/DetailResult/QuizType/SingleChoice';
import TrueFalse from './../../views/Role.Teacher/Classes/Results/DetailResult/QuizType/TrueFalse';
import LoadingAlert from './../Loading/LoadingAlert';

function Question({ data, index }) {
    const type = {
        'Single Choice': <SingleChoice Solution={data.Solution} Answer={data.Answer} index={null} />,
        'Multiple Choices': <MultipleChoice Solution={data.Solution} Answer={data.Answer} index={null} />,
        'True/False': <TrueFalse Solution={data.Solution} Answer={data.Answer} index={null} />,
        'Essay': <Essay Solution={data.Solution} Answer={data.Answer} index={null} />
    }

    return (
        <Grid container sx={{ p: 2 }} spacing={2} >
            <Grid container item xs={12}
                columnSpacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'left' }}>
                        Question {index}: {data.Question}
                        <Divider />
                    </Typography>
                </Grid>

            </Grid>

            <Grid container item xs={12}>
                <Grid item xs={12} md={4} lg={4}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'left' }}>
                        Answer:
                    </Typography>
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    {type[data.Type]}
                </Grid>
            </Grid>
        </Grid>
    )
}
export default function PreviewAssignment({ dataCreate, close }) {
    const [data, setData] = React.useState(null)
    const [state, setState] = React.useState({
        loading: false,
        alert: false,
        title: ''
    })
    let location = useLocation();
    let history = useHistory();
    let query = new URLSearchParams(location.search)
    let role = localStorage.getItem('roles')

    let examID = query.get("previewExamID")

    React.useEffect(() => {
        let mounted = true;
        if (dataCreate) {
            setData(dataCreate)
        }
        if (examID) {
            setState(s => { return { ...s, loading: true } })
            if (role === 'TEACHER') {
                let assignmentService = AssignmentService.getInstance()
                assignmentService.getDetailAssignment(examID)
                    .then(items => {
                        if (mounted) {
                            if (items.status.Code === 200) {
                                setData(items.data)
                            }
                            else {
                                setState({ loading: false, alert: true, title: items.message })
                            }
                        }
                    })
                    .catch(err => {
                        console.error(err)
                        setState({ loading: false, alert: true, title: 'Error. Try again!' })
                    })
                setState(s => { return { ...s, loading: false } })
            }
            else if (role === 'STUDENT') {
                setState(s => { return { ...s, loading: true } })
                let resultService = ResultService.getInstance()
                resultService.reviewDoneAssignmentForStudent(examID)
                    .then(items => {
                        if (items.status.Code === 200) {
                            setData(items.data)
                        }
                        else {
                            setState({ loading: false, alert: true, title: 'Cannot review because you did not turn in this assignment' })
                            history.goBack()
                            setTimeout(() => {
                                close();
                            }, 3000);

                        }
                    })
                    .catch(err => {
                        console.error(err)
                        setState({ loading: false, alert: true, title: 'Error. Try again!' })
                    })
                setState(s => { return { ...s, loading: false } })
            }
        }
        return () => { mounted = false };//eslint-disable-next-line
    }, [examID, dataCreate])
    return (
        <Box>
            {data ?
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            Exam ID: {data.ExamID}
                        </Typography>
                        <Typography variant="subtitle1">
                            Exam Name: {data.ExamName}
                        </Typography>
                        <Typography variant="subtitle1">
                            Time Begin: {data.TimeBegin?.replace('T', ' ').replace('.000Z', '').toString()}
                        </Typography>
                        <Typography variant="subtitle1">
                            Time End: {data.TimeEnd?.replace('T', ' ').replace('.000Z', '').toString()}
                        </Typography>
                        <Typography variant="subtitle1">
                            Duration: {data.Duration}
                        </Typography>
                        <Typography variant="subtitle1">
                            Total Questions: {data.Questions.length}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {data.Questions.map((value, index) => {
                            return (
                                <Question key={index} data={value} index={index} />
                            )
                        })}
                    </Grid>
                </Grid>
                : <LoadingPreviewAssignment />}
            <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
        </Box>
    )
}
