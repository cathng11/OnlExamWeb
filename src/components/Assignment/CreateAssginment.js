import React from 'react'
import { Grid, Container, Typography, Box } from '@mui/material'
import Logo from '../../assets/images/boy_computer.png'
import CreateStepper from './CreateAssginmentStepper/CreateStepper'
export default function CreateAssginment() {
    return (
        <Container maxWidth="full" sx={{ mt: 2, mb: 2, ml: 4, mr: 4 }}>
            <Grid container spacing={1} rowSpacing={{ xs: 25, md: 5, lg: 0 }}>
                <Grid item xs={12} md={12} lg={7} >
                    <Box sx={{
                        height: '70vh'
                    }}>
                        <CreateStepper />
                    </Box>
                </Grid>
                <Grid container item xs={12} md={12} lg={5} rowSpacing={2}>
                    <Grid item xs={12} sx={{ background: 'white' }}>
                        <Box sx={{ p: 3 }}>
                            <Typography variant="h5">About Assignment</Typography>
                            <Typography variant="body1">Enter the details about assigment to start new exam</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sx={{ background: 'white' }}>
                        <Box sx={{
                            height: '65vh',
                            width: '100%',
                            backgroundImage: `url(${Logo})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                        }}>

                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    )
}
