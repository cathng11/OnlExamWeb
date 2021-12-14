import React from 'react'
import {
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material'
export default function TrueFalse({ solution }) {
    return (
        <FormControl component="fieldset">
            <RadioGroup
                aria-label="gender"
                // defaultValue="female"
                name="radio-buttons-group"
            >
                {solution.map((val, index) => {
                    if (val.answer === -1)
                        return (<FormControlLabel
                            key={index}
                            value={val.options} 
                            control={<Radio />} 
                            label={val.options}
                        />);
                    else return (<FormControlLabel
                        key={index}
                        value={val.options} control={<Radio />} label={val.options}
                        checked={val.answer === 0 || val.answer === -1 ? false : true}
                    />)
                    }
                )}
            </RadioGroup>
        </FormControl>    )
}
