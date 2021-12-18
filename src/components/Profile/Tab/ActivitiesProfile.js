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
import FolderIcon from '@mui/icons-material/Folder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ClassIcon from '@mui/icons-material/Class';
import StringToColor from '../../Helper/StringToColor';

function ActivityItem({ data }) {
    const type = [
        {
            key: 0,
            value: <FolderIcon />
        },
        {
            key: 1,
            value: <AssignmentIcon />
        },
        {
            key: 2,
            value: <ClassIcon />
        },
    ]
    return (
        <ListItem alignItems="flex-start" sx={{ width: '100%' }} key={data.id}
            secondaryAction={
                <ListItemText primary={data.date} />
            }>
            <ListItemAvatar>
                <Avatar sx={{ background: StringToColor(data.subject) }}>
                    {type[data.type].value}
                </Avatar>
            </ListItemAvatar>
            <ListItemButton
            // disablePadding
            >
                <ListItemText primary={data.content + ' - ' + data.subject} />
            </ListItemButton>
        </ListItem>
    )
}
export default function ActivitiesProfile() {
    const data = [
        {
            id: 0,
            content: 'You created a exam folder',
            subject: 'Computer Network',
            date: '12/10/2021 13:02:40',
            type: 0
        },
        {
            id: 1,
            content: 'You create a new assigment',
            subject: 'Database',
            date: '12/10/2021 13:02:40',
            type: 1
        },
        {
            id: 2,
            content: 'Student ID 01293042 is added in your classroom',
            subject: 'SOA',
            date: '12/10/2021 13:02:40',
            type: 2
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
                            <ActivityItem data={value} key={value.id} />
                            {value === data.length - 1 ? <Box></Box> : <Divider variant="inset" component="li" />}
                        </React.Fragment>

                    )}

                </List>
            </Box>
        </React.Fragment>
    )
}
