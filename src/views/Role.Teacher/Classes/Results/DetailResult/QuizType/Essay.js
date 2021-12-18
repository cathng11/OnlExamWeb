import React from 'react'
import { Box, TextField } from '@mui/material';
import DoAssignmentContext from './../../../../../../context/DoAssignmentContext';
import QuestionContext from './../../../../../../context/QuestionContext';

export default function Essay({ Solution, index }) {
    const [value, setValue] = React.useState('')
    const { assignment } = React.useContext(DoAssignmentContext)
    const { question, setQuestion } = React.useContext(QuestionContext)
    const handleChange = (e) => {
        let value = e.target.value
        setValue(value)
        let ques = assignment.Questions[index]
        let arr = question
        arr = arr.filter((item, i) => {
            return item.QuestionID !== ques.QuestionID
        })
        arr.push({
            QuestionID: ques.QuestionID,
            Question: ques.Question,
            Type: ques.Type,
            Level: ques.Level,
            LibraryFolderID: ques.LibraryFolderID,
            Solution: [
                {
                    SolutionID: ques.SolutionID,
                    Solution: value,
                    Correct: 1
                },
            ]
        })
        setQuestion(arr)
    }
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { pr: 5, width: '100%' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-basic"
                placeholder="Enter your answer here"
                multiline
                rows={14}
                value={value}
                onChange={handleChange}
                variant="outlined" />
        </Box>
    )
}
