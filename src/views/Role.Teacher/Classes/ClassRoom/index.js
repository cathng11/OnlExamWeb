import { Avatar, Container, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import * as React from 'react';
import { useHistory, useParams } from "react-router-dom";
import MapAllowedRoutes from '../../../../routes/MapAllowedRoutes';
import { getAllowedRoutes } from '../../../../utils/index';

export default function ClassRoom({ children }) {

    let allowedRoutes = [];
    allowedRoutes = getAllowedRoutes(children);
    // console.log(allowedRoutes)
    const [value, setValue] = React.useState('performance');
    let { id_class } = useParams();
    let history = useHistory();

    const basePath = `/classes/${id_class}`;

    const handleChange = (event, newValue) => {
        setValue(newValue);
        // console.log(newValue);
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
                <Grid item sx={{ background: '#262632', borderBottom: '1px solid gray', width: '100%' }} >
                    <Container>
                        <Box >
                            <Grid container sx={{ p: 2,pt:4 }} columnSpacing={2}>
                                <Grid item>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="/static/images/avatar/1.jpg"
                                        sx={{ width: 72, height: 72 }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4" gutterBottom component="div" color="white">
                                        cathng11
                                    </Typography>
                                    <Typography variant="h6" gutterBottom component="div" color="white">
                                        Ha Vinh Nguyen
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            indicatorColor="secondary"
                            aria-label="secondary tabs example"

                        >
                            <Tab value="performance" label="Performance" />
                            <Tab value="students" label="Students" />
                            <Tab value="assignments" label="Assignments" />
                            <Tab value="result" label="Result" />
                            {/* {allowedRoutes.map(({ path, title }) =>
                                <Link key={path} to={`${basePath}${path}`} style={{ marginRight: '10px' }}>{title}</Link>
                            )} */}
                        </Tabs>
                    </Container>

                </Grid>
                <Grid item sx={{ background: 'white', width: '100%' }}>
                    <Container sx={{ background: 'white' }}>
                        {/* <ListStudents /> */}
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