import React from 'react'
import { Grid, Paper, Skeleton, Box } from '@mui/material';

export default function LoadingDoAssignment() {
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3} lg={3}>
                    <Paper sx={{ p: 5, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',height:'50vh' }}>
                        <Skeleton animation="wave" height={20} width="100%" />
                        <Skeleton animation="wave" height={20} width="80%" />
                        <Skeleton animation="wave" height={20} width="80%" />
                        <Skeleton animation="wave" height={20} width="80%" />
                        <Skeleton animation="wave" height={20} width="80%" />
                    </Paper>
                </Grid>
                <Grid container item xs={9} md={7} lg={7} spacing={2}>
                    <Grid item xs={12}>
                        <Paper sx={{p: 3, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;' }}>
                            <Skeleton animation="wave" height={20} width="100%" />
                        </Paper>

                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 5,boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',height:'50vh'}}>
                            <Skeleton animation="wave" height={20} width="100%" />
                            <Skeleton animation="wave" height={20} width="80%" />
                            <Skeleton animation="wave" height={20} width="80%" />
                            <Skeleton animation="wave" height={20} width="80%" />

                        </Paper>
                    </Grid>

                </Grid>
                <Grid item xs={3} md={2} lg={2}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Skeleton variant="circular" width={'7vw'} height={'7vw'} />

                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
