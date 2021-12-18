import React from 'react'
import {
    Box,
    TextField,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    Typography,
} from '@mui/material'
import HelperText from '../../Helper/HelperText'
export default function GeneralProfile({data}) {
    const [valueGender, setValueGender] = React.useState(data.gender)
    const handleChangeGender = (event, newValue) => {
        setValueGender(newValue)
        console.log(newValue)
    }
    return (
        <React.Fragment>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                background: 'white'
            }}>
                <Box sx={{ width: '50%', pr: 4 }}>
                    <TextField
                        id="name-text"
                        label="First Name"
                        fullWidth={true}
                        sx={{ pb: 2 }}
                        size="small"
                        value={data.firstName}
                        focus="true"
                        helperText={<HelperText txt={''} isError={false} />}
                    />
                    <TextField
                        id="name-text"
                        label="Email Address"
                        fullWidth={true}
                        sx={{ pb: 2 }}
                        size="small"
                        value={data.email}
                        focus="true"
                        helperText={<HelperText txt={''} isError={false} />}
                    />
                    <TextField
                        id="name-text"
                        label="City"
                        fullWidth={true}
                        sx={{ pb: 2 }}
                        size="small"
                        value={data.city}
                        focus="true"
                        helperText={<HelperText txt={''} isError={false} />}
                    />
                    <TextField
                        id="name-text"
                        label="User ID"
                        fullWidth={true}
                        sx={{ pb: 2 }}
                        size="small"
                        focus="true"
                        value={data.userId}
                        helperText={<HelperText txt={''} isError={false} />}
                    />
                </Box>
                <Box sx={{ width: '50%' }}>
                    <TextField
                        id="name-text"
                        label="Last Name"
                        fullWidth={true}
                        sx={{ pb: 2 }}
                        size="small"
                        value={data.lastName}
                        focus="true"
                        helperText={<HelperText txt={''} isError={false} />}
                    />
                    <TextField
                        id="name-text"
                        label="Phone Number"
                        fullWidth={true}
                        sx={{ pb: 2 }}
                        size="small"
                        value={data.phone}
                        focus="true"
                        helperText={<HelperText txt={''} isError={false} />}
                    />
                    <FormControl component="fieldset" sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Typography component="div" sx={{ pr: 2 }}>Gender:</Typography>
                        <RadioGroup row aria-label="gender" name="row-radio-buttons-group" defaultValue={valueGender}
                        value={valueGender} onChange={handleChangeGender}
                        >
                            <FormControlLabel value={1} control={<Radio />} label="Female" />
                            <FormControlLabel value={0} control={<Radio />} label="Male" />
                            <FormControlLabel value={2} control={<Radio />} label="Other" />

                        </RadioGroup>
                    </FormControl>
                </Box>

            </Box>

        </React.Fragment>
    )
}
