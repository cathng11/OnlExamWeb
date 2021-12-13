import { Box, Chip, TextField, Button, InputLabel } from '@mui/material';
import * as React from 'react';
import AlertBar from './../../Alert/AlertBar';
import ClassService from './../../../services/class.service';
import { useHistory, matchPath } from "react-router-dom";

export default function StudentDialog({ isSave, isRefresh }) {
    const [members, setMembers] = React.useState([])
    const [refresh, setRefresh] = React.useState(false)
    const [state, setState] = React.useState({
        alert: false,
        title: ''
    })
    const email = React.useRef(null)
    const handleDelete = (member) => {
        let list = members
        list = list.filter((item) => {
            return item !== member
        })
        setMembers(list)
        setRefresh(!refresh)
    };
    let history = useHistory();

    const match = matchPath(history.location.pathname, {
        path: `/classes/:id/students`,
        exact: true,
        strict: false
    });
    let classID = match.params.id

    const handleAdd = () => {
        let list = members
        let member = email.current.value
        if (member === '') {
            setState({ alert: true, title: `Email is not valid` })
        }
        else if (member !== '') {
            let classService = ClassService.getInstance()
            classService.checkEmailMember(classID, { Email: member })
                .then(items => {
                    console.log(items)
                    if (items.status.Code === 200) {
                        if (!list.includes(member)) {
                            list.push(member)
                            setMembers(list)
                            setRefresh(!refresh)
                        } else if (list.includes(member)) {
                            setState({ alert: true, title: `User ${member} is existed in Members` })
                        }
                    }
                    else {
                        setState({ alert: true, title: items.message })
                    }
                })
                .catch(err => console.error(err))
        }


        console.log(members)
    }
    React.useEffect(() => {
        let mounted = true;
        console.log(isSave)

        if (isSave) {
            let insert = { Email: members }
            let classService = ClassService.getInstance()
            classService.insertMembersInClass(classID, insert)
                .then(items => {
                    if (mounted) {
                        console.log(items)
                        if (items.status.Code === 200) {
                            setState({ alert: true, title: `Added all members in class ${classID}!` })
                            isRefresh();
                        }
                        else {
                            setState({ alert: true, title: 'Error. Try again!' })
                            isRefresh();
                        }
                    }
                })
                .catch(err => console.error(err))
        }
        return () => { mounted = false };

    }, [refresh,isSave])
    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', pb: 3 }}>
                <TextField
                    id="email-student"
                    label="Student Email"
                    variant="filled"
                    fullWidth={true}
                    size="small"
                    margin="normal"
                    inputRef={email}
                    sx={{
                        '& .css-c5v1qu-MuiInputBase-input-MuiFilledInput-input': {
                            background: '#D3E0EA',
                            borderRadius: '5px'
                        }
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
                    <InputLabel id="demo-simple-select-label" sx={{ color: '#3D4E81',fontWeight: 'bold' }}>Members</InputLabel>
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
            <AlertBar
                title={state.title}
                openAlert={state.alert}
                closeAlert={() => setState(s => { return { ...s, alert: false } })}
            />
        </Box>
    )
}
