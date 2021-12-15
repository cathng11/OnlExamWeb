import React from 'react'
import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material'
export default function TrueFalse({ Solution }) {
    return (
        <FormControl component="fieldset">
            <RadioGroup
                aria-label="gender"
                // defaultValue="female"
                name="radio-buttons-group"
            >
                {Solution.map((val, index) => {
                    if (val.Correct === -1)
                        return (<FormControlLabel
                            key={index}
                            value={val.Solution} 
                            control={<Radio />} 
                            label={val.Solution}
                        />);
                    else return (<FormControlLabel
                        key={index}
                        value={val.Solution} control={<Radio />} label={val.Solution}
                        checked={val.Correct}
                    />)
                    }
                )}
            </RadioGroup>
        </FormControl>    )
}
