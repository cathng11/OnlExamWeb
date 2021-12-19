import { TextField, Container } from '@mui/material';
import React from 'react';
import { matchPath, useHistory } from "react-router-dom";
import LoadingAlert from '../../Loading/LoadingAlert';
import LibraryService from './../../../services/library.service';
export default function ImportQuestionsDialog({ isSave, refresh }) {
    const [value, setValue] = React.useState('')
    const [listQuestions, setListQuestions] = React.useState([])
    let history = useHistory();
    const match = matchPath(history.location.pathname, {
        path: `/library/folder/:name/:id`,
        exact: true,
        strict: false
    });
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
        setListQuestions(list)
    }
    React.useEffect(() => {
        let mounted = true;
        if (isSave) {
            if (listQuestions) {
                setState(s => { return { ...s, loading: true } })
                let libraryService = LibraryService.getInstance();
                libraryService.insertQuestion(match.params.id, listQuestions)
                    .then(items => {
                        if (mounted) {
                            if (items.status.Code === 200) {
                                setState({ loading: false, alert: true, title: 'Added all questions to folder' })
                                setTimeout(() => {
                                    refresh();
                                }, 2000);
                            }
                            else {
                                showErrorMessage()
                            }
                        }
                    })
                    .catch(err => {
                        console.error(err)
                        setState({ loading: false, alert: true, title: 'Error. Try again!' })
                    })
            } else {
                setState({ loading: false, alert: true, title: `Input field is required!` })
            }

        }
        return () => { mounted = false };
        //eslint-disable-next-line
    }, [isSave])
    return (
        <Container maxWidth="md">
            <TextField
                id="name-text"
                variant="outlined"
                fullWidth={true}
                margin="normal"
                placeholder=" Question 1    Level   Type    Solution 1    Solution 2    
                Answer 1    Answer 2
                Question 2    Level   Type    Solution 1    Solution 2
                Answer 1    Answer 2
                Question 3    Level   Type    Solution 1    Solution 2
                Answer 1    Answer 2"
                multiline={true}
                rows={15}
                name="List Questions"
                sx={{ '& .css-186xcr5': { paddingRight: '15px' } }}
                InputLabelProps={{
                    shrink: true
                }}
                value={value}
                onChange={handleChange}
            />
            <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
        </Container>
    )
}
