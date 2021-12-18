import { Container, CssBaseline, Grid, Paper, styled } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React from 'react';
const WrapperContainer = styled(Container)(({ theme }) => ({
    marginTop: '60px',
    marginBottom: '40px',
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
    height: '75vh',
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'auto',
    padding: '20px',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
}));

export default function LoadingProfile() {
    return (
        <div>
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
                        <Grid item xs={12} md={8} lg={8} >
                            <MainPaper>
                                <Stack spacing={2}>
                                    <Skeleton variant="text" width={"100%"} height={40} />
                                    <Skeleton variant="rectangular" width={"100%"} height={118} />
                                    <Skeleton variant="text" width={"100%"} height={40} />
                                    <Skeleton variant="text" width={"100%"} height={40} />
                                </Stack>

                            </MainPaper>
                            <Grid item xs={1} md={4} lg={4}>
                            </Grid>
                        </Grid>
                    </Grid>

                </Grid>
            </WrapperContainer >
        </div>
    )
}
