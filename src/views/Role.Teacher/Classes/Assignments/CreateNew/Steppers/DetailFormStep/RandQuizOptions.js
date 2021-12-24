import {
    Autocomplete, Box, Button, FormControl, FormLabel, Grid, Paper, TextField, Typography
} from '@mui/material';
import React from 'react';
import { useHistory } from "react-router-dom";
import LoadingNewAssignment from '../../../../../../../components/Skeleton/LoadingNewAssignment';
import LoadingAlert from './../../../../../../../components/Loading/LoadingAlert';
import AssignmentContext from './../../../../../../../context/AssignmentContext';
import LibraryService from './../../../../../../../services/library.service';
import TransferQuizList from './TransferQuizList';

export default function RandQuizOptions() {
    const { assign, setAssign } = React.useContext(AssignmentContext);
    const quizType = ['Single Choice', 'Multiple Choices', 'True/False', 'Essay']
    const [level, setLevel] = React.useState({
        Easy: 0,
        Medium: 0,
        Hard: 0,
        Max: 0,
    })
    let history = useHistory();

    const [state, setState] = React.useState({
        alert: false,
        title: ''
    })
    const [num, setNum] = React.useState(0)
    const [type, setType] = React.useState(null)
    const [maxEssay, setMaxEssay] = React.useState({
        state: false,
        value: 0
    })
    const [questions, setQuestions] = React.useState(null)
    const [randomQuestions, setRandomQuestions] = React.useState({
        state: false,
        data: []
    })
    const handleChangeType = (e, value) => {
        let list = value
        if (list.length > 2 && list.includes('Essay')) {
            setMaxEssay(s => { return { ...s, state: true } })
        }
        else {
            setAssign(s => { return { ...s, MaxEssay: 0 } })
        }
        setType(value)
        setAssign(s => { return { ...s, Type: value } })
    }

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        let numLevel = questions.filter(i => { return i.Level === name }).length

        if (name === 'total-questions') {
            setNum(parseInt(value))
            setLevel(s => { return { ...s, Max: parseInt(value) } })
        } else if (name === 'max-essay') {
            setMaxEssay({ state: true, value: value })
            setAssign(s => { return { ...s, MaxEssay: value } })
        } else {
            if (num !== 0 && level.Max === 0) return;
            if (level[name] === numLevel) return;
            setLevel(s => { return { ...s, [name]: parseInt(value) } })
            setLevel(s => { return { ...s, Max: level.Max - 1 } })

        }


    }
    const handleGenerate = (e) => {

        if (num === 0) {
            setState({ alert: true, title: 'Total Questions field is required' })
            return;
        }
        let typeSet = new Set(type)
        let totalRandom = questions.filter(i => {

            return typeSet.has(i.Type)
        })

        let result = []
        if (level.Hard > 0) {
            var hardArr = totalRandom.filter(i => i.Level === "Hard")

            let number = 0;
            if (hardArr.length < level.Hard) {
                setLevel(s => { return { ...s, Hard: hardArr.length } })
                number = hardArr.length
            }
            else {
                number = level.Hard
            }

            while (number !== 0) {
                let value = hardArr[Math.floor(Math.random() * hardArr.length)]
                result.push(value)

                hardArr.filter(function (item) {
                    return item !== value
                })
                number -= 1
            }
        }
        if (level.Medium > 0) {
            var mediumArr = totalRandom.filter(i => i.Level === "Medium")
            let number = 0;
            if (mediumArr.length < level.Medium) {
                setLevel(s => { return { ...s, Medium: mediumArr.length } })
                number = mediumArr.length
            }
            else {
                number = level.Medium
            }

            while (number !== 0) {
                let value = mediumArr[Math.floor(Math.random() * mediumArr.length)]
                result.push(value)
                mediumArr.filter(function (item) {
                    return item !== value
                })
                number -= 1
            }
        }
        if (level.Easy > 0) {
            var easyArr = totalRandom.filter(i => i.Level === "Easy")
            let number = 0;
            if (easyArr.length < level.Easy) {
                setLevel(s => { return { ...s, Easy: easyArr.length } })
                number = easyArr.length
            }
            else {
                number = level.Easy
            }

            while (number !== 0) {
                let value = easyArr[Math.floor(Math.random() * easyArr.length)]
                result.push(value)
                easyArr.filter(function (item) {
                    return item !== value
                })
                number -= 1
            }
        }
        if (result.length < num) {
            let resultSet = new Set(result)
            let arr = questions.filter(i => {
                return !resultSet.has(i)
            })

            let arrLen = num - result.length
            while (arrLen !== 0) {
                let value = arr[Math.floor(Math.random() * arr.length)]
                result.push(value)
                arr.filter(function (item) {
                    return item !== value
                })
                arrLen -= 1
            }
        }
        setRandomQuestions({ state: true, data: result })
        setLevel({
            Easy: 0,
            Medium: 0,
            Hard: 0,
            Max: 0,
        })
        setType(null)
        setNum(0)
    }
    const handleError = () => {
        setState({ loading: false, alert: true, title: 'Error. Try again!' })
        history.goBack()
    }
    React.useEffect(() => {
        let mounted = true;
        if (!randomQuestions.state) {
            let libraryService = LibraryService.getInstance()
            libraryService.getQuestionsByLibID(assign.LibraryFolderID)
                .then(items => {
                    if (mounted) {
                        if (items.status.Code === 200)
                            setQuestions(items.data);
                        else {
                            handleError()
                        }
                    }
                })
                .catch((err) => {
                    handleError()
                });
        }
        return () => { mounted = false };// eslint-disable-next-line
    }, [type, randomQuestions])
    if (!questions)
        return (<LoadingNewAssignment />)
    else return (
        <Paper sx={{
            height: '70vh',
            boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
            borderRadius: '10px',
            background: '#D3E0EA',
            p: 3
        }}>
            <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false } })} />
            <Grid container >
                <Grid container item xs={12} >
                    <Grid item xs={6}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <TextField
                                label="Total Questions"
                                id="total-questions"
                                margin="normal"
                                size="small"
                                name="total-questions"
                                type='number'
                                sx={{ width: '40%', '& .css-186xcr5': { paddingRight: '15px' } }}

                                InputProps={{
                                    inputProps: {
                                        max: questions.length, min: 0
                                    }
                                }}
                                value={num}
                                onChange={handleChange}
                            />
                            {maxEssay.state ? <TextField
                                label="Maximum Mark For Essay"
                                id="max-essay"
                                margin="normal"
                                size="small"
                                sx={{ width: '40%', '& .css-186xcr5': { paddingRight: '15px' } }}
                                name="max-essay"
                                type='number'
                                InputProps={{
                                    inputProps: {
                                        max: 10, min: 0
                                    }
                                }}
                                onChange={handleChange}
                            /> : <></>}
                        </Box>
                        <Autocomplete
                            multiple
                            id="question-type"
                            name="question-type"
                            options={quizType}
                            getOptionLabel={(option) => option}
                            sx={{ '& .css-186xcr5': { paddingRight: '15px' } }}
                            onChange={handleChangeType}
                            filterSelectedOptions
                            size="small"
                            renderInput={(params) => (
                                <TextField {...params} label="Question Type" placeholder="" margin="normal"
                                />
                            )}
                        />

                    </Grid>
                    <Grid item xs={6} sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end'
                    }}>
                        <FormControl component="fieldset" variant="standard">
                            <FormLabel component="legend" sx={{ ml: 1 }}>Level</FormLabel>
                            <Grid container sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                            }}>
                                <Grid item xs={6} sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start'
                                }}>
                                    <Typography variant="body1" sx={{ m: 1 }}>
                                        Easy
                                    </Typography>
                                    <Typography variant="body1" sx={{ m: 1 }}>
                                        Medium
                                    </Typography>
                                    <Typography variant="body1" sx={{ m: 1 }}>
                                        Hard
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        variant="standard"
                                        size="small"
                                        sx={{
                                            width: '20ch',
                                            m: 2,
                                            '.css-nz481w-MuiInputBase-input-MuiInput-input': {
                                                padding: 0,
                                            },
                                            '& .css-186xcr5': { paddingRight: '15px' }
                                        }}
                                        InputProps={{
                                            inputProps: {
                                                max: num, min: 0
                                            }
                                        }}
                                        type='number'
                                        name="Easy"
                                        value={level.Easy}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        variant="standard"
                                        size="small"
                                        sx={{
                                            width: '20ch',
                                            mb: 2,
                                            '.css-nz481w-MuiInputBase-input-MuiInput-input': {
                                                padding: 0,
                                            },
                                            '& .css-186xcr5': { paddingRight: '15px' }
                                        }}
                                        InputProps={{
                                            inputProps: {
                                                max: num, min: 0
                                            }
                                        }}
                                        type='number'
                                        name="Medium"
                                        value={level.Medium}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        hiddenLabel
                                        id="filled-hidden-label-small"
                                        variant="standard"
                                        size="small"
                                        sx={{
                                            width: '20ch',
                                            mb: 2,
                                            '.css-nz481w-MuiInputBase-input-MuiInput-input': {
                                                padding: 0,
                                            },
                                            '& .css-186xcr5': { paddingRight: '15px' }
                                        }}
                                        InputProps={{
                                            inputProps: {
                                                max: num, min: 0
                                            }
                                        }}
                                        type='number'
                                        name="Hard"
                                        value={level.Hard}
                                        onChange={handleChange}
                                    />
                                </Grid>

                            </Grid>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button color="primary" variant="contained" onClick={handleGenerate}>GENERATE</Button>

                </Grid>
                <Grid item xs={12} >
                    <TransferQuizList questions={questions} randomQuestions={randomQuestions} />
                </Grid>
            </Grid>
        </Paper >
    )
}
