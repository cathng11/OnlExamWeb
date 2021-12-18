import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {
    Box, FormControl, Backdrop, CircularProgress,
    FormControlLabel, Radio, RadioGroup, styled, TextField, Typography
} from '@mui/material';
import React, { useRef, useState } from 'react';
import ProfileService from './../../../../services/profile.service';
import AlertBar from './../../../../components/Alert/AlertBar';

const CustomInput = styled(TextField)(({ theme }) => ({
    '& label.Mui-focused': {
        color: '#3D4E81',
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            border: '1px solid #380036',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#3D4E81',
        },
    },
    '& .css-186xcr5': { paddingRight: '15px' }
}));
const InputField = ({ id, name, label, value, handleChange }) => {
    return (
        <CustomInput
            id={`${id}-${name}`}
            name={name}
            label={label}
            fullWidth={true}
            value={value}
            margin="normal"
            onChange={(e) => handleChange(e)}
            disabled={name === 'userID' ? true : false}
        />
    )
}

export default function GeneralInformation({ data, isUpdate, setUpdated }) {
    const [state, setState] = React.useState({
        loading: false,
        alert: false,
        title: ''
    })
    const [input, setInput] = useState({
        Firstname: data.Firstname,
        Lastname: data.Lastname,
        Email: data.Email,
        Address: data.Address,
        Phone: data.Phone,
        Gender: data.Gender === false ? "false" : "true",
        DateOfBirth: data.DateOfBirth,
        Avatar: data.Avatar,
    })
    let inputClone = useRef(input);
    const handleChange = (e, tag) => {
        const name = tag ? 'DateOfBirth' : e.target.name;
        let value = name === 'DateOfBirth' ? e : e.target.value;
        if (name === "Gender") {
            value = e.target.value === "true" ? true : false;
        }
        setInput(s => { return { ...s, [name]: value } })
    }

    React.useEffect(() => {
        let mounted = true;
        if (isUpdate) {
            setState(s => { return { ...s, loading: true } })
            if (input !== inputClone.current) {
                let profileService = ProfileService.getInstance();
                profileService.update(input)
                    .then(items => {
                        if (mounted) {
                            if (items.status.Code === 200) {
                                inputClone.current = input
                                setUpdated()
                                setState({ loading: false, alert: true, title: `Updated your profile` })
                            }
                            else {
                                setState({ loading: false, alert: true, title: `Error. Try again!` })
                            }

                        }
                    })
                    .catch(err => {
                        console.error(err)
                        setState({ loading: false, alert: true, title: `Error. Try again!` })
                    })
            }
            else {
                setUpdated()
                setState(s => { return { ...s, loading: false } })
            }

        }
        return () => mounted = false;
    }, [data, isUpdate, input, setUpdated])
    let content = [
        {
            row1: [
                {
                    name: "Firstname",
                    label: "First Name",
                    value: input.Firstname
                },
                {
                    name: "Email",
                    label: "Email",
                    value: input.Email
                },
                {
                    name: "Address",
                    label: "Address",
                    value: input.Address
                },
                {
                    name: "userID",
                    label: "User ID",
                    value: data.UserID
                },
            ]
        },
        {
            row2: [

                {
                    name: "Lastname",
                    label: "Last Name",
                    value: input.Lastname
                },
                {
                    name: "Phone",
                    label: "Phone Number",
                    value: input.Phone
                },
            ]
        }

    ]
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
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={state.loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
                <AlertBar
                    title={state.title}
                    openAlert={state.alert}
                    closeAlert={() => setState(s => { return { ...s, alert: false } })}
                />
                <Box sx={{ width: '50%', pr: 4 }}>
                    {content[0].row1.map((value, index) =>
                        <InputField
                            key={index}
                            id={index}
                            name={value.name}
                            label={value.label}
                            value={value.value}
                            margin="normal"
                            handleChange={handleChange} />)}

                </Box>
                <Box sx={{ width: '50%' }}>
                    {content[1].row2.map((value, index) =>
                        <InputField
                            key={index}
                            id={index}
                            name={value.name}
                            label={value.label}
                            value={value.value}
                            margin="normal"
                            handleChange={handleChange} />)}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date Of Birth"
                            name="DateOfBirth"
                            value={input.DateOfBirth}
                            onChange={(e) => handleChange(e, 'DateOfBirth')}
                            renderInput={(params) => <CustomInput {...params}
                                id="dateOfBirth"
                                label="Date Of Birth"
                                fullWidth={true}
                                name="DateOfBirth"
                                margin="normal"
                
                                 />}
                        />
                    </LocalizationProvider>

                    <FormControl
                        component="fieldset"
                        margin="normal" sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Typography component="div" sx={{ pr: 5 }}>Gender:</Typography>
                        <RadioGroup
                            row
                            aria-label="Gender"
                            name="Gender"
                            defaultValue={input.Gender}
                            value={input.Gender} onChange={handleChange}
                        >
                            <FormControlLabel value={false} control={<Radio />} label="Female" />
                            <FormControlLabel value={true} control={<Radio />} label="Male" />

                        </RadioGroup>
                    </FormControl>
                </Box>

            </Box>

        </React.Fragment>
    )
}
