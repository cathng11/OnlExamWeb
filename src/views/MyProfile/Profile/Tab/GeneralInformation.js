import {
    Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, styled, TextField, Typography
} from '@mui/material';
import React, { useRef, useState } from 'react';
import LoadingAlert from './../../../../components/Loading/LoadingAlert';
import ProfileService from './../../../../services/profile.service';

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

export default function GeneralInformation({ data }) {
    const [state, setState] = React.useState({
        loading: false,
        alert: false,
        title: ''
    })
    const [input, setInput] = useState({
        Firstname: data.Firstname ? data.Firstname : '',
        Lastname: data.Lastname ? data.Lastname : '',
        Email: data.Email,
        Address: data.Address ? data.Address : '',
        Phone: data.Phone ? data.Phone : '',
        Gender: data.Gender === false ? "false" : "true",
        DateOfBirth: data.DateOfBirth ? new Date(data.DateOfBirth).toLocaleDateString('en-US') : '',
        Avatar: data.Avatar ? data.Avatar : '',
    })
    let inputClone = useRef(input);
    const handleChange = (e, tag) => {
        const name = e.target.name;
        let value = e.target.value;

        setInput(s => { return { ...s, [name]: value } })
    }
    function isValidDate(dt) {
        var reValidDate = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
        return reValidDate.test(dt);
    }
    function isValidPhoneNumber(dt) {
        var reValidPhone = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
        return reValidPhone.test(dt);
    }

    const handleUpdate = () => {
        setState(s => { return { ...s, loading: true } })
        if (!isValidDate(input.DateOfBirth)) {
            setState({ loading: false, alert: true, title: `Invalid Birthday` })
            return;
        }
        else if (!isValidPhoneNumber(input.Phone)) {
            setState({ loading: false, alert: true, title: `Invalid Phone Number` })
            return;
        }
        else if (Object.values(input).filter(value => value === "").length > 0) {
            setState({ loading: false, alert: true, title: `Input fields are required` })
            return;
        }
        else if (input !== inputClone.current) {
            let profileService = ProfileService.getInstance();
            profileService.update(input)
                .then(items => {
                    if (items.status.Code === 200) {
                        inputClone.current = input
                        setState({ loading: false, alert: true, title: `Updated your profile` })
                    }
                    else {
                        setState({ loading: false, alert: true, title: `Error. Try again!` })
                    }


                })
                .catch(err => {
                    console.error(err)
                    setState({ loading: false, alert: true, title: `Error. Try again!` })
                })
        }
        else {
            setState({ loading: false, alert: true, title: `Nothing is updated!` })

        }
    }
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
        <React.Fragment >
            <Box sx={{
                width: '100%',
                height: '50vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            }}>
                <Box sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    background: 'white'
                }}>
                    <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
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

                        <TextField
                            label="Date Of Birth"
                            name="DateOfBirth"
                            value={input.DateOfBirth}
                            placeholder="MM/DD/YYYY"
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth={true}
                            margin="normal" />

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
                                name="Gender"
                                // defaultValue={input.Gender}
                                value={input.Gender} onChange={handleChange}
                            >
                                <FormControlLabel value={"false"} control={<Radio />} label="Female" />
                                <FormControlLabel value={"true"} control={<Radio />} label="Male" />

                            </RadioGroup>
                        </FormControl>

                    </Box>
                </Box >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        color="error"
                        variant="contained"
                        onClick={handleUpdate}
                    >
                        Save
                    </Button>
                </Box>
            </Box>


        </React.Fragment >
    )
}
