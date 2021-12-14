import { Button, FormControl, Paper, Grid, Typography, FormControlLabel, Checkbox, Chip } from '@mui/material'
import React from 'react'
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useHistory, useLocation, matchPath } from "react-router-dom";
import LibraryService from '../../../../../services/library.service';
import AlertBar from './../../../../../components/Alert/AlertBar';

export default function AddQuestion({ isRefresh }) {
    const [input, setInput] = React.useState({
        Question: '',
        Type: '',
        Level: ''
    });
    const [state, setState] = React.useState({
        alert: false,
        title: ''
    })
    const [correct, setCorrect] = React.useState(false)
    const [solution, setSolution] = React.useState('')
    const [options, setOptions] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false)
    let history = useHistory();
    let location = useLocation();
    let query = new URLSearchParams(location.search)
    const match = matchPath(history.location.pathname, {
        path: `/library/folder/:nameFolder/:idFolder`,
        exact: false,
        strict: false
    });
    let questionID = query.get("editID") ? query.get("editID") : -1

    const folderID = match.params.idFolder
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput((s) => { return { ...s, [name]: value } });
    };
    const handleDelete = (option) => {
        let list = options
        list = list.filter((item) => {
            return item !== option
        })
        setOptions(list)
        setRefresh(!refresh)
    };
    const handleAdd = () => {
        let list = options
        let clone = options
        let _sol = solution
        let _cor = correct ? 1 : 0
        let item = {
            Solution: _sol,
            Correct: _cor
        }

        if (!_sol) {
            setState({ alert: true, title: `Option field is required` })
            return;
        }
        if (!input.Type) {
            setState({ alert: true, title: `Type field must be filled before adding solution` })
        }
        else {
            const found = clone.some(i => i.Solution === _sol);
            if (!found) {
                list.push(item)
                setOptions(list)
                const numCorrect = list.filter(i => i.Correct === 1).length;
                if (numCorrect > 1) {
                    setInput(s => { return { ...s, Type: 'Multiple Choices' } })
                }
                else if (numCorrect === 1 && list > 2) {
                    setInput(s => { return { ...s, Type: 'Single Choice' } })
                }
                setRefresh(!refresh)
            } else {
                setState({ alert: true, title: `This solution is existed in Options` })
            }
        }
        setSolution('')
    }
    React.useEffect(() => {
        let mounted = true;
        if (questionID > 1) {
            let libraryService = LibraryService.getInstance()
            libraryService.getQuestionsByID(questionID)
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200) {
                            let item = items.data
                            let list = []
                            setInput({
                                Question: item.Question,
                                Type: item.Type,
                                Level: item.Level
                            })
                            item.Solution.map((i) => {
                                return list.push({
                                    SolutionID: i.SolutionID,
                                    Solution: i.Solution,
                                    Correct: i.Correct
                                })
                            })
                            setOptions(list);
                        }

                    }
                }).catch(err => console.error(err))
        }
        return () => { mounted = false };

    }, [refresh, folderID, questionID])
    const handleReset = () => {
        setInput({
            Question: '',
            Type: '',
            Level: ''
        })
        setSolution('')
        setCorrect(false)
        setOptions([])
        history.push(`${history.location.pathname}`);

    }
    const checkInput = () => {
        let type = input.Type;
        let question = input.Question
        let level = input.Level
        if (!question || !type || !level || !options) {
            setState({ alert: true, title: `Input fields is required` })
        }
        else if (type !== 'Essay' && type !== 'Short Answer') {
            const found = options.filter(i => i.Correct === 1).length;

            if (options.length < 2) {
                setState({ alert: true, title: `At least 2 solutions for this question type` })
                return true;
            }
            else if (found < 1) {
                setState({ alert: true, title: `Invalid options` })
                return true;
            }
            else if (type === 'True/False' && options.length === 2) {
                const t = options.some(i => i.Solution === 'True');
                const f = options.some(i => i.Solution === 'False');
                if (!t || !f) {
                    setState({ alert: true, title: `True/False Solution is not valid` })
                    return true;
                }
                return false;
            }
            else if (type === 'Multiple Choices' && options.filter(i => i.Correct === 1).length < 2) {
                setState({ alert: true, title: `At least 2 correct answer for this question type` })
                return true;

            }
            return false;
        }
        return false;
    }
    const handleSave = () => {

        if (!checkInput()) {
            let libraryService = LibraryService.getInstance();
            libraryService.insertQuestion(folderID, {
                Question: input.Question,
                Type: input.Type,
                Level: input.Level,
                Solution: options
            })
                .then(items => {
                    if (items.status.Code === 200) {
                        setState({ alert: true, title: 'Added new question to folder' })
                        handleReset()
                        isRefresh()
                    }
                    else {
                        setState({ alert: true, title: items.message })
                    }
                })
                .catch(err => console.error(err))
        }
    }
    return (
        <Grid item xs={12} md={12} lg={4} sx={{ background: 'white' }}>
            <AlertBar
                title={state.title}
                openAlert={state.alert}
                closeAlert={() => setState(s => { return { ...s, alert: false } })}
            />
            <Paper sx={{
                background: 'white',
                // height: { xs: '100vh', md: '70vh', lg: '70vh' },
                borderRadius: '10px',
                p: 4,
                overflow: 'auto',
                boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
            }}>
                <Box
                    // component="div" 
                    sx={{
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'white',

                    }}>
                    <Typography color="text.primary" variant="h5">
                        {query.get("editID") ? `Edit question ${query.get("editID")}` : 'Create new question'}
                    </Typography>
                    <Box
                        component="form"
                        fullWidth={true}
                    >
                        <TextField
                            id="question-title"
                            label="Question Title"
                            multiline
                            fullWidth={true}
                            margin="normal"
                            size="small"
                            name="Question"
                            value={input.Question}
                            onChange={handleChange}
                        />

                        <FormControl fullWidth={true} margin="normal" size="small">
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={input.Type}
                                label="Type"
                                name="Type"
                                onChange={handleChange}
                            >
                                <MenuItem value={'Single Choice'}>Single Choice</MenuItem>
                                <MenuItem value={'Multiple Choices'}>Multiple Choices</MenuItem>
                                <MenuItem value={'True/False'}>True/False</MenuItem>
                                <MenuItem value={'Short Answer'}>Short Answer</MenuItem>
                                <MenuItem value={'Essay'}>Essay</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth={true} margin="normal" size="small">
                            <InputLabel id="demo-simple-select-label">Level</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={input.Level}
                                name="Level"
                                label="Level"
                                onChange={handleChange}
                            >
                                <MenuItem value={'Easy'}>Easy</MenuItem>
                                <MenuItem value={'Medium'}>Medium</MenuItem>
                                <MenuItem value={'Hard'}>Hard</MenuItem>
                            </Select>
                        </FormControl>
                        <Box sx={{
                            pb: 3,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: "flex-end",
                            // alignItems:"flex-start"
                        }}>
                            <TextField
                                id="outlined-textarea"
                                // label="Question Title"
                                placeholder="Solution"
                                multiline
                                fullWidth={true}
                                value={solution}
                                margin="normal"
                                onChange={(e) => setSolution(e.target.value)}
                                size="small"
                            />
                            <Button onClick={handleAdd}>+ Add</Button>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={correct}
                                    name="correct"
                                    onChange={() => setCorrect(!correct)}
                                />} label="Correct" />

                        </Box>
                        {/* <FormControl fullWidth={true}> */}
                        {options.length > 0 ? <Box className="main-div" style={{
                            // margin: '20px 10px 10px',
                            marginTop: 5,
                            padding: '10px',
                            position: 'relative',
                            background: '#fff',
                            border: '2px solid #3D4E81 ',
                            borderRadius: '10px',
                            width: '100%',
                            paddingTop: "10px"
                        }}>


                            <Box className="child-div" style={{
                                padding: '5px', position: 'absolute', top: '-20px', left: '10px',
                                background: '#fff',
                            }}>
                                <InputLabel id="demo-simple-select-label">Options</InputLabel>
                            </Box>
                            {options.map((option, index) => {
                                return (
                                    <Chip
                                        key={index}
                                        name={option}
                                        label={option.Solution}
                                        variant="outlined"
                                        color={option.Correct === 1 ? 'primary' : 'success'}
                                        onDelete={() => handleDelete(option)}
                                        sx={{ m: 1 }}
                                    />
                                )
                            })}
                        </Box> : <></>}
                        {/* </FormControl> */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            background: 'white',
                            p: 2,
                        }}>
                            <Button variant="contained" color="success" p={2} onClick={handleSave}>
                                Save
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleReset}>
                                Reset
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Grid >

    )
}
