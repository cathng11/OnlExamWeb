import React from 'react'
import {
    Container, Grid, Paper, Typography
} from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ListResult from './ListResult'
import Summary from './Summary';

export default function Result() {
    return (
        <Container maxWidth="full" sx={{ mt: 5, mb: 2 }}>
            <Grid container spacing={3} direction="row">
                <Grid container item xs={12} lg={12} direction="row" columnSpacing={3}>
                    <Grid item xs={12} md={6} lg={6} >
                        <Paper sx={{ height: '15vh', p: 5, boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px' }}>
                            <Typography variant="h4" color="primary"><BorderColorIcon fontSize="large"/> My Test Result</Typography>
                        </Paper>
                    </Grid>
                    <Grid container item xs={12} md={6} lg={6} direction="row" spacing={5}>
                        <Summary/>
                    </Grid>

                </Grid>
                <Grid item xs={12} >
                    <Paper sx={{ height:'40vh',boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px' }}>
                        <ListResult />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
