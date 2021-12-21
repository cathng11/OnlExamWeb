import {
    Box, Container,
    CssBaseline,
    Grid, styled, ToggleButton, ToggleButtonGroup, Typography
} from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import ConnectBox from './ConnectBox'
import CustomCalendar from './CustomCalendar'
import Summary from './Summary'
import UserAvatar from './UserAvatar'
import AssignmentService from './../../services/assignment.service';
import ResultService from './../../services/result.service';

const ToggleBtn = styled(ToggleButton)(({ theme }) => ({
    textTransform: 'capitalize',
    padding: 0,
    color: '#FFFFFF'
}))
function Dashboard(route) {
    const user = JSON.parse(localStorage.getItem('user'))
    const value= new Date()
    let time = "Morning"
    if (value.getHours() > 0) time = "Morning"
    else if (value.getHours > 0 && value?.getHours < 12) time = "Afternoon"
    else if (value.getHours > 12) time = "Evening"

    const [assignment, setAssignment] = useState(null)
    const [rank, setRank] = useState(null)
    const [statics, setStatics] = useState(null)
    useEffect(() => {
        let mounted = true;
        let assignmentService = AssignmentService.getInstance();
        assignmentService.getLatestAssignment({ RoleID: user.RoleID })
            .then(items => {
                if (mounted) {
                    if (items.status.Code === 200)
                        setAssignment(items.data)
                    else {

                    }
                }
            }).catch(err => { console.error(err) })
        assignmentService.getStatics({ RoleID: user.RoleID })
            .then(items => {
                if (mounted) {
                    if (items.status.Code === 200)
                        setStatics(items.data)
                    else {

                    }
                }
            }).catch(err => { console.error(err) })
        let resultService = ResultService.getInstance();
        resultService.getRankStudent()
            .then(items => {
                if (mounted) {
                    if (items.status.Code === 200)
                        setRank(items.data)
                    else {

                    }
                }
            }).catch(err => { console.error(err) })
        return () => mounted = false;// eslint-disable-next-line
    }, [])

    return (
        <Container sx={{ mt: 5, mb: 2 }} maxWidth="full">
            <CssBaseline />
            <Grid container rowSpacing={4} direction="row" >
                <Grid container item lg={12} sx={{ p: { xs: 3, md: 5, lg: 10 }, pb: { xs: 0, md: 0, lg: 0 } }}>
                    <Grid container item xs={12} rowSpacing={4} columnSpacing={12}>
                        <Grid container item xs={12} md={8} lg={9} rowSpacing={4}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <Grid container item xs={12}>
                                <Grid item xs={8}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                            Good {time}, {user.Firstname}
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Here's what's happening in your account today.
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={4}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <ToggleButtonGroup
                                        fullWidth={true}
                                        size='small'
                                        sx={{
                                            background: '#041C32',
                                            color: '#FFFFFF'
                                        }}
                                    >
                                        <ToggleBtn value={0}>
                                            Week 10
                                        </ToggleBtn>
                                        <ToggleBtn value={1}>
                                            1st Sem.
                                        </ToggleBtn>
                                        <ToggleBtn value={2}>
                                            2020-21
                                        </ToggleBtn>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                item
                                xs={12}
                                columnSpacing={12}
                                rowSpacing={4}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Grid item xs={12} md={12} lg={4}>
                                    <Summary data={assignment} label="Latest Assignment" index={1}/>
                                </Grid>
                                <Grid item xs={12} md={12} lg={4}>
                                    <Summary data={rank} label={user.RoleID === 3 ? "Rank and GPA" : "Top 3 students"} index={2}/>
                                </Grid>
                                <Grid item xs={12} md={12} lg={4} pr={1}>
                                    <Summary data={statics} label={user.RoleID === 3 ? "Your Assignment" : "Your Class"} index={3}/>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}></Grid>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3} sx={{ height: '50vh', pr: 1, }} >
                            <UserAvatar avatar={user.Avatar} />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        rowSpacing={{ xs: 0, md: 0, lg: 0 }}
                        columnSpacing={12}
                    >
                        <Grid item xs={12} md={8} lg={9} sx={{ pt: 3 }}>
                            <CustomCalendar />
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <ConnectBox />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    )
}

export default memo(Dashboard)
