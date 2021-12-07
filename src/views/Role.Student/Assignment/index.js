import React from 'react'
import {
    Container,
    CssBaseline,
    Grid,
    Paper,
} from '@mui/material'
import data_a from '../../../data/Data_StudentAssignment.json'
import data_c from '../../../data/Data_StudentClass.json'
import TableAssignment from './ListAssignments/ClassAssignments';
import ListClass from './ListAssignments/ListClass';


export default function Assignment() {
    return (
        <Container
            maxWidth="full"
            sx={{
                mt: 6,
                mb: 4,
                fontSize: '0.75rem',
                width: '100%',
            }}
        >
            <CssBaseline />
            <Grid
                container
                item
                rowSpacing={0}
                columnSpacing={4}
                sx={{ pr: 5, pl: 5 }}
            >
                <Grid container item xs={12} lg={12}
                    sx={{ background: 'white' }}
                    rowSpacing={{ xs: 4, md: 0, lg: 0 }}
                    columnSpacing={8}>
                    <Grid item xs={12} md={4} lg={4} sx={{ background: 'white' }}>
                        <Paper
                            sx={{
                                borderRadius: '20px',
                                height: '70vh',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                overflow: 'auto',
                                boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
                            }}
                        >
                            <ListClass data={data_c}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <TableAssignment data={data_a}/>
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    )
}
