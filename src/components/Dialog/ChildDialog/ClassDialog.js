import { Box, TextField } from '@mui/material';
import * as React from 'react';
import ClassService from './../../../services/class.service';
import LoadingAlert from './../../Loading/LoadingAlert';
export default function ClassDialog({ isSave, isEdit, refresh }) {
    const [state, setState] = React.useState({
        loading: false,
        alert: false,
        title: ''
    })
    const [className, setClassName] = React.useState('')
    const showErrorMessage = () => {
        setState({ loading: false, alert: true, title: 'Error. Try again!' })
        setTimeout(() => {
            refresh();
        }, 2000);
    }
    React.useEffect(() => {
        let mounted = true;
        let classService = ClassService.getInstance();
        if (!isEdit.value && isSave) {
            setState(s => { return { ...s, loading: true } })
            classService.insertClass({ ClassName: className })
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            setState({ loading: false, alert: true, title: 'Inserted new class!' })
                            refresh();
                        }
                        else {
                            showErrorMessage()
                        }
                    }
                })
                .catch(err => {
                    console.error(err)
                    showErrorMessage()
                })
        }

        if (isEdit.value) {
            setState(s => { return { ...s, loading: true } })
            classService.getClassByID(isEdit.id)
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            let item = items.data
                            setClassName(item.ClassName)
                            setState(s => { return { ...s, loading: false } })
                        }
                        else {
                            showErrorMessage()
                        }
                    }
                })
                .catch(err => {
                    console.error(err)
                    showErrorMessage()
                })
        }
        if (isSave && isEdit.value) {
            setState(s => { return { ...s, loading: true } })
            let update = { ClassName: className }
            classService.updateClass(isEdit.id, update)
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            setState({ loading: false, alert: true, title: `Updated class ${isEdit.id}!` })
                            refresh();

                        }
                        else {
                            showErrorMessage()
                        }
                    }
                })
                .catch(err => {
                    console.error(err)
                    showErrorMessage()
                })
        }
        return () => mounted = false;//eslint-disable-next-line
    }, [isSave])
    const handleChange = (e) => {
        setClassName(e.target.value)
    }
    return (
        <Box>
            <TextField
                id="name-text"
                label="Class Name"
                variant="outlined"
                fullWidth={true}
                margin="normal"
                sx={{ '& .css-186xcr5': { paddingRight: '15px' } }}
                value={className}
                onChange={handleChange}
                autoComplete="new-password"
            />
            <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
        </Box>
    )
}
