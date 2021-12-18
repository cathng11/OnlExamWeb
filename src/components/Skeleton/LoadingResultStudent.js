import { Container, Grid, Paper, Skeleton } from '@mui/material';
import React from 'react';
import LoadingTable from './LoadingTable';

export default function LoadingResultStudent() {
    return (
        <Container maxWidth="full" sx={{ mt: 6, mb: 2 }}>
            <Grid container spacing={3} direction="row">
                <Grid container item xs={12} lg={12} direction="row" columnSpacing={3}>
                    <Grid item xs={12} md={6} lg={6} >
                        <Paper
                            sx={{
                                height: '15vh',
                                ml: 5,
                                mr: 5,
                                p: 5,
                                borderRadius: 5,
                                boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
                            }}>
                            <Skeleton animation="wave" height={20} width="100%" />
                            <Skeleton animation="wave" height={20} width="80%" />
                        </Paper>
                    </Grid>
                    <Grid container item xs={12} md={6} lg={6} direction="row" spacing={5}>
                    </Grid>

                </Grid>
                <Grid item xs={12} >
                    <LoadingTable />
                </Grid>
            </Grid>
        </Container>
    )
}
