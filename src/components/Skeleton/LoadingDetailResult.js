import React from 'react'
import { Container, Grid, Paper, Skeleton } from '@mui/material';
import LoadingPreviewAssignment from './LoadingPreviewAssignment';

export default function LoadingDetailResult() {
    return (
        <Container maxWidth="full" sx={{ mt: 4, mb: 2 }}>
            <Grid container spacing={5} sx={{p:5}}>
                <Grid item xs={12} md={3} lg={3} >
                    <Paper sx={{
                        p: 4, 
                        boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                        borderRadius: '10px'
                    }}>
                        <Skeleton variant="text" width={"100%"} height={40} />
                        <Skeleton variant="text" width={"100%"} height={40} />
                        <Skeleton variant="text" width={"100%"} height={40} />
                        <Skeleton variant="text" width={"100%"} height={40} />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={9} lg={9} >
                    <Paper sx={{
                        p: 5,
                        boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                        borderRadius: '10px'
                    }}>
                        <LoadingPreviewAssignment />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
