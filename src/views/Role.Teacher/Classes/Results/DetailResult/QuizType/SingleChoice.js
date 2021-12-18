import React from 'react'
import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material'
import DoAssignmentContext from './../../../../../../context/DoAssignmentContext';
import QuestionContext from './../../../../../../context/QuestionContext';

export default function SingleChoice({ Solution, index, Answer }) {
    const { assignment } = React.useContext(DoAssignmentContext)
    const { question, setQuestion } = React.useContext(QuestionContext)
    const handleChange = (e) => {
        let value = parseInt(e.target.value)
        let result = assignment.Questions[index].Solution.map((item, i) => {
            if (item.SolutionID === value) {
                item.Correct = 1
            }
            else {
                item.Correct = 0
            }
            return item
        })
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
            Solution: result
        })
        setQuestion(arr)
    }
    return (
        <FormControl component="fieldset">
            <RadioGroup
                aria-label="single-choice"
                name="single-choice"
            >
                {Solution.map((val, i) => {
                    if (index !== null)
                        return (
                            <FormControlLabel
                                key={i}
                                checked={val.Correct ? true : false}
                                value={val.SolutionID}
                                control={<Radio />}
                                label={val.Solution}
                                onChange={handleChange}
                            />);
                    else 
                        return (
                            <FormControlLabel
                                key={i}
                                value={val.Solution}
                                control={<Radio />}
                                label={val.Solution}
                                checked={val.Correct}
                                sx={{ color: Answer && Answer===val.Solution?'#630000':'black' }}
                            />)
                }
                )}
            </RadioGroup>
        </FormControl>
    )
}
