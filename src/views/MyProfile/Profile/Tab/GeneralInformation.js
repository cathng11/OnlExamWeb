import React, { useRef } from 'react'
import {
    Box,
    TextField,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    Typography,
    styled
} from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import HelperText from './../../../../components/HelperText/HelperText';
import APP_CONSTANTS from '../../../../constants'
const token = APP_CONSTANTS.TOKEN_TEACHER
const CustomInput = styled(TextField)(({ theme }) => ({
    paddingBottom: '50px',
    '& label.Mui-focused': {
        color: '#3D4E81',
    },
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            border: '1px solid #45b649',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#3D4E81',
        },
    },
  })); 
export default function GeneralInformation({ data, isUpdate }) {
    const name = useRef(null)
    const [firstName, setFirstName] = React.useState(data.Firstname);
    const [lastName, setLastName] = React.useState(data.Lastname);
    const [email, setEmail] = React.useState(data.Email);
    const [address, setAddress] = React.useState(data.Address);
    const [userID] = React.useState(data.UserID);
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
                        }
                    })

            }
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
                    <CustomInput
                        id="first-name"
                        label="First Name"
                        fullWidth={true}
                        size="small"
                        value={firstName}
                        // inputRef={name}
                        onChange={(e) => handleChange(e, "firstName")}
                    />
                    <CustomInput
                        id="email"
                        label="Email"
                        fullWidth={true}
                        size="small"
                        autoFocus
                        value={email}
                        // defaultValue={email}
                        onChange={(e) => handleChange(e, "email")}
                    />
                    <CustomInput
                        id="address"
                        label="Address"
                        fullWidth={true}
                        sx={{ pb: 5 }}
                        size="small"
                        autoFocus
                        value={address}
                        // defaultValue={address}
                        onChange={(e) => handleChange(e, "address")}
                    />
                    <CustomInput
                        id="userID"
                        label="User ID"
                        fullWidth={true}
                        sx={{ pb: 5 }}
                        size="small"
                        autoFocus
                        value={userID}
                        disabled
                    // defaultValue={userID}
                    />
                </Box>
                <Box sx={{ width: '50%' }}>
                    <CustomInput
                        id="last-name"
                        label="Last Name"
                        fullWidth={true}
                        size="small"
                        value={lastName}
                        // inputRef={name}
                        onChange={(e) => handleChange(e, "lastName")}
                    />
                    <CustomInput
                        id="name-text"
                        label="Phone Number"
                        fullWidth={true}
                        size="small"
                        autoFocus
                        value={phone}
                        onChange={(e) => handleChange(e, "phone")}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date Of Birth"
                            value={birthday}
                            onChange={(e) => handleChange(e, "birthday")}
                            renderInput={(params) => <CustomInput {...params} autoFocus
                                id="dateOfBirth"
                                label="Date Of Birth"
                                fullWidth={true}
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
                        <Typography component="div" sx={{ pr: 5 }}>Gender:</Typography>
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
