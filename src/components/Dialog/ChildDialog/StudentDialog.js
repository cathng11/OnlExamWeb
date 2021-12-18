import { Box, Button, Chip, InputLabel, TextField } from '@mui/material';
import * as React from 'react';
import { matchPath, useHistory } from "react-router-dom";
import ClassService from './../../../services/class.service';
import LoadingAlert from './../../Loading/LoadingAlert';

export default function StudentDialog({ isSave, refresh }) {
    const [members, setMembers] = React.useState([])
    const [isRefresh, setRefresh] = React.useState(false)
    const email = React.useRef(null)
    let history = useHistory();
    const match = matchPath(history.location.pathname, {
        path: `/classes/:id/students`,
        exact: true,
        strict: false
    });
    let classID = match.params.id
    const [state, setState] = React.useState({
        loading: false,
        alert: false,
        title: ''
    })
    const handleDelete = (member) => {
        let list = members
        list = list.filter((item) => {
            return item !== member
        })
        setMembers(list)
        setRefresh(!isRefresh)
    };
    const showErrorMessage = () => {
        setState({ loading: false, alert: true, title: 'Error. Try again!' })
        setTimeout(() => {
            refresh();
        }, 2000);
    }
    const handleAdd = () => {
        let list = members
        let member = email.current.value
        if (member === '') {
            setState({ loading: false, alert: true, title: `Email is not valid` })
        }
        else if (member !== '') {
            let classService = ClassService.getInstance()
            classService.checkEmailMember(classID, { Email: member })
                .then(items => {
                    if (items.status.Code === 200) {
                        if (!list.includes(member)) {
                            list.push(member)
                            setMembers(list)
                            setRefresh(!isRefresh)
                            setState(s => { return { ...s, loading: false } })
                        } else if (list.includes(member)) {
                            setState({ loading: false, alert: true, title: `User ${member} is existed in Members` })
                        }
                    }
                    else {
                        setState(s => { return { ...s, alert: true, title: items.message } })

                    }
                })
                .catch(err => {
                    console.error(err)
                    setState(s => { return { ...s, alert: true, title: 'Error. Try again!' } })

                })
        }
    }
    React.useEffect(() => {
        let mounted = true;
        if (isSave) {
            setState(s => { return { ...s, loading: true } })
            let insert = { Email: members }
            let classService = ClassService.getInstance()
            classService.insertMembersInClass(classID, insert)
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            setState({ loading: false, alert: true, title: `Added all members in class ${classID}!` })
                            refresh();
                        }
                        else {
                            setState({ loading: false, alert: true, title: items.message });
                            refresh();
                        }
                    }
                })
                .catch(err => {
                    console.error(err)
                    showErrorMessage()
                })
        }
        return () => { mounted = false };
        //eslint-disable-next-line
    }, [isRefresh, isSave])
    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', pb: 3 }}>
                <TextField
                    id="email-student"
                    label="Student Email"
                    variant="outlined"
                    fullWidth={true}
                    margin="normal"
                    inputRef={email}
                    sx={{
                        '& .css-c5v1qu-MuiInputBase-input-MuiFilledInput-input': {
                            background: '#D3E0EA',
                            borderRadius: '5px'
                        },
                        '& .css-186xcr5': { paddingRight: '15px' }
                    }}
                    helperText="Enter student email here"
                />
                <Button variant="contained" color="primary" sx={{ m: 2, mb: 4, mr: 0 }} onClick={handleAdd}>Add</Button>
            </Box>
            {members.length > 0 ? <Box className="main-div" style={{
                marginTop: 5,
                padding: '15px',
                position: 'relative',
                background: '#fff',
                border: '1px solid #3D4E81 ',
                borderRadius: '10px',
                width: '100%',
                paddingTop: "10px"
            }}>


                <Box className="child-div" style={{
                    padding: '5px', position: 'absolute', top: '-20px', left: '10px',
                    background: '#fff',
                }}>
                    <InputLabel id="demo-simple-select-label" sx={{ color: '#3D4E81', fontWeight: 'bold' }}>Members</InputLabel>
                </Box>
                {members.map((mem, index) => {
                    return (
                        <Chip
                            key={index}
                            label={mem}
                            variant="outlined"
                            color="primary"
                            onDelete={() => handleDelete(mem)}
                            sx={{ m: 1 }}
                        />
                    )
                })}

            </Box> : <></>}
            <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
        </Box>
    )
}
