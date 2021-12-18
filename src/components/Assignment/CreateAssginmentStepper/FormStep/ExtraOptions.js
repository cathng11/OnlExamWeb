import React from 'react'
import {
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    TextField,
    Typography,
    Button
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker'

export default function ExtraOptions() {
    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                height: '100%',
                flexDirection: 'column',
                // justifyContent: 'center',
                // alignItems: 'center',
                background: 'white',
                p: 5,
            }}
        >


            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box
                    component={'div'}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        alignItems: 'center',
                        pb: 3
                    }}
                >
                    <Typography variant="body1" sx={{ pr: 3 }}>
                        Active from:
                    </Typography>
                    <DesktopDateTimePicker
                        // value={value}
                        // onChange={(newValue) => {
                        //     setValue(newValue);
                        // }}

                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Typography variant="body1" sx={{ pr: 3, pl: 3 }}>
                        to
                    </Typography>
                    <DesktopDateTimePicker
                        // value={value}
                        // onChange={(newValue) => {
                        //     setValue(newValue);
                        // }}

                        renderInput={(params) => <TextField {...params} />}
                    />
                </Box>
            </LocalizationProvider>
            <FormControl sx={{ pb: 3 }} size="small">
                <InputLabel id="subject-label">Status</InputLabel>
                <Select
                    labelId="subject-label"
                    id="subject-select"
                    // value={age}
                    label="Status"
                // onChange={handleChange}
                >
                    <MenuItem value={0}>Public</MenuItem>
                    <MenuItem value={1}>Hidden</MenuItem>
                </Select>
                <FormHelperText>*Required</FormHelperText>
            </FormControl>
            <TextField
                label="Note for Candidates"
                id="duration-text"
                sx={{ pb: 3 }}
                size="small"
                multiline
                rows={4}
            />
            <Button color="secondary">PREVIEW</Button>
        </Box>
    )
}
