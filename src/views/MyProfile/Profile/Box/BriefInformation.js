import React from 'react'
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    IconButton ,
    styled
} from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
const Input = styled('input')({
    display: 'none',
  });
function DetailItem({ data }) {
    return (
        <ListItem
            key={data.content}
            secondaryAction={
                <ListItemText primary={data.value} />
            }
            disablePadding
        >
            <ListItemButton sx={{ color: '#3D4E81' }}>

                <ListItemText primary={data.content} />
            </ListItemButton>
        </ListItem>
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
                <IconButton sx={{color:'#3D4E81'}} aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </label>
            <Typography variant='h5'>
                {data.FirstName} {data.LastName}
            </Typography>
            <Typography variant='body1'>
                {data.RoleName}
            </Typography>
            <Box sx={{ width: '100%', pl: 5, pr: 5 }}>
                <List>
                    {_data.map((val) => <DetailItem data={val} key={val.content} />)}
                </List>
            </Box>
        </React.Fragment>
    )
}
