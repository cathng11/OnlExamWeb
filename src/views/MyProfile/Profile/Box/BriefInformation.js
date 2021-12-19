import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {
    Box, Grid, IconButton,
    styled, Typography, Button
} from '@mui/material';
import React from 'react';
const Input = styled('input')({
    display: 'none',
});
function DetailItem({ data }) {
    return (
        <Grid container item xs={12} spacing={5}>
            <Grid item xs={12} md={12} lg={4}>
                <Typography variant="body1" >
                    {data.content}
                </Typography>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
                <Typography variant="body1" color="primary" align="right">
                    {data.value}
                </Typography>
            </Grid>
        </Grid>
    )
}
export default function BriefInformation({ data }) {
    const _data = [
        {
            content: 'Email',
            value: data.Email,
        },
        {
            content: 'Full Name',
            value: data.Firstname + ' ' + data.Lastname
        },
        {
            content: 'Address',
            value: data.Address
        },

        {
            content: 'UserID',
            value: data.UserID
        }
    ]
    return (
        <React.Fragment>
            <img
                src={data.Avatar}
                style={{
                    padding: '15px',
                    borderRadius: '20px',
                    height: '40%',
                }}
                alt="image_"
            />
            <label htmlFor="icon-button-file">
                <Input accept="image/*" id="icon-button-file" type="file" />
                <IconButton sx={{ color: '#3D4E81' }} aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            <Typography variant='h5'>
                {data.FirstName} {data.LastName}
            </Typography>
            <Button variant="contained"
                disable="true"
                sx={{
                    backgroundImage: 'linear-gradient(to right, #005C97 0%, #363795  51%, #005C97  100%)',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    transition: '0.5s',
                    backgroundSize: '200% auto',
                    color: 'white',
                    boxShadow: '0 0 20px #eee',
                    borderRadius: '10px',
                    display: 'block',
                    pl: 5,
                    pr: 5,
                }}>{data.RoleName}</Button>

            <Box sx={{ width: '100%', pl: 5, pr: 5, pt: 3 }}>
                <Grid container spacing={2}>
                    {_data.map((val) => <DetailItem data={val} key={val.content} />)}
                </Grid>
            </Box>
        </React.Fragment>
    )
}
