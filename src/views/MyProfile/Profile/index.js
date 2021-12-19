import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import {
    Box, Container,
    CssBaseline,
    Grid,
    Paper, Tab, Tabs
} from '@mui/material';
import React from 'react';
import UserProfile from './Box/BriefInformation';
import GeneralProfile from './Tab/GeneralInformation';
import ClassesProfile from './Tab/MyActiveClasses';
import ActivitiesProfile from './Tab/MyActivities';
export default function Profile({ data }) {
    const [value, setValue] = React.useState('general')

    const handleChange = (event, newValue) => {
        setValue(newValue)
 
    }

    return (
        <Container
            maxWidth="full"
            sx={{
                mt: 10,
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
                <Grid container item 
                    rowSpacing={{ xs: 4, md: 0, lg: 0 }}
                    columnSpacing={8}>
                    <Grid item xs={12} md={4} lg={4} sx={{ background: 'white' }}>
                        <Paper
                            sx={{
                                // borderRadius: '20px',
                                height: '65vh',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                overflow: 'auto',
                                boxShadow:'none',
                                borderRight: '1px solid #D5D5D5'
                                // boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                            }}
                        >
                            <UserProfile data={data} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={8} lg={8}>
                        <Paper
                            sx={{
                                height: '65vh',
                                backgroundColor: 'white',
                                borderRadius: '20px',
                                overflow: 'auto',
                                boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
                            }}
                            value={value}
                        >
                            <TabContext value={value} >
                                <Box sx={{pt:1}}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        textColor="primary"
                                        indicatorColor="primary"
                                        aria-label="tab-profile"
                                    >
                                        <Tab value="general" label="General" />
                                        <Tab value="activities" label="Activity" />
                                        <Tab value="classes" label="Classes" />
                                    </Tabs>
                                </Box>
                                <TabPanel value="general" >
                                    <GeneralProfile data={data} />
                                </TabPanel>
                                <TabPanel value="activities" >
                                    <ActivitiesProfile data={data} />
                                </TabPanel>
                                <TabPanel value="classes" >
                                    <ClassesProfile data={data} />
                                </TabPanel>

                            </TabContext>

                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Container >
    )
}
