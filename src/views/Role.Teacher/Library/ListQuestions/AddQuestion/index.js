import { Button, FormControl, Paper, Grid, Typography, FormControlLabel, Checkbox, Chip } from '@mui/material'
import React from 'react'
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useHistory, useLocation } from "react-router-dom";
import LibraryService from '../../../../../services/library.service';

export default function AddQuestion() {
    const [input, setInput] = React.useState(null);
    const [correct, setCorrect] = React.useState(false)
    const [solution, setSolution] = React.useState('')
    const [options, setOptions] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false)
    let history = useHistory();
    let location = useLocation();
    let query = new URLSearchParams(location.search)

    const handleChange = (event) => {
        setInput(event.target.value);
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
        list.push({
            Solution: solution,
            Correct: correct ? 1 : 0
        })
        setOptions(list)
        setRefresh(!refresh)
        console.log(options)
    }
    React.useEffect(() => {
        let mounted = true;
        let id = query.get("editID")
        if (id) {
            console.log("ID", id)
            let libraryService = LibraryService.getInstance()
            libraryService.getQuestionsByID(id)
                .then(items => {
                    if (mounted) {
                        console.log(items)
                        if (items.status.Code === 200) {
                            let item = items.data
                            let list = []
                            setInput({
                                Question: item.Question,
                                Type: item.Type,
                                Level: item.Level
                            })
                            item.Solution.map((i) => {
                                list.push({
                                    SolutionID: i.SolutionID,
                                    Solution: i.Solution,
                                    Correct: i.Correct
                                })
                            })
                            setOptions(list);
                        }

                    }
                })
        }
        return () => { mounted = false };

    }, [refresh])
    return (
        <Grid item xs={12} md={12} lg={4} sx={{ background: 'white' }}>
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
                            value={input ? input.Question : ''}
                            onChange={handleChange}
                        />

                        <FormControl fullWidth={true} margin="normal" size="small">
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={input ? input.Type : ''}
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
                                value={input ? input.Level : ''}
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
                                placeholder="Option 1"
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
                        {options.length > 0 ?<Box className="main-div" style={{
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
                    </Box>:<></>}
                    {/* </FormControl> */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        background: 'white',
                        p: 2,
                    }}>
                        <Button variant="contained" color="success" p={2}>
                            Save
                        </Button>
                        <Button variant="contained" color="primary">
                            Reset
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Paper>
        </Grid >

    )
}
