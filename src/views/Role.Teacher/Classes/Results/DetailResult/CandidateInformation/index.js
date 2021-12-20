import {
    Box, Grid, InputAdornment, TextField,
    Typography
} from '@mui/material'
import React from 'react'
import ResultContext from './../../../../../../context/ResultContext';
function UserItem({ data }) {
    return (
        <Grid container item xs={12} spacing={5}>
            <Grid item xs={12} md={12} lg={4}>
                <Typography variant="body1" >
                    {data.content}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
                <Typography variant="body1" color="primary" align="right">
                    {data.value}
                </Typography>
            </Grid>
        </Grid>
    )
}
export default function CandidateInformation({ data, studentID, classID }) {
    const info = [
        {
            content: 'UserID',
            value: studentID,
        },
        {
            content: 'Fullname',
            value: data.Firstname + ' ' + data.Lastname,
        },
        {
            content: 'Email',
            value: data.Email,
        },
        {
            content: 'ClassID',
            value: classID,
        },
        {
            content: 'ExamName',
            value: data.ExamName,
        },
    ]
    const { setResult } = React.useContext(ResultContext)
    const [feedback, setFeedback] = React.useState(data.Feedback)
    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value)
        setResult(s => { return { ...s, Feedback: e.target.value } })
    }
    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h5" sx={{ textAlign: 'center', pb: 3 }}>
                Final Result
            </Typography>
            <Box>
                <Grid container spacing={2}>
                    {info.map((val) => (
                        <UserItem data={val} key={val.content} />
                    ))}
                </Grid>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pt: 3,
                        pb: 3,

                    }}
                >
                    <TextField
                        id="outlined-basic"
                        label="Total Grade"
                        variant="outlined"
                        value={data.Mark}
                        disabled
                        size="small"
                        margin="normal"
                        sx={{ mr: 2, '& .css-186xcr5': { paddingRight: '15px' } }}
                    />
                    <TextField
                        disabled
                        label="Correct Answer"
                        id="filled-hidden-label-small"
                        value={data.CorrectNumber}
                        variant="outlined"
                        size="small"
                        margin="normal"
                        sx={{ '& .css-186xcr5': { paddingRight: '15px' } }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">/ {data.Questions.length}</InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <TextField
                    id="outlined-multiline-static"
                    label="Feedback"
                    multiline
                    rows={4}
                    placeholder="Feedback"
                    value={feedback}
                    onChange={handleFeedbackChange}
                    fullWidth={true}
                    disabled={data.Accept ? true : false}
                    size="small"
                    sx={{ '& .css-186xcr5': { paddingRight: '15px' } }}
                />
            </Box>
        </Box>
    )
}
