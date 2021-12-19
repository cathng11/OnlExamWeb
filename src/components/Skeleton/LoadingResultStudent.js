import { Container, Grid, Typography,Box } from '@mui/material';
import React from 'react';
import LoadingTable from './LoadingTable';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export default function LoadingResultStudent() {
    return (
        <Container maxWidth="full" sx={{ mt: 7, mb: 2 }}>
            <Grid container spacing={5} direction="row" sx={{ pl: 5, pr: 5 }}>
                <Grid container item xs={12} lg={12} direction="row" spacing={3}>
                    <Grid item xs={12} md={6} lg={6} >
                        <Box
                            sx={{
                                height: '15vh',
                                p: 2,
                            }}>
                            <Typography variant="h4" sx={{ color: '#000C40', fontWeight: 'bold' }} align='justify'>
                                <BorderColorIcon fontSize="large" /> My Assignment Results
                            </Typography>
                            <Typography variant="subtitle1" sx={{ color: 'gray', pl: 5 }} align='justify'>
                                Here is a list of the assignments that you have done.
                            </Typography>
                        </Box>
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
