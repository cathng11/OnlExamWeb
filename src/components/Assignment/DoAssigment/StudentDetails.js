import React from 'react'
import {
    ListItem,
    ListItemText,
    Typography,
    Divider,
    List,
    Box,
    ButtonGroup,
    Button,
} from '@mui/material'
function UserItem({ data }) {
    return (
        <ListItem
            key={data.content}
            secondaryAction={<ListItemText primary={data.value} />}
            disablePadding
        >
            <ListItemText primary={data.content} />
        </ListItem>
    )
}
export default function StudentDetails({ info, data }) {
    return (
        <>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
                Student Details
            </Typography>
            <Divider />
            <List>
                {info.map((val) => (
                    <UserItem data={val} key={val.content} />
                ))}
            </List>
            <Divider variant="middile" />
            <Box sx={{ p: 4, background: 'white' }}>

                {data.map((val, index) =>
                    <ButtonGroup key={index} variant="contained" aria-label="outlined primary button group" orientation="vertical"
                        sx={{ minWidth: 0 }}>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group" orientation="horizontal" sx={{ minWidth: 0 }}>
                            <Button sx={{ width: '40px', p: 1 }}>
                                {index + 1}
                            </Button>
                        </ButtonGroup>
                    </ButtonGroup>)}
            </Box>
        </>
    )
}
