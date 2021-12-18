import { TextField } from '@mui/material';
import React from 'react';
import { matchPath, useHistory } from "react-router-dom";
import LoadingAlert from '../../Loading/LoadingAlert';
import ClassService from './../../../services/class.service';

export default function ImportStudentsDialog({ isSave, refresh }) {
    const [value, setValue] = React.useState('')
    const [listEmail, setListEmail] = React.useState([])
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
    const showErrorMessage = () => {
        setState({ loading: false, alert: true, title: 'Error. Try again!' })
        setTimeout(() => {
            refresh();
        }, 2000);
    }
    const handleChange = (e) => {
        setValue(e.target.value)
        let list = e.target.value.split('\n')
        setListEmail(list)
    }
    React.useEffect(() => {
        let mounted = true;
        if (isSave) {
            if (listEmail) {
                setState(s => { return { ...s, loading: true } })
                let classService = ClassService.getInstance()
                classService.insertMembersInClass(classID, { Email: listEmail })
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
            } else {
                setState({ loading: false, alert: true, title: `Input field is required!` })
            }

        }
        return () => { mounted = false };
        //eslint-disable-next-line
    }, [isSave])
    return (
        <div>
            <TextField
                id="name-text"
                variant="outlined"
                fullWidth={true}
                margin="normal"
                placeholder=" Student Email 1
                Student Email 2
                Student Email 3"
                multiline={true}
                rows={15}
                name="List Students Emails"
                sx={{ '& .css-186xcr5': { paddingRight: '15px' } }}
                InputLabelProps={{
                    shrink: true
                }}
                value={value}
                onChange={handleChange}
            />
            <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
        </div>
    )
}
