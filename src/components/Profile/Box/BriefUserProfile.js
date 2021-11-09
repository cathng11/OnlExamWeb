import React from 'react'
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material'

function UserItem({ data }) {
    return (
        <ListItem
            key={data.content}
            secondaryAction={
                <ListItemText primary={data.value} />
            }
            disablePadding
        >
            <ListItemButton disabled sx={{color:'green'}}>

                <ListItemText primary={data.content} />
            </ListItemButton>
        </ListItem>
    )
}
export default function BriefUserProfile({data}) {
    const _data = [
        {
            content: 'Email',
            value: data.email,
        },
        {
            content: 'City',
            value: data.city
        },
        {
            content: 'Phone',
            value: data.phone
        },
        {
            content: 'UserID',
            value: data.userId
        }
    ]
    return (
        <React.Fragment>
            <img
                src={data.avatar}
                style={{
                    padding: '15px',
                    borderRadius: '20px',
                    height: '40%',
                }}
                alt="image_"
            />
            <Typography variant='h5'>
                {data.Firstname} {data.lastName} 
            </Typography>
            <Typography variant='body1'>
                {data.role}
            </Typography>
            <Box sx={{ width: '100%', pl: 5, pr: 5 }}>
                <List>
                    {_data.map((val) => <UserItem data={val} key={val.content} />)}
                </List>
            </Box>
        </React.Fragment>
    )
}
