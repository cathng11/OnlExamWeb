import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
function BoxItem({ data }) {
    return (
        <Paper 
        key={data.title}
        sx={{ 
            height: 200, 
            boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px', borderRadius: 10 }}>
            <Box container sx={{
                height: '100%',
                width: '100%',
                backgroundImage: `url(${data.image})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'right bottom',
                borderRadius: 10
            }}>
                <Box sx={{
                    height: '100%',
                    pl: 5,
                    pt: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}>
                    <Typography variant="subtitle2" >
                        {data.title}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#640d14' }}>
                        {data.number}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    )
}
export default function Performance() {
    const data = [
        {
            image: 'https://cdn3d.iconscout.com/3d/premium/thumb/designer-desk-3981703-3289619.png',
            title: 'Your Students',
            number: 2
        },
        {
            image: 'https://i.pinimg.com/474x/75/fc/c8/75fcc8b4bf1f4f9fbba39345925faa6e.jpg',
            title: 'Your Assignments',
            number: '4'
        },
        {
            image: 'https://cdn3d.iconscout.com/3d/premium/thumb/marketing-manager-3025704-2526902.png',
            title: 'Average Score',
            number: '7.9'
        },
        {
            image: 'https://cdn3d.iconscout.com/3d/premium/thumb/female-tutor-giving-lesson-3080053-2569226.png',
            title: 'Total Papers',
            number: '130'
        },
    ]
    return (
        <Container
            maxWidth='full'
            sx={{ mt: 15 }}>
            <Grid container columnSpacing={5} rowSpacing={{ xs: 3, md: 3, lg: 3 }}>
                {data.map((value, index) => {
                    return (
                        <Grid item xs={6} md={6} lg={3} key={index} >

                            <BoxItem data={value} />
                        </Grid>

                    )
                })}
            </Grid>
        </Container>
    )
}
