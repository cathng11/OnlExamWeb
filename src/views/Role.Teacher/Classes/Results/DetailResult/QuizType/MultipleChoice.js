import {
    Checkbox, FormControl,
    FormControlLabel, FormGroup
} from '@mui/material';
import React from 'react';
import DoAssignmentContext from './../../../../../../context/DoAssignmentContext';
import QuestionContext from './../../../../../../context/QuestionContext';

export default function MultipleChoice({ Solution, index, Answer }) {
    const { assignment } = React.useContext(DoAssignmentContext)
    const { question, setQuestion } = React.useContext(QuestionContext)
    const [checked, setChecked] = React.useState([])
    const handleChange = (e) => {
        let value = parseInt(e.target.value)
        let _checked = checked
        _checked.push(value)
        setChecked(_checked)
        let ques = assignment.Questions[index]
        let arr = question
        let result = ques.Solution.map((item, i) => {
            if (_checked.includes(item.SolutionID)) {
                item.Correct = 1

            }
            else {
                item.Correct = 0

            }
            return item
        })

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
        <FormControl component="fieldset" variant="standard">
            <FormGroup>
                {Solution.map((val, i) => {
                    if (index !== null)
                        return (
                            <FormControlLabel
                                key={i}
                                control={
                                    <Checkbox
                                        name={val.Solution}
                                    />
                                }
                                checked={val.Correct ? true : false}
                                value={val.SolutionID}
                                label={val.Solution}
                                onChange={handleChange}
                            />
                        );
                    else return (
                        <FormControlLabel
                            key={i}
                            control={
                                <Checkbox
                                    checked={val.Correct}
                                    name={val.Solution} />
                            }
                            label={val.Solution}
                            sx={{ color: Answer && Answer === val.Solution ? '#630000' : 'black' }}
                        />
                    )
                }

                )}

            </FormGroup>
        </FormControl>
    )
}
