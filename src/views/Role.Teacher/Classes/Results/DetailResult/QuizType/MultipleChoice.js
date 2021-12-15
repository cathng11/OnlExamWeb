import React from 'react'
import {
    FormControl,
    FormControlLabel,
    Checkbox,
    FormGroup,
} from '@mui/material'
export default function MultipleChoice({ Solution }) {
    const answer = Solution;
    return (
        <FormControl component="fieldset" variant="standard">
            <FormGroup>
                {answer.map((val, index) => {
                    if (val.Correct === -1)
                        return (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox
                                        // onChange={} 
                                        name={val.Solution} />
                                }
                                label={val.Solution}
                            />
                        );
                    else return (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    checked={val.Correct}
                                    name={val.Solution} />
                            }
                            label={val.Solution}
                        />
                    )
                }

                )}

            </FormGroup>
        </FormControl>
    )
}
