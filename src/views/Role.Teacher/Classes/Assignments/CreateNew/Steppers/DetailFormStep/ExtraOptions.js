import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {
    Box, Button, Paper, TextField,
    Typography
} from '@mui/material'
import React from 'react'
import PreviewDialog from '../../../../../../../components/Dialog/PreviewDialog'
import AssignmentContext from './../../../../../../../context/AssignmentContext';

export default function ExtraOptions() {
    const { assign, setAssign } = React.useContext(AssignmentContext);
    const [openPreviewAssignment, setOpenPreviewAssignment] = React.useState(false)

    const [date, setDate] = React.useState({
        TimeBegin: new Date(),
        TimeEnd: new Date(),
    });
    const handleChangeTimeBegin = (e) => {
        let value = e.toLocaleString().replace(',', '')
        setDate(s => { return { ...s, TimeBegin: value } })
        setAssign(s => { return { ...s, TimeBegin: value } })
    }
    const handleChangeTimeEnd = (e) => {
        let value = e.toLocaleString().replace(',', '')
        setDate(s => { return { ...s, TimeEnd: value } })
        setAssign(s => { return { ...s, TimeEnd: value } })

    }
    const handlePreview = () => {
        setOpenPreviewAssignment(true)
    }
    return (
        <Paper
            component="div"
            sx={{
                display: 'flex',
                height: '70vh',
                flexDirection: 'column',
                background: '#D6E6F2',
                p: 5,
                boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                borderRadius: '10px'
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDateFns} >
                <Box
                    component={'div'}
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}
                >
                    <Typography variant="body1">
                        Active from:
                    </Typography>
                    <DateTimePicker
                        renderInput={(params) => <TextField {...params} margin="normal" size="small" fullWidth={true}
                            name="TimeBegin"
                        />}
                        value={date.TimeBegin}
                        onChange={handleChangeTimeBegin}
                        ampm={false}
                        name="TimeBegin"
                        format="yyyy-MM-dd HH:mm:ss"

                    />
                    <Typography variant="body1" >
                        to
                    </Typography>
                    <DateTimePicker
                        renderInput={(params) => <TextField {...params} margin="normal" size="small" fullWidth={true} />}
                        value={date.TimeEnd}
                        ampm={false}
                        format="yyyy-MM-dd HH:mm:ss"
                        name="TimeEnd"
                        onChange={handleChangeTimeEnd}
                    />
                </Box>
            </LocalizationProvider>

            <Button color="primary" sx={{ m: 5 }} onClick={handlePreview}>PREVIEW</Button>
            <PreviewDialog open={openPreviewAssignment} handleClose={() => setOpenPreviewAssignment(false)} data={assign} />
        </Paper>
    )
}
