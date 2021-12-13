import {
    Timeline, TimelineConnector,
    TimelineContent,
    TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator
} from '@mui/lab'
import {
    Box, Button, Container,
    CssBaseline,
    Grid, Paper, styled, ToggleButton, ToggleButtonGroup, Typography
} from '@mui/material'
import React, { memo, useState } from 'react'
import Calendar from 'react-calendar'
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
    borderRadius: theme.spacing(2),
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
                        <TimelineDot sx={{ background: '#3D4E81'}} />
                        {index !== data.length - 1 ? <TimelineConnector sx={{ background: '#3D4E81' }} /> : <></>}
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
    const user = JSON.parse(localStorage.getItem('user'))
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
                                            Good evening, {user.Firstname}
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
                                        sx={{
                                            background: '#ECF674 '
                                        }}
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
                                            backdropFilter: 'blur(50px)',
                                            background:'linear-gradient(to left, #7085B6 0%, #87A7D9 50%, #DEF3F8 100%);',
                                            boxShadow: '11px 13px 19px 4px rgba(55,59,68,0.7)'
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
                                            backdropFilter: 'blur(50px)',
                                            background:'linear-gradient(to bottom, #7085B6 0%, #87A7D9 50%, #DEF3F8 100%);',
                                            // boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;',
                                            // background: 'linear-gradient(to bottom, #799f0c 0%,#799f0c 20%,#ffffff 20%,#ffffff 100%)',
                                            boxShadow: '11px 13px 19px 4px rgba(55,59,68,0.7)'
                                        }}
                                    >
                                        <UpcomingSchedule />
                                    </Item>
                                </Grid>
                                <Grid item xs={12} md={12} lg={4} pr={1}>
                                    <Item
                                        sx={{
                                            maxHeight: 200,
                                            maxWeight: 240,
                                            overflow: 'hidden',
                                            backdropFilter: 'blur(50px)',
                                            background:'linear-gradient(to right, #7085B6 0%, #87A7D9 50%, #DEF3F8 100%);',
                                            boxShadow: '11px 13px 19px 4px rgba(55,59,68,0.7)'
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
                                pr: 1,
                            }}
                        >
                            <Item
                                sx={{
                                    mt:2,

                                    height: '100%',
                                    backgroundColor:'#F0F1F5',
                                    backdropFilter: 'blur(50px)',
                                    backgroundImage: `url(${user.Avatar})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                    // boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px #3D4E81'

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
                                    background: '#041C32',
                                    backdropFilter: 'blur(50px) ',
                                    boxShadow: '11px 13px 19px 4px rgba(55,59,68,0.7)',
                                    // backgroundImage: `url(${logo})`,
                                    // backgroundRepeat: 'no-repeat',
                                    // backgroundSize: 'cover',
                                    // backgroundPosition: 'center',
                                    height: 200,
                                    color: 'white',

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
                                pt: 5,
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                alignItems: 'center'
                            }}

                        >
                            <Box>
                                <Typography
                                    mb={2}
                                    variant="h6"
                                    component="div"
                                    sx={{ fontWeight: 'bold', color: '#3D4E81' }}
                                >
                                    Keep in touch with us to update new features
                                </Typography>
                                <Button variant="contained" sx={{

                                    backgroundImage: 'linear-gradient(to right, #005C97 0%, #363795  51%, #005C97  100%)',
                                    // margin: '10px',
                                    // padding: '15px 45px',
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    transition: '0.5s',
                                    backgroundSize: '200% auto',
                                    color: 'white',
                                    boxShadow: '0 0 20px #eee',
                                    borderradius: '10px',
                                    display: 'block',


                                    '&:hover': {
                                        backgroundPosition: 'right center',
                                        color: '#fff',
                                        textDecoration: 'none',

                                    }
                                }}>Connect</Button>

                            </Box>


                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    
                                    backgroundImage: `url(https://static.turbosquid.com/Preview/001270/138/81/_D.jpg)`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                }}
                            >

                            </Box>

                            {/* <Typography
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
                                                background: '#FFFFFF',
                                                color: '#EBE645',
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
                            </Demo> */}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={1} sx={{ background: 'white' }}></Grid>
            </Grid>
        </Container >
    )
}

export default memo(Dashboard)
