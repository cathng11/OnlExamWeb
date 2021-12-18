import React from 'react'
import {
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    ListItemButton
} from '@mui/material'
import StringAvatar from '../../../../components/Avatar/StringAvatar';

function ClassItem({ data }) {
    return (
        <ListItem alignItems="flex-start" sx={{ width: '100%' }} key={data.id}
            secondaryAction={
                <ListItemText primary={data.numbOfFinishedAssignment + '/' + data.numOfTotalAssignment + ' Finished Assignment(s)'} />
            }>
            <ListItemAvatar sx={{
                minWidth: 0,
                marginTop: '16px'
            }}>
                <Avatar {...StringAvatar(data.subject)} />
            </ListItemAvatar>
            <ListItemButton
            // disablePadding
            >
                <ListItemText primary={data.class}
                    secondary={data.subject} />
            </ListItemButton>
        </ListItem>
    )
}
export default function MyActiveClass() {
    const data = [
        {
            id: 0,
            class: '18N13',
            subject: 'Computer Network',
            numOfTotalAssignment: 2,
            numbOfFinishedAssignment: 2
        },
        {
            id: 1,
            class: '18N13',
            subject: 'Database',
            numOfTotalAssignment: 4,
            numbOfFinishedAssignment: 2
        },
        {
            id: 2,
            class: '18N14',
            subject: 'SOA',
            numOfTotalAssignment: 2,
            numbOfFinishedAssignment: 1
        }
    ];
    return (
        <React.Fragment>
            <Box sx={{
                width: '100%',
                background: 'white',
            }}>
                <List>
                    {data.map((value) =>
                        <React.Fragment key={value.id}>
                            <ClassItem data={value} key={value.id} />
                            {value === data.length - 1 ? <Box></Box> : <Divider variant="inset" component="li" />}
                        </React.Fragment>

                    )}

                </List>
            </Box>
        </React.Fragment>
    )
}
