import { Grid, Paper, styled, Typography } from '@mui/material'
import React from 'react'
const SummaryPaper = styled(Paper)(({ theme }) => ({
    height: '15vh',
    paddingTop: '15px',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
}))
export default function Summary() {
    return (
        <Grid container item xs={12} md={12} lg={12} direction="row" spacing={5}>
            <Grid item xs={6} md={3} lg={3}>
                <SummaryPaper>
                    <Typography variant="h6">
                        Average Score:
                    </Typography>
                    <Typography variant="h4" color="error" sx={{ fontWeight: 'bold' }}>
                        7
                    </Typography>
                </SummaryPaper>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
                <SummaryPaper>
                    <Typography variant="h6">
                        Tests Taken:
                    </Typography>
                    <Typography variant="h4" color="error" sx={{ fontWeight: 'bold' }}>
                        10
                    </Typography>

                </SummaryPaper>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
                <SummaryPaper>
                    <Typography variant="h6">
                        Average Time:
                    </Typography>
                    <Typography variant="h5" color="error" sx={{ fontWeight: 'bold' }}>
                        1:00 mins
                    </Typography>
                </SummaryPaper>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
                <SummaryPaper>
                    <Typography variant="h6">
                        Rank:
                    </Typography>
                    <Typography variant="h4" color="error" sx={{ fontWeight: 'bold' }}>
                        3
                    </Typography>
                </SummaryPaper>

            </Grid>
        </Grid >
    )
}
