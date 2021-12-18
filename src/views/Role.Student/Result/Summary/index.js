import { Grid, Paper, styled, Typography } from '@mui/material'
import React from 'react'
const SummaryPaper = styled(Paper)(({ theme }) => ({
    height: '15vh',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:'20px',
    backdropFilter: 'blur(50px)',
}))
export default function Summary({ data }) {
    const [input, setInput] = React.useState(null)
    React.useEffect(() => {
        if (data) {
            let score = 0
            let time = 0
            let count = 0// eslint-disable-next-line
            data.filter(item => {
                if (item.Accept) {
                    score += item.Mark
                    time += item.DoingTime
                    count++
                }
            })
            setInput({
                score: score / count,
                testsTaken: data.length,
                time: time / count,
            })
        }
    }, [data])
    return (
        <Grid container item xs={12} md={12} lg={12} direction="row" spacing={5}>
            <Grid item xs={6} md={3} lg={3}>
                <SummaryPaper>
                    <Typography variant="body1" align='center'>
                        Average Score:
                    </Typography>
                    <Typography variant="h6" color="error" sx={{ fontWeight: 'bold' }} align='center'>
                        {input ? input.score : ''}
                    </Typography>
                </SummaryPaper>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
                <SummaryPaper>
                    <Typography variant="body1" align='center'>
                        Tests Taken:
                    </Typography>
                    <Typography variant="h6" color="error" sx={{ fontWeight: 'bold' }} align='center'>
                        {input ? input.testsTaken : ''}
                    </Typography>

                </SummaryPaper>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
                <SummaryPaper>
                    <Typography variant="body1" align='center'>
                        Average Time:
                    </Typography>
                    <Typography variant="h6" color="error" sx={{ fontWeight: 'bold' }} align='center'>
                        {input ? input.time : ''} m
                    </Typography>
                </SummaryPaper>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
                <SummaryPaper>
                    <Typography variant="body1" align='center'>
                        Rank:
                    </Typography>
                    <Typography variant="h6" color="error" sx={{ fontWeight: 'bold' }} align='center'>
                        3
                    </Typography>
                </SummaryPaper>

            </Grid>
        </Grid >
    )
}
