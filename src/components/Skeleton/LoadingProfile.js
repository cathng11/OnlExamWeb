import { Container, Grid, Paper, styled } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import React from 'react';
const WrapperContainer = styled(Container)(({ theme }) => ({
    marginTop: '100px',
    marginBottom: '40px',
    fontSize: '0.75rem',
    width: '100%',
}));

const MainPaper = styled(Paper)(({ theme }) => ({
    height: '65vh',
    backgroundColor: 'white',
    borderRadius: '20px',
    overflow: 'auto',
    padding: '50px',
    boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'
}));

export default function LoadingProfile() {
    return (
        <div>
            <WrapperContainer maxWidth="lg" >
                <MainPaper>
                    <Skeleton animation="wave" width={"30%"} height={20} sx={{ mb: 5 }} />
                    <Grid
                        container
                        item
                        spacing={15}
                    >
                        <Grid item xs={6} lg={6}>
                            <Stack spacing={5}>
                                <Skeleton animation="wave" width={"100%"} height={20} />
                                <Skeleton animation="wave" width={"100%"} height={20} />
                                <Skeleton animation="wave" width={"100%"} height={20} />
                                <Skeleton animation="wave" width={"100%"} height={20} />

                            </Stack>
                        </Grid>
                        <Grid item xs={6} lg={6}>
                            <Stack spacing={5}>
                                <Skeleton animation="wave" width={"100%"} height={20} />
                                <Skeleton animation="wave" width={"100%"} height={20} />
                                <Skeleton animation="wave" width={"100%"} height={20} />
                                <Skeleton animation="wave" width={"60%"} height={20} />

                            </Stack>
                        </Grid>
                    </Grid>
                </MainPaper>
            </WrapperContainer >
        </div>
    )
}
