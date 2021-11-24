import React from 'react'
import { Typography, Box, Grid, Container, CssBaseline, Input, Fab } from '@mui/material';
import FolderClasses from '../components/Classes/FolderClasses';
import AddIcon from '@mui/icons-material/Add';
import data_class from '../data/data_class.json'


const data = data_class;
export default function Classes() {
    return (
        <Container maxWidth="full" sx={{ mt: 4, mb: 2 }}>
            <CssBaseline />
            <Grid container sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'white',
                pl: 7, pr: 7

            }}>
                <Grid item xs={12} lg={6}>
                    <Typography color="text.primary" variant="h5"   >
                        Classes
                    </Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}
                    >
                        <Input placeholder="Search" 
                        // inputProps={'Search'} 
                        sx={{ mr: 5 }} />
                        <Fab size="small" color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Box>

                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-around" alignItems="flex-start" sx={{ background: 'white' }}>
                <FolderClasses title={"Students"} data={data} view={"Classes"}/>
            </Grid>
        </Container >


    )
}
