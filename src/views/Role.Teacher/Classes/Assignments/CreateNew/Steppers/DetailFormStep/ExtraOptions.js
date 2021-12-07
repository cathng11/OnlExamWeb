import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {
    Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField,
    Typography
} from '@mui/material'
import React from 'react'
import PreviewDialog from '../../../../../../../components/Dialog/PreviewDialog'

export default function ExtraOptions() {
    const [open, setOpen] = React.useState({
        isOpen: false,
        id: ''
    });
    const [value,setValue]=React.useState('')
    function handlePreview() {
        setOpen({ isOpen: true, id: '' });
    }
    const handleClose = (value) => {
        setOpen({ isOpen: value, id: '' });
    };
    // const handleEdit = (id) => {
    //     setOpen({ isOpen: true, id: id })
    // }
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
                boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                borderRadius:'10px'
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
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}

                        renderInput={(params) => <TextField {...params} />}
                    />
                    <Typography variant="body1" sx={{ pr: 3, pl: 3 }}>
                        to
                    </Typography>
                    <DesktopDateTimePicker
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}

                        renderInput={(params) => <TextField {...params} />}
                    />
                </Box>
            </LocalizationProvider>
            <FormControl sx={{ pb: 3 }} size="small">
                <InputLabel id="subject-label">Status</InputLabel>
                <Select
                    labelId="subject-label"
                    id="subject-select"
                    value={10}
                    label="Status"
                // onChange={handleChange}
                >
                    <MenuItem value={10}>Public</MenuItem>
                    <MenuItem value={11}>Hidden</MenuItem>
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
            <Button color="secondary" onClick={handlePreview}>PREVIEW</Button>
            <PreviewDialog open={open} handleClose={handleClose}/>
        </Box>
    )
}
