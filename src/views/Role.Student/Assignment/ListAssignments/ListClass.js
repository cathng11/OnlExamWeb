import React from 'react'
import {
    Container,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar
} from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import IconButton from '@mui/material/IconButton';

function ClassItem({ classname, subject, id }) {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="detail"  >
                    <ArrowRightIcon />
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar><FolderIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={classname}
                secondary={subject}
            />
        </ListItem>
    )
}
export default function ListClass({ data }) {
    return (
        <Container maxWidth="full">
            <List sx={{ width: '100%', p: 2 }}>
                {data.map((cl, index) =>
                    <ClassItem key={index} id={cl.id} classname={cl.classname} subject={cl.subject} />)}
            </List>
        </Container>
    )
}
