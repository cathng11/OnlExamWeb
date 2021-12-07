import React from 'react'
import {
    FormControl,
    Box,
    Button,
    InputAdornment,
    TextField,
    Autocomplete,
    FormGroup,
    FormControlLabel,
    FormLabel,
    Checkbox,
} from '@mui/material'
import TransferQuizList from './TransferQuizList'
import HelperText from './../../../../../../../components/HelperText/HelperText';
export default function RandQuizOptions() {
    const quiztype = [
        { title: 'Multiple Choices', year: 1994 },
        { title: 'True/False', year: 1972 },
        { title: 'Short answer', year: 1974 },
        { title: 'Essay', year: 2008 },
    ]
    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: false,
    })

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        })
    }

    const { gilad, jason, antoine } = state
    return (
        <Box sx={{
            boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
            borderRadius: '10px'
        }}>
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'white',
                    p: 1,
                    pr: 2,
                    pl: 2

                }}
            >
                <Box
                    component="div"
                    sx={{
                        maxWidth: '40%',
                        display: 'flex',
                        height: '100%',
                        flexDirection: 'column',
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        background: 'white',
                    }}
                >
                    <TextField
                        label="Total Quiz"
                        id="duration-text"
                        sx={{ pb: 3 }}
                        size="small"
                        helperText={<HelperText />}
                    />
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={quiztype}
                        getOptionLabel={(option) => option.title}
                        // defaultValue={[quiztype[]]}
                        filterSelectedOptions
                        size="small"
                        renderInput={(params) => (
                            <TextField {...params} label="Quiz Type" placeholder="" />
                        )}
                    />
                </Box>
                <Box
                    component={'div'}
                    sx={{
                        width: '50%',
                        display: 'flex',
                        flexDirection: 'row',
                        background: 'white',
                    }}
                >
                    <FormControl component="fieldset" variant="standard">
                        <FormLabel component="legend">Level</FormLabel>
                        <Box
                            component="div"
                            sx={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                            }}
                        >
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={gilad}
                                            onChange={handleChange}
                                            name="gilad"
                                        />
                                    }
                                    label="Easy"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={jason}
                                            onChange={handleChange}
                                            name="jason"
                                        />
                                    }
                                    label="Medium"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={antoine}
                                            onChange={handleChange}
                                            name="antoine"
                                        />
                                    }
                                    label="Hard"
                                />
                            </FormGroup>
                            <Box
                                sx={{
                                    marginLeft: 5,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    height: '100%',
                                    p: 0,
                                }}
                            >
                                <TextField
                                    hiddenLabel
                                    id="filled-hidden-label-small"
                                    defaultValue="0"
                                    variant="standard"
                                    size="small"
                                    sx={{
                                        width: '20ch',
                                        mb: 2,
                                        '.css-nz481w-MuiInputBase-input-MuiInput-input': {
                                            padding: 0,
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">/40</InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    hiddenLabel
                                    id="filled-hidden-label-small"
                                    defaultValue="0"
                                    variant="standard"
                                    size="small"
                                    sx={{
                                        width: '20ch',
                                        mb: 2,
                                        '.css-nz481w-MuiInputBase-input-MuiInput-input': {
                                            padding: 0,
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">/40</InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    hiddenLabel
                                    id="filled-hidden-label-small"
                                    defaultValue="0"
                                    variant="standard"
                                    size="small"
                                    sx={{
                                        width: '20ch',
                                        '.css-nz481w-MuiInputBase-input-MuiInput-input': {
                                            padding: 0,
                                        },
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">/40</InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        </Box>
                    </FormControl>
                </Box>
            </Box>
            <Box
                sx={{
                    p: 0,
                    pt: 0,
                }}
            >
                <Button color="secondary">GENERATE</Button>
                <TransferQuizList />
            </Box>
        </Box>
    )
}
