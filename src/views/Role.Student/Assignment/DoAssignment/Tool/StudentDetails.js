import {
    Box, Button, ButtonGroup, Divider, Grid, Typography
} from '@mui/material';
import React from 'react';
import DoAssignmentContext from './../../../../../context/DoAssignmentContext';
import QuestionContext from './../../../../../context/QuestionContext';
function UserItem({ data }) {
    return (
        <Grid container item xs={12}>
            <Grid item xs={12} md={12} lg={4}>
                <Typography variant="body1" >
                    {data.content}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
                <Typography variant="body1" color="primary">
                    {data.value}
                </Typography>
            </Grid>
        </Grid>
    )
}
export default function StudentDetails({ data }) {
    const { assignment } = React.useContext(DoAssignmentContext)
    const { question } = React.useContext(QuestionContext)
    const [isDone, setIsDone] = React.useState([])
    let user = JSON.parse(localStorage.getItem("user"));
    React.useEffect(() => {
        if (question) {
            let doneQuestionIDSet = new Set(question.map(item => { return item.QuestionID }))//eslint-disable-next-line
            let index = assignment.Questions.map((item, i) => {
                if (doneQuestionIDSet.has(item.QuestionID)) {
                    return i
                }
            })
            setIsDone(index)
        }//eslint-disable-next-line
    }, [question])
    const info = [
        {
            content: 'UserID',
            value: user.UserID,
        },
        {
            content: 'FullName',
            value: user.Firstname + ' ' + user.Lastname,
        },
        {
            content: 'Email',
            value: user.Email,
        },
        {
            content: 'Class',
            value: data.ClassName,
        },
        {
            content: 'Assignment',
            value: data.ExamName,
        },
    ]
    return (
        <>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
                Student Details
            </Typography>
            <Divider />
            <Grid container spacing={1}>
                {info.map((item, index) => (
                    <UserItem data={item} key={index} />
                ))}
            </Grid>
            <Divider variant="middle" />
            <Box sx={{ p: 4, background: 'white' }}>
                {data.Questions.map((val, index) =>
                    <ButtonGroup
                        key={index}
                        variant="contained"
                        aria-label="state-answer"
                        orientation="vertical"
                        sx={{ minWidth: 0 }}>
                        <ButtonGroup
                            variant="contained"
                            aria-label="state-answer"
                            orientation="horizontal"
                            sx={{ minWidth: 0 }}>
                            <Button
                                color={isDone.includes(index) ? "error" : "primary"}
                                sx={{
                                    width: '40px',
                                    p: 1,

                                }}>
                                {index + 1}
                            </Button>
                        </ButtonGroup>
                    </ButtonGroup>)}
            </Box>
        </>
    )
}
