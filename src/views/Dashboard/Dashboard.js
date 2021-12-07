import {
    Timeline, TimelineConnector,
    TimelineContent,
    TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator
} from '@mui/lab'
import {
    Avatar, Box, Container,
    CssBaseline,
    Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, styled, ToggleButton,
    ToggleButtonGroup, Typography
} from '@mui/material'
import React, { memo, useState } from 'react'
import Calendar from 'react-calendar'
import CONST from '../../constants'
import '../../styles/Calendar.css'

function generate(element) {
    return [0, 1, 2, 4, 5].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    )
}

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}))
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: theme.spacing(3),
    color: theme.palette.text.secondary,
}))
const UpcomingSchedule = () => {
    var data = [
        {
            date: '12/10',
            name: 'OOP',
        },
        {
            date: '13/10',
            name: 'Database',
        },
        {
            date: '14/10',
            name: 'Computer Network',
        },
    ]
    return (
        <Timeline align="left" sx={{ p: 0 }}>
            {data.map((value, index) => (
                <TimelineItem sx={{ maxHeight: '30%', minHeight: 50 }} key={index}>
                    <TimelineOppositeContent
                        sx={{ flex: 0.1, pl: 0 }}
                    >
                        {value.date}
                    </TimelineOppositeContent>
                    <TimelineSeparator >
                        <TimelineDot sx={{ background: '#403d39' }} />
                        {index !== data.length - 1 ? <TimelineConnector sx={{ background: '#403d39' }} /> : <></>}
                    </TimelineSeparator>
                    <TimelineContent>{value.name}</TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    )
}
// const TopGridContainer = styled(Grid)(({ theme }) => ({
//     // p: 3,
//     display: 'flex',
//     flexDirection: 'row',
//     background: 'white',
// }));
// const IntroGridContainer = styled(Grid)(({ theme }) => ({
//     display: 'flex',
//     justifyContent: 'flex-start',
//     alignItems: 'flex-end',
// }))
// const DateGridContainer = styled(Grid)(({ theme }) => ({
//     display: 'flex',
//     justifyContent: 'flex-end',
//     alignItems: 'flex-end',
// }))

function Dashboard(route) {
    const [value, onChange] = useState(new Date())
    console.log(route)
    return (
        <Container sx={{ mt: 5, mb: 2 }} maxWidth="full">
            <CssBaseline />
            <Grid container rowSpacing={4} direction="row">
                <Grid item lg={1}></Grid>
                <Grid container item lg={10}>
                    <Grid container item xs={12} rowSpacing={4} columnSpacing={12}>
                        <Grid
                            container
                            item
                            xs={12}
                            md={8}
                            lg={9}
                            rowSpacing={4}
                            sx={{
                                // p: 3,
                                display: 'flex',
                                flexDirection: 'row',
                                background: 'white',
                            }}
                        >
                            <Grid container item xs={12} sx={{ background: 'white' }}>
                                <Grid
                                    item
                                    xs={8}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <Box>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                            Good everning, Vinh
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            Here's what's happening in your account today.
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <ToggleButtonGroup
                                        color="primary"
                                        fullWidth={true}
                                        size={'small'}
                                    >
                                        <ToggleButton sx={{ textTransform: 'capitalize', p: 0 }} value={0}>
                                            Week 10
                                        </ToggleButton>
                                        <ToggleButton sx={{ textTransform: 'capitalize', p: 0 }} value={1}>
                                            1st Sem.
                                        </ToggleButton>
                                        <ToggleButton sx={{ textTransform: 'capitalize', p: 0 }} value={2}>
                                            2020-21
                                        </ToggleButton>
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
                                <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    lg={4}
                                    sx={{ backgroundColor: 'white' }}
                                >
                                    <Item
                                        sx={{
                                            maxHeight: 200,
                                            maxWeight: 240,
                                            overflow: 'hidden',
                                            background: '#bebbbb',
                                            boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
                                        }}
                                    >
                                        <UpcomingSchedule />
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={12} lg={4}>
                                    <Item
                                        sx={{
                                            maxHeight: 200,
                                            maxWeight: 240,
                                            overflow: 'hidden',
                                            background: '#bebbbb',
                                            boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
                                        }}
                                    >
                                        <UpcomingSchedule />
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={12} lg={4}>
                                    <Item
                                        sx={{
                                            maxHeight: 200,
                                            maxWeight: 240,
                                            overflow: 'hidden',
                                            background: '#bebbbb',
                                            boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
                                        }}
                                    >
                                        <UpcomingSchedule />
                                    </Item>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ background: 'white' }}></Grid>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            lg={3}
                            sx={{
                                height: '50vh',
                                p: 1,
                                background: 'white',
                            }}
                        >
                            <Item
                                sx={{
                                    height: '100%',
                                    backgroundImage: `url(${CONST.URL_DEFAULT_IMAGE})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
                                }}
                            ></Item>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        rowSpacing={{ xs: 0, md: 0, lg: 0 }}
                        columnSpacing={12}
                    >
                        <Grid
                            item
                            xs={12}
                            md={8}
                            lg={9}
                            sx={{
                                backgroundColor: 'white',
                                pt: 3,
                            }}
                        >
                            <Typography
                                mb={2}
                                variant="h5"
                                component="div"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Calendar
                            </Typography>
                            <Item
                                sx={{
                                    background: '#1C1C1C',
                                    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                                    // backgroundImage: `url(${logo})`,
                                    // backgroundRepeat: 'no-repeat',
                                    // backgroundSize: 'cover',
                                    // backgroundPosition: 'center',
                                    height: 200,
                                    color: 'white'
                                }}
                            >
                                <Calendar onChange={onChange} value={value} className="react-calendar" />
                            </Item>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={4}
                            lg={3}
                            sx={{
                                pt: 3,
                                // backgroundImage: `url(${Sticker})`,
                                // backgroundRepeat: 'no-repeat',
                                // backgroundSize: 'cover',
                                // backgroundPosition: 'center',
                            }}
                        >
                            <Typography
                                mb={2}
                                variant="h5"
                                component="div"
                                sx={{ fontWeight: 'bold' }}
                            >
                                Subject
                            </Typography>
                            <Demo
                                sx={{
                                    '::-webkit-scrollbar': {
                                        width: '5px',
                                    },
                                    '::-webkit-scrollbar-thumb': {
                                        backgroundColor: '#eef2f3',
                                    },
                                    '::-webkit-scrollbar-thumb:hover': {
                                        backgroundColor: 'black',
                                    },

                                    '::-webkit-scrollbar-track': {
                                        backgroundColor: 'white',
                                    },
                                    maxHeight: 200,
                                    background: 'white',
                                    overflow: 'auto',
                                }}
                            >
                                <List>
                                    {generate(
                                        <Paper
                                            sx={{
                                                fontSize: '0.75em',
                                                // padding:0,
                                                mb: '10px',
                                                borderRadius: '20px',
                                                background: '#461220',
                                                color: 'white',
                                                boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
                                                '&:hover': {
                                                    background: '#2f243a',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            <ListItem sx={{ padding: '3px 5px 3px 15px' }}>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        sx={{
                                                            bgcolor: '#1C1C1C',
                                                            width: 32,
                                                            height: 32,
                                                            fontSize: '1rem',
                                                        }}
                                                    >
                                                        1
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    sx={{
                                                        p: 0,
                                                        // '.css-10hburv-MuiTypography-root': { fontSize: '0.875rem' },
                                                        // '.css-83ijpv-MuiTypography-root': { fontSize: '0.75rem' },
                                                    }}
                                                    primary="Database"
                                                    secondary="4 class"
                                                />
                                            </ListItem>
                                        </Paper>,
                                    )}
                                </List>
                            </Demo>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={1} sx={{ background: 'white' }}></Grid>
            </Grid>
        </Container>
    )
}

export default memo(Dashboard)
