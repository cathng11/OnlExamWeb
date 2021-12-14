import { Box, TextField } from '@mui/material';
import * as React from 'react';
import ClassService from './../../../services/class.service';
import AlertBar from './../../Alert/AlertBar';
export default function ClassDialog({ isSave, isEdit, refresh }) {
    const [state, setState] = React.useState({
        alert: false,
        title: ''
    })
    const [className, setClassName] = React.useState('')
    React.useEffect(() => {
        let mounted = true;
        let classService = ClassService.getInstance();
        if (!isEdit.value && isSave) {
            classService.insertClass({ ClassName: className })
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            setState({ alert: true, title: 'Inserted new class!' })
                            refresh();
                        }
                        else {
                            setState({ alert: true, title: 'Error. Try again!' })
                            refresh();
                        }
                    }
                })
                .catch(err => console.error(err))
        }

        if (isEdit.value) {
            classService.getClassByID(isEdit.id)
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            let item = items.data
                            setClassName(item.ClassName)
                        }
                        else {
                            setState({ alert: true, title: 'Error. Try again!' })
                        }
                    }
                })
                .catch(err => console.error(err))
        }
        if (isSave && isEdit.value) {
            let update = { ClassName: className }
            classService.updateClass(isEdit.id, update)
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            setState({ alert: true, title: `Updated class ${isEdit.id}!` })
                            refresh();

                        }
                        else {
                            setState({ alert: true, title: 'Error. Try again!' })
                            refresh();
                        }
                    }
                })
                .catch(err => console.error(err))
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
                variant="filled"
                fullWidth={true}
                sx={{ pb: 3 }}
                value={className}
                onChange={handleChange}
                size="small"
            />
            <AlertBar
                title={state.title}
                openAlert={state.alert}
                closeAlert={() => setState(s => { return { ...s, alert: false } })}
            />
        </Box>
    )
}
