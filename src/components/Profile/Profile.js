import React from 'react'
import {
    Container,
    CssBaseline,
    Grid,
    Paper,
    Tabs,
    Tab,
    Box,
    Button,
} from '@mui/material'
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import UserProfile from './Box/BriefUserProfile';
import GeneralProfile from './Tab/GeneralProfile';
import ActivitiesProfile from './Tab/ActivitiesProfile';
import ClassesProfile from './Tab/ClassesProfile';
export default function Profile({ data, view }) {
    const [value, setValue] = React.useState('general')
    const [visibleBtn, setVisibleBtn] = React.useState(view === "MyProfile" ? true : false)
    const handleChange = (event, newValue) => {
        setValue(newValue)
        if (view === "MyProfile" && newValue === 'general')
            setVisibleBtn(true);
        else setVisibleBtn(false);
    }
    return (
        <Container
            maxWidth="full"
            sx={{
                mt: 4,
                mb: 4,
                fontSize: '0.75rem',
                width: '100%',
            }}
        >
            <CssBaseline />
            <Grid
                container
                item
                rowSpacing={0}
                columnSpacing={4}
                sx={{ pr: 5, pl: 5 }}
            >
                <Grid container item xs={12} lg={12}
                    sx={{ background: 'white' }}
                    rowSpacing={{ xs: 4, md: 0, lg: 0 }}
                    columnSpacing={8}>
                    <Grid item xs={12} md={4} lg={4} sx={{ background: 'white' }}>
                        <Paper
                            sx={{
                                borderRadius: '20px',
                                height: '60vh',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                overflow: 'auto',
                            }}
                        >
                            <UserProfile data={data}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <Paper
                            sx={{
                                height: '65vh',
                                backgroundColor: 'white',
                                borderRadius: '20px 20px 0px 0px',
                                overflow: 'auto'
                            }}
                            value={value}
                        >
                            <TabContext value={value} >
                                <Box>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        textColor="secondary"
                                        indicatorColor="secondary"
                                        aria-label="secondary tabs example"
                                    >
                                        <Tab value="general" label="General" />
                                        <Tab value="activities" label="Activity" />
                                        <Tab value="classes" label="Classes" />
                                    </Tabs>
                                </Box>
                                <TabPanel value="general" >
                                    <GeneralProfile data={data}/>
                                </TabPanel>
                                <TabPanel value="activities" >
                                    <ActivitiesProfile data={data}/>
                                </TabPanel>
                                <TabPanel value="classes" >
                                    <ClassesProfile data={data}/>
                                </TabPanel>

                            </TabContext>

                        </Paper>
                    </Grid>
                </Grid>
                <Grid container item xs={12} lg={12} direction="row" sx={{ background: 'white' }} columnSpacing={8}   >
                    <Grid item xs={1} md={4} lg={4} sx={{ background: 'white' }}>
                    </Grid>
                    <Grid item xs={12} md={8} lg={8} sx={{ background: 'white' }}>
                        <Paper sx={{
                            height: '15vh',
                            width: '100%',
                            borderTop: '1px solid #eef2f3',
                            borderRadius: '0px 0px 20px 20px',
                            background: 'white',
                            bottom: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {visibleBtn === true ? <><Button
                                color="inherit"
                                sx={{ mr: 1 }}
                            >
                                Save</Button>
                                <Button
                                    color="inherit"
                                    sx={{ mr: 1 }}
                                >
                                    Reset</Button></> : <></>}
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    )
}
