import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {
    Avatar, Backdrop, Container, CircularProgress,
    List,
    ListItem, ListItemAvatar, ListItemText
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { useHistory } from 'react-router-dom';
import AssignmentService from './../../../../services/assignment.service';
import AlertBar from './../../../../components/Alert/AlertBar';

function ClassItem({ item, open }) {
    let history = useHistory()
    const [state, setState] = React.useState({
        loading: false,
        alert: false,
        title: ''
    })
    const handleClick = () => {
        setState(s => { return { ...s, loading: true } })
        let assignmentService = AssignmentService.getInstance()
        assignmentService.getListByClassID(item.ClassID)
            .then(items => {
                if (items.status.Code === 200) {
                    setState(s => { return { ...s, loading: false } })
                    open(item.ClassID, items.data)
                    history.push(`${history.location.pathname}?inClass=${item.ClassID}`)
                }
                else {
                    setState({ loading: false, alert: true, title: `Cannot load data. Try again!` })
                }

            })
            .catch((err) => {
                console.error(err);
                setState({ loading: false, alert: true, title: `Cannot load data. Try again!` })
            });

    }
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="detail" onClick={handleClick} >
                    <ArrowRightIcon />
                </IconButton>
            }
        >
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={state.loading}
            // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <AlertBar
                title={state.title}
                openAlert={state.alert}
                closeAlert={() => setState(s => { return { ...s, alert: false } })}
            />
            <ListItemAvatar>
                <Avatar sx={{ background: '#3D4E81 ' }}>{item.ClassID}</Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={item.ClassName}
                secondary={`Teacher ${item.TeacherFullname}`}
            />
        </ListItem>
    )
}
export default function ListClass({ data, open }) {
    return (
        <Container maxWidth="full">

            <List sx={{ width: '100%', p: 2 }}>
                {data.map((item, index) =>
                    <ClassItem key={index} item={item} open={(id, data) => open(id, data)} />)}
            </List>
        </Container>
    )
}
