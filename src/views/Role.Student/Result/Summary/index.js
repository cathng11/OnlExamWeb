import { Grid, Paper } from '@mui/material'
import React from 'react'
export default function Summary() {
    return (
        <Grid container item xs={12} md={12} lg={12} direction="row" spacing={5}>
            <Grid item xs={6} md={3} lg={3}>
                <Paper sx={{ height: '5vh', p: 5, boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px' }}>
                    Average Score: 7
                </Paper>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
                <Paper sx={{ height: '5vh', p: 5, boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px' }}>
                    Total Tests Taken: 10
                </Paper>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
                <Paper sx={{ height: '5vh', p: 5, boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px' }}>
                    Average Time: 1:00 mins
                </Paper>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
                <Paper sx={{ height: '5vh', p: 5, boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px' }}>
                    Rank: 3
                </Paper>
            </Grid>
            </Grid>
    )
}
