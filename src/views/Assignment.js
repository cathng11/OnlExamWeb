import * as React from 'react';
import { Typography, Box, Grid, Container, CssBaseline, Input, Fab,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FolderClasses from '../components/Classes/FolderClasses.js';

const data = [
    {
        id: 1123312,
        subject: 'Computer Network',
        classname: '18N13',
        totalStudents: 55,
        totalAssignments: 3,
    },
    {
        id: 3555342,
        subject: 'Orient Object Programming',
        classname: '18N13',
        totalStudents: 55,
        totalAssignments: 3,
    },
    {
        id: 3534534,
        subject: 'Database',
        classname: '18N13',
        totalStudents: 55,
        totalAssignments: 3,
    },
    {
        id: 5645634,
        subject: 'Microcontrollers',
        classname: '18N13',
        totalStudents: 40,
        totalAssignments: 3,
    },
    {
        id: 1345351,
        subject: 'Computer Network',
        classname: '18N13',
        totalStudents: 40,
        totalAssignments: 3,
    },
    {
        id: 1234553,
        subject: 'Orient Object Programming',
        classname: '18N13',
        totalStudents: 40,
        totalAssignments: 3,
    },
    {
        id: 13453453,
        subject: 'Database',
        classname: '18N13',
        totalStudents: 40,
        totalAssignments: 3,
    },
    {
        id: 13453454,
        subject: 'Microcontrollers',
        classname: '18N13',
        totalStudents: 40,
        totalAssignments: 3,
    },
]
export default function Assignment() {
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
                        <Input placeholder="Search" inputProps={'Search'} sx={{ mr: 5 }} />
                        <Fab size="small" color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Box>

                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-around" alignItems="flex-start" sx={{ background: 'white' }}>
                <FolderClasses title={"Assigments"} data={data} view={"Assignment"}/>
            </Grid>
        </Container >

    )
}
