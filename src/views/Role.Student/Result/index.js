import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { ListResultsForStudent } from '../../../data/HeadCells';
import LoadingResultStudent from './../../../components/Skeleton/LoadingResultStudent';
import CustomTable from './../../../components/Table/CustomTable';
import ResultService from './../../../services/result.service';
import Summary from './Summary';

export default function Result() {
    const [data, setData] = React.useState(null)
    React.useEffect(() => {
        let mounted = true;
        let resultService = ResultService.getInstance()
        resultService.getListForStudent()
            .then(items => {
                if (mounted) {
                    if (items.status.Code === 200) {
                        setData(items.data);
                    }
                    else {

                    }
                }
            })
            .catch((err) => { console.error(err) });
        return () => { mounted = false };
    }, [])
    if (!data) {
        return (<LoadingResultStudent />)
    }
    else
        return (
            <Container maxWidth="full" sx={{ mt: 7, mb: 2 }}>
                <Grid container spacing={5} direction="row" sx={{ pl: 5, pr: 5 }}>
                    <Grid container item xs={12} lg={12} direction="row" spacing={3}>
                        <Grid item xs={12} md={6} lg={6} >
                            <Box
                                sx={{
                                    height: '15vh',
                                    p: 2,
                                }}>
                                <Typography variant="h4" sx={{ color: '#000C40', fontWeight: 'bold' }} align='justify'>
                                    <BorderColorIcon fontSize="large" /> My Assignment Results
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: 'gray',pl:5}} align='justify'>
                                    Here is a list of the assignments that you have done.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid container item xs={12} md={6} lg={6} direction="row" spacing={5}>
                            <Summary data={data} />
                        </Grid>

                    </Grid>
                    <Grid item xs={12} >
                        
                            <CustomTable rows={data} headCells={ListResultsForStudent} view={'Result'} role={'Student'} />
                    </Grid>
                </Grid>
            </Container>
        )
}
