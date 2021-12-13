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

function ClassItem({ item,open }) {
    const handleClick = ()=>{
        open(item.ClassID)
    }
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="detail" onClick={handleClick} >
                    <ArrowRightIcon />
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar sx={{background: '#3D4E81 ' }}>{item.ClassID}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={item.ClassName}
                secondary={`Teacher ${item.TeacherFullname}`}
            />
        </ListItem>
    )
}
export default function ListClass({ data,open }) {
    return (
        <Container maxWidth="full">
            <List sx={{ width: '100%', p: 2 }}>
                {data.map((item, index) =>
                    <ClassItem key={index} item={item} open={(data)=>open(data)}/>)}
            </List>
        </Container>
    )
}
