import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import LoadingResultStudent from './../../../components/Skeleton/LoadingResultStudent';
import CustomTable from './../../../components/Table/CustomTable';
import ResultService from './../../../services/result.service';
import Summary from './Summary';
const headCells = [
    {
        id: 'class-name',
        label: 'ClassName',
        disablePadding: false,
    },

    {
        id: 'teacher',
        label: 'Teacher',
        disablePadding: false,
    },
    {
        id: 'exam-name',
        label: 'Exam Name',
        disablePadding: false,
    },
    {
        id: 'finished-time',
        label: 'Finished Time',
        disablePadding: true,
    },
    {
        id: 'status',
        label: 'Status',
        disablePadding: false,
    },
    {
        id: 'grade',
        label: 'Grade',
        disablePadding: false,
    },
    {
        id: 'action',
        label: 'Action',
        disablePadding: false,
    },

];
export default function Result() {
    const [data, setData] = React.useState(null)
    React.useEffect(() => {
        let mounted = true;
        let resultService = ResultService.getInstance()
        resultService.getListForStudent()
            .then(items => {
                console.log(items)
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
                                    p: 5,
                                    // boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
                                }}>
                                <Typography variant="h4" sx={{ color: '#000C40', fontWeight: 'bold' }} align='justify'>
                                    <BorderColorIcon fontSize="large" /> My Assignment Results
                                </Typography>
                                <Box sx={{
                                    mt: 1,
                                    height: '5px',
                                    width: '100%',
                                    background: 'linear-gradient(to right, #f0f2f0, #000c40)'
                                }} />
                            </Box>
                        </Grid>
                        <Grid container item xs={12} md={6} lg={6} direction="row" spacing={5}>
                            <Summary data={data} />
                        </Grid>

                    </Grid>
                    <Grid item xs={12} >
                        
                            <CustomTable rows={data} headCells={headCells} view={'Result'} role={'Student'} />
                    </Grid>
                </Grid>
            </Container>
        )
}
