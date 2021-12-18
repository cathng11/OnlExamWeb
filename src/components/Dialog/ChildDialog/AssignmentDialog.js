import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import LoadingEditAssignment from '../../Skeleton/LoadingEditAssignment';
import AssignmentService from './../../../services/assignment.service';
import LoadingAlert from './../../Loading/LoadingAlert';

export default function AssignmentDialog({ isSave, refresh }) {
    const [state, setState] = React.useState({
        loading: false,
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
    const showErrorMessage = () => {
        setState({ loading: false, alert: true, title: 'Error. Try again!' })
        setTimeout(() => {
            refresh();
        }, 2000);
    }
    React.useEffect(() => {
        let mounted = true;
        let assignmentService = AssignmentService.getInstance()
        if (examID && !isSave) {
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
                            showErrorMessage()
                        }
                    }
                })
                .catch(err => {
                    console.error(err)
                    showErrorMessage()
                })
        }

        if (isSave) {
            setState(s => { return { ...s, loading: true } })
            assignmentService.updateAssignment(examID, input)
                .then(items => {
                    console.log(items)
                    if (mounted) {
                        if (items.status.Code === 200) {
                            setState({ loading: false, alert: true, title: 'Updated this assignment!' })
                            refresh();
                        }
                        else {
                            setState({ loading: false, alert: true, title: items.message })
                            setTimeout(() => {
                                refresh();
                            }, 3000);
                        }
                    }
                })
                .catch(err => {
                    console.error(err)
                    showErrorMessage()
                })
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
                    variant="outlined"
                    fullWidth={true}
                    margin="normal"
                    name="ExamName"
                    value={input.ExamName}
                    onChange={handleChange}
                    sx={{ '& .css-186xcr5': { paddingRight: '15px' } }}
                />
                <TextField
                    label="Duration"
                    id="duration-text"
                    variant="outlined"
                    margin="normal"
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
                        renderInput={(params) => <TextField {...params} margin="normal" fullWidth={true}
                            name="TimeBegin"
                            sx={{ '& .css-186xcr5': { paddingRight: '15px' } }}
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
                        renderInput={(params) => <TextField {...params} margin="normal" sx={{ '& .css-186xcr5': { paddingRight: '15px' } }} fullWidth={true} />}
                        value={input.TimeEnd}
                        onChange={handleChangeTimeEnd}
                        ampm={false}
                        name="TimeEnd"
                    />
                </LocalizationProvider>
                <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
            </Box>
        )
}
