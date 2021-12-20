import {
    Box, Button, Divider, Grid, InputAdornment, TextField, Typography
} from '@mui/material'
import React from 'react'
import Essay from '../QuizType/Essay'
import MultipleChoice from '../QuizType/MultipleChoice'
import SingleChoice from '../QuizType/SingleChoice'
import TrueFalse from '../QuizType/TrueFalse'
import ResultContext from './../../../../../../context/ResultContext'
import MessageDialog from './../../../../../../components/Dialog/MessageDialog';
import LoadingAlert from './../../../../../../components/Loading/LoadingAlert';
import { useHistory } from 'react-router-dom';
import ResultService from './../../../../../../services/result.service';
function Question({ data, index, accept }) {
    const { result, setResult } = React.useContext(ResultContext)
    const type = {
        'Single Choice': <SingleChoice Solution={data.Solution} Answer={data.Answer} index={null} />,
        'Multiple Choices': <MultipleChoice Solution={data.Solution} Answer={data.Answer} index={null} />,
        'True/False': <TrueFalse Solution={data.Solution} Answer={data.Answer} index={null} />,
        'Essay': <Essay Solution={data.Solution} Answer={data.Answer} index={null} />
    }
    const [grade, setGrade] = React.useState(0)
    const handleChange = (e) => {
        let _grade = parseInt(e.target.value)
        setGrade(_grade)
        if (result.QMark) {
            let arr = result.QMark.filter(s => {
                return s.QuestionID !== data.QuestionID
            })
            arr.push({
                QuestionID: data.QuestionID,
                Mark: _grade
            })
            setResult(s => { return { ...s, QMark: arr } })
        } else {
            let arr = []
            arr.push({
                QuestionID: data.QuestionID,
                Mark: _grade
            })
            setResult(s => { return { ...s, QMark: arr } })

        }
    }
    return (
        <Grid container sx={{ p: 5 }} spacing={2} >
            <Grid item xs={12}
                columnSpacing={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <Typography variant="subtitle1" sx={{ textAlign: 'left' }}>
                    Question {index + 1}: {data.Question}
                    <Divider />
                </Typography>
            </Grid>

            <Grid container item xs={12}>
                <Grid item xs={12} md={2} lg={2}>
                    <Typography variant="subtitle1" sx={{ textAlign: 'left' }}>
                        Answer:
                    </Typography>
                    {data.MaxEssay && !accept ? <TextField
                        id="essay"
                        variant="outlined"
                        value={grade}
                        onChange={handleChange}
                        size="small"
                        margin="normal"
                        sx={{ borderRadius: '20px' }}
                        type='number'
                        InputProps={{
                            endAdornment: <InputAdornment position="end">/ {data.MaxEssay}</InputAdornment>,
                            inputProps: {
                                max: data.MaxEssay, min: 0
                            }
                        }}
                    /> : <></>}
                </Grid>
                <Grid item xs={12} md={10} lg={10}>
                    {type[data.Type]}
                </Grid>
            </Grid>
        </Grid>
    )
}
export default function CandidateExamPaper({ data }) {
    const { result } = React.useContext(ResultContext)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [state, setState] = React.useState({
        loading: false,
        alert: false,
        title: ''
    })
    let history = useHistory();

    const handleAccept = () => {
        setOpenDialog(false)
        setState(s => { return { ...s, loading: true } })
        let finalMark = 0;
        if (result.QMark) {// eslint-disable-next-line
            result.QMark.filter(s => { finalMark += s.Mark })
        }
        finalMark += result.Mark
        let _data = {
            ExamID: result.ExamID,
            UserID: result.UserID,
            Mark: finalMark,
            Feedback: result.Feedback,
            Accept: true
        }
        let resultService = ResultService.getInstance()
        resultService.confirmResult(_data)
            .then(items => {
                if (items.status.Code === 200) {
                    setState({ loading: false, alert: true, title: `Updated result!` })
                    history.goBack()
                }
                else {
                    setState({ loading: false, alert: true, title: items.message })
                }
            })
            .catch((err) => {
                console.error(err)
                setState({ loading: false, alert: true, title: 'Error. Try again!' })

            });
        setState(s => { return { ...s, loading: false } })
    }
    const handleBack = () => {
        history.goBack()
    }
    return (
        <Box>
            {data.Questions.map((value, index) => (
                <Question key={index} data={value} index={index} accept={data.Accept}/>
            ))}
            <Divider />
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                pt: 3,
                pb: 3,
            }}>
                {data.Accept ? <></> : <Button
                    color="error"
                    sx={{ mr: 1 }}
                    variant="contained"
                    onClick={() => setOpenDialog(true)}
                >
                    Accept</Button>}
                <Button
                    color="inherit"
                    sx={{ mr: 1 }}
                    onClick={handleBack}
                >
                    Back</Button>
            </Box>
            <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
            <MessageDialog
                open={openDialog}
                close={() => setOpenDialog(false)}
                accepted={handleAccept}
                content={"Are you sure to confirm this result?"} />
        </Box>
    )
}
