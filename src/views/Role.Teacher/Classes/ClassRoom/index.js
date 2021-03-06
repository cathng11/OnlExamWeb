import { Avatar, Container, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Tabs, styled } from '@mui/material';
import * as React from 'react';
import { useHistory, useParams } from "react-router-dom";
import MapAllowedRoutes from '../../../../routes/MapAllowedRoutes';
import { getAllowedRoutes } from '../../../../utils/index';
import logo from '../../../../assets/images/cool-background.png'
const StyledTabs = styled((props) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 100,
        width: '100%',
        backgroundColor: '#A2DBFA',
    },
});
const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
      marginRight: theme.spacing(1),
      color: 'rgba(255, 255, 255, 0.7)',
      '&.Mui-selected': {
        color: '#A2DBFA',
      },
      '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
      },
    }),
  );
export default function ClassRoom({ children }) {

    let allowedRoutes = [];
    allowedRoutes = getAllowedRoutes(children);
    const [value, setValue] = React.useState('performance');
    let { id_class } = useParams();
    let history = useHistory();
    let user = JSON.parse(localStorage.getItem('user'))
    const basePath = `/classes/${id_class}`;

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 'students') {
            history.replace(`/classes/${id_class}/students`);
        } else if (newValue === 'assignments') {
            history.replace(`/classes/${id_class}/assignments`);
        } else if (newValue === 'result') {
            history.replace(`/classes/${id_class}/result`);
        } else {
            history.replace(`/classes/${id_class}`);
        }
    };

    return (
        <Container maxWidth="full" sx={{
            width: '100%', pl: 0, pr: 0, mt: 3, mb: 2, '@media (min-width: 600px)': {
                p: 0
            }
        }}>
            <Grid container >
                <Grid item sx={{
                    background: '#041C32', borderBottom: '1px solid gray', width: '100%',
                    backgroundImage: `url(${logo})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }} >
                    <Container>
                        <Box >
                            <Grid container sx={{ p: 2, pt: 4 }} columnSpacing={2}>
                                <Grid item>
                                    <Avatar
                                        alt={user.Username}
                                        src={user.Avatar}
                                        sx={{ width: 72, height: 72, border: '1px solid black', background: '#47597E' }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4" gutterBottom component="div" color="white">
                                        {user.Username}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom component="div" color="white">
                                        {user.Firstname} {user.Lastname}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <StyledTabs
                            value={value}
                            onChange={handleChange}
                            aria-label="tab-classroom"


                        >
                            <StyledTab value="performance" label="Performance" />
                            <StyledTab value="students" label="Students" />
                            <StyledTab value="assignments" label="Assignments" />
                            <StyledTab value="result" label="Result" />
                        </StyledTabs>
                    </Container>

                </Grid>
                <Grid item sx={{ background: 'white', width: '100%' }}>
                    <Container sx={{ background: 'white' }}>
                        <MapAllowedRoutes
                            routes={allowedRoutes}
                            basePath={`${basePath}`}
                        />
                    </Container>
                </Grid>
            </Grid>
        </Container>

    );
}