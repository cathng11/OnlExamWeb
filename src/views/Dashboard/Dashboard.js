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
import logo from '../../assets/images/cool-background.png'
import '../../styles/Calendar.css'
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
                        <TimelineDot sx={{ background: '#380036' }} />
                        {index !== data.length - 1 ? <TimelineConnector sx={{ background: '#3D4E81' }} /> : <></>}
                    </TimelineSeparator>
                    <TimelineContent>{value.name}</TimelineContent>
                </TimelineItem>
            ))}
        </Timeline>
    )
}

function Dashboard(route) {
    const [value, onChange] = useState(new Date())
    let time = "Morning"
    if (value.getHours() > 0) time = "Morning"
    else if (value.getHours > 0 && value?.getHours < 12) time = "Afternoon"
    else if (value.getHours > 12) time = "Evening"

    const user = JSON.parse(localStorage.getItem('user'))
    const Mailto = ({ email, subject = '', body = '', children }) => {
        let params = subject || body ? '?' : '';
        if (subject) params += `subject=${encodeURIComponent(subject)}`;
        if (body) params += `${subject ? '&' : ''}body=${encodeURIComponent(body)}`;

        return <a href={`mailto:${email}${params}`} style={{color:'white'}}>{children}</a>;
    };
    return (
        <Container sx={{ mt: 5, mb: 2 }} maxWidth="full">
            <CssBaseline />
            <Grid container rowSpacing={4} direction="row" >
                <Grid container item lg={12} sx={{ p: { xs: 3, md: 5, lg: 10 }, pb: { xs: 0, md: 0, lg: 0 } }}>
                    <Grid container item xs={12} rowSpacing={4} columnSpacing={12}>
                        <Grid
                            container
                            item
                            xs={12}
                            md={8}
                            lg={9}
                            rowSpacing={4}
                            sx={{
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
                                            Good {time}, {user.Firstname}
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
                                        fullWidth={true}
                                        size={'small'}
                                        sx={{
                                            background: '#041C32',
                                            color: '#FFFFFF'
                                        }}
                                    >
                                        <ToggleButton sx={{ textTransform: 'capitalize', p: 0, color: '#FFFFFF' }} value={0}>
                                            Week 10
                                        </ToggleButton>
                                        <ToggleButton sx={{ textTransform: 'capitalize', p: 0, color: '#FFFFFF' }} value={1}>
                                            1st Sem.
                                        </ToggleButton>
                                        <ToggleButton sx={{ textTransform: 'capitalize', p: 0, color: '#FFFFFF' }} value={2}>
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
                                            background: 'radial-gradient( circle farthest-corner at 1.3% 2.8%,  rgba(239,249,249,1) 0%, rgba(182,199,226,1) 100.2% );',
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
                                            background: 'radial-gradient( circle farthest-corner at 1.3% 2.8%,  rgba(239,249,249,1) 0%, rgba(182,199,226,1) 100.2% );',
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
                                            background: 'radial-gradient( circle farthest-corner at 1.3% 2.8%,  rgba(239,249,249,1) 0%, rgba(182,199,226,1) 100.2% );',
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
                                    mt: 2,

                                    height: '100%',
                                    backgroundColor: '#F0F1F5',
                                    backdropFilter: 'blur(50px)',
                                    backgroundImage: `url(${user.Avatar})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
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
                                    backdropFilter: 'blur(50px) ',
                                    boxShadow: '11px 13px 19px 4px rgba(55,59,68,0.7)',
                                    backgroundImage: `url(${logo})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
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
                                    textAlign: 'center',
                                    textTransform: 'uppercase',
                                    transition: '0.5s',
                                    backgroundSize: '200% auto',
                                    color: 'white',
                                    boxShadow: '0 0 20px #eee',
                                    borderRadius: '20px',
                                    display: 'block',
                                    '&:hover': {
                                        backgroundPosition: 'right center',
                                        color: '#fff',
                                        textDecoration: 'none',

                                    }
                                }}>
                                    <Mailto 
                                        email="contact.onlxam@gmail.com" 
                                        subject="Feedback From User" 
                                        body="Hello World!">
                                        Connect
                                    </Mailto>
                                    </Button>

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
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    )
}

export default memo(Dashboard)
