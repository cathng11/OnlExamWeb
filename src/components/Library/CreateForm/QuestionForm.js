import { Button, FormControl, Paper, Grid, Typography } from '@mui/material'
import React from 'react'
import { Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

export default function QuestionForm() {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Grid item xs={12} md={4} lg={4} sx={{ background: 'white' }}>

            <Paper sx={{
                background: 'white',
                height: {xs:'', md:'',lg:'70vh'},
                borderRadius: '10px',
                p: 2,
                overflow: 'auto'
            }}>
                <Box component="div" sx={{

                    // maxWidth: "55%",
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'white',
                    p: 2,

                    // maxHeight:"100%"    
                }}>
                    <Typography color="text.primary" variant="h5">
                        Create new question
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            // '& .MuiTextField-root': { m: 1, width: '25ch' },
                            // background:'red', 
                            width: "100%",
                            p: 2
                        }}
                        // fullWidth={true}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-textarea"
                            label="Question Title"
                            // placeholder="Placeholder"
                            multiline
                            fullWidth={true}
                            sx={{ pb: 2 }}
                        />
                        <FormControl fullWidth={true} sx={{ pb: 2 }}>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Typle"
                                onChange={handleChange}
                            >
                                <MenuItem value={10}>Multiple Choices</MenuItem>
                                <MenuItem value={20}>True/False</MenuItem>
                                <MenuItem value={30}>Short Answer</MenuItem>
                                <MenuItem value={40}>Essay</MenuItem>
                            </Select>
                        </FormControl>
                        {/* <FormControl fullWidth={true}> */}
                        <Box className="main-div" style={{
                            // margin: '20px 10px 10px',
                            marginTop: 5,
                            padding: '10px',
                            position: 'relative',
                            background: '#fff', border: '2px solid green',
                            width: '100%',
                            paddingTop: "10px"
                        }}>
                            <Box sx={{
                                pr: 2, background: "white", display: 'flex', flexDirection: 'row', justifyContent: "flex-end",
                                // alignItems:"flex-start"
                            }}>
                                <Button >+ Add</Button>

                            </Box>

                            <Box className="child-div" style={{
                                padding: '5px', position: 'absolute', top: '-20px', left: '10px',
                                background: '#fff',
                            }}>
                                <InputLabel id="demo-simple-select-label">Options</InputLabel>
                            </Box>
                            <TextField
                                id="outlined-textarea"
                                // label="Question Title"
                                placeholder="Option 1"
                                multiline
                                fullWidth={true}
                                sx={{ p: 2 }}
                            />
                            <TextField
                                id="outlined-textarea"
                                // label="Question Title"
                                placeholder="Option 1"
                                multiline
                                fullWidth={true}
                                sx={{ p: 2 }}
                            />


                        </Box>
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
        </Grid>

    )
}
