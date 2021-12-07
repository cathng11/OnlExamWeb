import { Box, Container, CssBaseline, Grid, Paper, styled } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React from 'react';
import APP_CONSTANTS from '../../constants';
import Profile from './Profile';

const WrapperContainer = styled(Container)(({ theme }) => ({
    marginTop: '60px',
    marginBottm: '40px',
    fontSize: '0.75rem',
    width: '100%',
}));
const BriefPaper = styled(Paper)(({ theme }) => ({
    borderRadius: '20px',
    height: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    overflow: 'auto',
    padding: '50px',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'

})); 
const MainPaper = styled(Paper)(({ theme }) => ({
    height: '65vh',
    backgroundColor: 'white',
    borderRadius: '20px 20px 0px 0px',
    overflow: 'auto',
    padding: '20px',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
})); 
const FooterPaper = styled(Paper)(({ theme }) => ({
    height: '15vh',
    width: '100%',
    borderTop: '1px solid #eef2f3',
    borderRadius: '0px 0px 20px 20px',
    background: 'white',
    bottom: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'


})); 
export default function MyProfile() {
    const empty_data = {
        avatar: 'avatar',
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        phone: '',
        gender: '',
        role: 'Teacher'
    }
    const [data, setData] = React.useState(null)
    const [freshData, setFreshData] = React.useState(false)
    const token = APP_CONSTANTS.TOKEN_TEACHER
    async function getProfile(data) {
        return fetch('https://onlxam.herokuapp.com/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            // body: JSON.stringify({ username: data[0], password: data[1] })
        })
            .then(data => data.json())
            .catch(err => console.log(err))
    }
    React.useEffect((pre) => {
        let mounted = true;
        getProfile()
            .then(items => {
                if (mounted) {
                    setData(items.data[0]);
                    console.log(items.data[0])
                }
            })
        return () => mounted = false;
    }, [])
    if (data){
        return( <Profile data={data} view="MyProfile"/>)
       
    }else {
        return (
            <WrapperContainer maxWidth="full">
                <CssBaseline />
                <Grid
                    container
                    item
                    rowSpacing={0}
                    columnSpacing={4}
                    sx={{ pr: 5, pl: 5 }}
                >
                    <Grid container item xs={12} lg={12}
                        rowSpacing={{ xs: 4, md: 0, lg: 0 }}
                        columnSpacing={8}>
                        <Grid item xs={12} md={4} lg={4}>
                            <BriefPaper>
                                <Skeleton variant="circular" width={'7vw'} height={'15vh'} />
                                <Skeleton variant="text" width={"100%"} height={40} />
                                <Skeleton variant="rectangular" width={"100%"} height={"40%"} />
                            </BriefPaper>
                        </Grid>
                        <Grid item xs={12} lg={8}>
                            <MainPaper>
                                <Stack spacing={2}>
                                    <Skeleton variant="text" width={"100%"} height={40} />
                                    <Skeleton variant="rectangular" width={"100%"} height={118} />
                                    <Skeleton variant="text" width={"100%"} height={40} />
                                    <Skeleton variant="text" width={"100%"} height={40} />
                                </Stack>

                            </MainPaper>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} lg={12} direction="row" sx={{ background: 'white' }} columnSpacing={8}   >
                        <Grid item xs={1} md={4} lg={4}>
                        </Grid>
                        <Grid item xs={12} md={8} lg={8}>
                            <FooterPaper >
                                <Box sx={{ width: 300 }}>
                                    <Skeleton />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation={false} />
                                </Box>
                            </FooterPaper>
                        </Grid>
                    </Grid>
                </Grid>
            </WrapperContainer >
        )
    }

}
