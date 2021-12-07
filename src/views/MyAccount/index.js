import React from 'react'
import {
    Paper,
    TextField,
    Typography,
    Button,
    Box,
    Container,
    styled
} from '@mui/material'
import HelperText from './../../components/HelperText/HelperText';

const CustomPaper = styled(Paper)(({ theme }) => ({
    height: '75vh',
    paddingTop: '30px',
    backdropFilter: 'blur(10px)',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
}));
const ContainerBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '50px',
}));
const WrapperContainer = styled(Container)(({ theme }) => ({
    background: 'white',
    marginTop: '50px',
    marginBottom: '20px'
}));
const PasswordTextField = ({ label, helperText }) => {
    const [value, setValue] = React.useState('')
    function handleChange(e) {
        console.log(e.target.value)
        setValue(e.target.value)
    }
    return (
        <TextField
            id={`${label}-input`}
            label={label}
            type="password"
            sx={{ pb: 2 }}
            fullWidth={true}
            size="small"
            helperText={<HelperText txt={helperText} isError={false} />}
            autoComplete="current-password"
            value={value}
            onChange={handleChange}
        />
    )
}
export default function MyAccount() {

    return (
        <WrapperContainer maxWidth="sm">
            <CustomPaper >
                <ContainerBox >
                    <Typography variant="h5" sx={{ mb: 5, }}>
                        Create New Password
                    </Typography>
                    <PasswordTextField label="Current Password" helperText="" />
                    <Typography variant="body1" sx={{ mb: 5 }}>
                        Your new password must be different from previous used password.
                    </Typography>
                    <PasswordTextField label="Password" helperText="Must be at least 8 characters." />
                    <PasswordTextField label="Confirm Password" helperText='Both passwords must match.' />
                    <Box
                        sx={{
                            m: 3,
                            display: 'flex',
                            flexDirection: 'row',
                        }}
                    >
                        <Button variant="outlined" sx={{ mr: 5 }}>Save</Button>
                        <Button variant="contained">Reset</Button>
                    </Box>
                </ContainerBox>
            </CustomPaper>
        </WrapperContainer>
    )
}
