import React from 'react'
import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import AlertBar from './../../Alert/AlertBar';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { useLocation } from 'react-router-dom';
import LoadingEditAssignment from '../../Skeleton/LoadingEditAssignment';
import AssignmentService from './../../../services/assignment.service';

export default function AssignmentDialog({ isSave, refresh }) {
    const [state, setState] = React.useState({
        alert: false,
        title: ''
    })
    const [input, setInput] = React.useState(null);

    let location = useLocation();
    let query = new URLSearchParams(location.search)
    let examID = query.get('edit');
    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setInput(s => { return { ...s, [name]: value } })
    }
    const handleChangeTimeBegin = (e) => {
        let value = e.toLocaleString().replace(',', '')
        setInput(s => { return { ...s, TimeBegin: value } })
    }
    const handleChangeTimeEnd = (e) => {
        let value = e.toLocaleString().replace(',', '')
        setInput(s => { return { ...s, TimeEnd: value } })
    }
    React.useEffect(() => {
        let mounted = true;
        let assignmentService = AssignmentService.getInstance()
        if (examID) {
            assignmentService.getDetailAssignment(examID)
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            let item = items.data
                            setInput({
                                ExamName: item.ExamName,
                                Duration: item.Duration,
                                TimeBegin: item.TimeBegin,
                                TimeEnd: item.TimeEnd,
                            })
                        }
                        else {
                            setState({ alert: true, title: 'Error. Try again!' })
                            refresh();
                        }
                    }
                })
                .catch(err => console.error(err))
        }

        if (isSave) {
            assignmentService.updateAssignment(examID, input)
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            setState({ alert: true, title: 'Updated this assignment!' })
                            refresh();
                        }
                        else {
                            setState({ alert: true, title: 'Error. Try again!' })
                            refresh();
                        }
                    }
                })
                .catch(err => console.error(err))
        } // eslint-disable-next-line
    }, [isSave, examID])
    if (!input) {
        return (<LoadingEditAssignment />)
    } else
        return (
            <Box>
                <TextField
                    id="name-text"
                    label="Class Name"
                    variant="filled"
                    fullWidth={true}
                    margin="normal"
                    name="ExamName"
                    value={input.ExamName}
                    onChange={handleChange}
                    size="small"
                />
                <TextField
                    label="Duration"
                    id="duration-text"
                    variant="filled"
                    margin="normal"
                    size="small"
                    name="Duration"
                    sx={{ '& .css-186xcr5': { paddingRight: '15px' } }}
                    type='number'
                    value={input.Duration}
                    onChange={handleChange}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">m</InputAdornment>,
                        inputProps: {
                            max: 100, min: 5
                        }
                    }}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns} >
                    <Typography variant="body1" sx={{ m: 1 }}>
                        Active from:
                    </Typography>
                    <DateTimePicker
                        renderInput={(params) => <TextField {...params} margin="normal" size="small" fullWidth={true}
                            name="TimeBegin"
                        />}
                        value={input.TimeBegin}
                        onChange={handleChangeTimeBegin}
                        ampm={false}
                        name="TimeBegin"
                    />
                    <Typography variant="body1" sx={{ m: 1 }}>
                        to
                    </Typography>
                    <DateTimePicker
                        renderInput={(params) => <TextField {...params} margin="normal" size="small" fullWidth={true} />}
                        value={input.TimeEnd}
                        onChange={handleChangeTimeEnd}
                        ampm={false}
                        name="TimeEnd"
                    />
                </LocalizationProvider>

                <AlertBar
                    title={state.title}
                    openAlert={state.alert}
                    closeAlert={() => setState(s => { return { ...s, alert: false } })}
                />
            </Box>
        )
}
