import React from 'react'
import {
    FormControl,
    FormControlLabel,
    Checkbox,
    FormGroup,
} from '@mui/material'
export default function MultipleChoice({ solution }) {
    const answer = solution;
    return (
        <FormControl component="fieldset" variant="standard">
            <FormGroup>
                {answer.map((val, index) => {
                    if (val.answer === -1)
                        return (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        // onChange={} 
                                        name={val.options} />
                                }
                                label={val.options}
                            />
                        );
                    else return (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    checked={val.answer === 0? false : true}
                                    name={val.options} />
                            }
                            label={val.options}
                        />
                    )
                }

                )}

            </FormGroup>
        </FormControl>
    )
}
