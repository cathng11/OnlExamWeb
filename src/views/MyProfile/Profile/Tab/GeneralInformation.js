import React, { useRef } from 'react'
import {
    Box,
    TextField,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    Typography,
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import HelperText from './../../../../components/HelperText/HelperText';
import APP_CONSTANTS from '../../../../constants'
const token = APP_CONSTANTS.TOKEN_TEACHER
export default function GeneralInformation({ data, isUpdate }) {
    const name = useRef(null)
    const [firstName, setFirstName] = React.useState(data.Firstname);
    const [lastName, setLastName] = React.useState(data.Lastname);
    const [email, setEmail] = React.useState(data.Email);
    const [address, setAddress] = React.useState(data.Address);
    const [userID, setUserID] = React.useState(data.UserID);
    const [phone, setPhone] = React.useState(data.Phone);
    const [gender, setGender] = React.useState(data.Gender)
    const [birthday, setBirthday] = React.useState(data.DateOfBirth);

    const handleChange = (e, tag) => {
        if (tag === 'firstName') setFirstName(e.target.value)
        else if (tag === 'lastName') setLastName(e.target.value)
        else if (tag === 'email') setEmail(e.target.value)
        else if (tag === 'address') setAddress(e.target.value)
        else if (tag === 'gender') setGender(e.target.value)
        else if (tag === 'phone') setPhone(e.target.value)
        else if (tag === 'birthday') {
            setBirthday(e)
            console.log(e)
        }
    }
    async function updateProfile(data) {
        return fetch('https://onlxam.herokuapp.com/api/profile/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
            .then(data => data.json())
            .catch(err => console.log(err))
    }
    React.useEffect(() => {
        // console.log("Data", data)
        let mounted = true;
        if (isUpdate) {
            const edit = {
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Address: address,
                Gender: gender,
                DateOfBirth: birthday
            }
            const origin = {
                FirstName: data.FirstName,
                LastName: data.LastName,
                Email: data.Email,
                Address: data.Address,
                Gender: data.Gender,
                DateOfBirth: data.DateOfBirth
            }
            if (JSON.stringify(edit) !== JSON.stringify(origin)) {
                updateProfile(edit)
                    .then(items => {
                        if (mounted) {
                            // setData(items.data[0]);
                            console.log(items)
                        }
                    })

            }
            // console.log(JSON.stringify(edit) === JSON.stringify(origin))
        }
        return () => mounted = false;
    }, [data, isUpdate])
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
                        id="first-name"
                        label="First Name"
                        fullWidth={true}
                        sx={{ pb: 2 }}
                        size="small"
                        value={firstName}
                        // inputRef={name}
                        onChange={(e) => handleChange(e, "firstName")}
                        helperText={<HelperText txt={''} isError={false} />}
                    />
                    <TextField
                        id="email"
                        label="Email"
                        fullWidth={true}
                        sx={{ pb: 2 }}
                        size="small"
                        autoFocus
                        value={email}
                        // defaultValue={email}
                        onChange={(e) => handleChange(e, "email")}
                        helperText={<HelperText txt={''} isError={false} />}
                    />
                    <TextField
                        id="address"
                        label="Address"
                        fullWidth={true}
                        sx={{ pb: 2 }}
                        size="small"
                        autoFocus
                        value={address}
                        // defaultValue={address}
                        onChange={(e) => handleChange(e, "address")}
                        helperText={<HelperText txt={''} isError={false} />}
                    />
                    <TextField
                        id="userID"
                        label="User ID"
                        fullWidth={true}
                        sx={{ pb: 2 }}
                        size="small"
                        autoFocus
                        value={userID}
                        disabled
                        // defaultValue={userID}
                        helperText={<HelperText txt={''} isError={false} />}
                    />
                </Box>
                <Box sx={{ width: '50%' }}>
                    <TextField
                        id="last-name"
                        label="Last Name"
                        fullWidth={true}
                        sx={{ pb: 2 }}
                        size="small"
                        value={lastName}
                        // inputRef={name}
                        onChange={(e) => handleChange(e, "lastName")}
                        helperText={<HelperText txt={''} isError={false} />}
                    />
                    <TextField
                        id="name-text"
                        label="Phone Number"
                        fullWidth={true}
                        sx={{ pb: 2 }}
                        size="small"
                        autoFocus
                        value={phone}
                        onChange={(e) => handleChange(e, "phone")}
                        helperText={<HelperText txt={''} isError={false} />}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date Of Birth"
                            value={birthday}
                            onChange={(e) => handleChange(e, "birthday")}
                            renderInput={(params) => <TextField {...params} autoFocus
                                id="dateOfBirth"
                                label="Date Of Birth"
                                fullWidth={true}
                                sx={{ pb: 4 }}
                                size="small" />}
                        />
                    </LocalizationProvider>
                    
                    <FormControl component="fieldset" sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Typography component="div" sx={{ pr: 2 }}>Gender:</Typography>
                        <RadioGroup
                            row aria-label="gender" name="row-radio-buttons-group"
                            defaultValue={gender}
                            value={gender} onChange={(e) => handleChange(e, "gender")}
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
