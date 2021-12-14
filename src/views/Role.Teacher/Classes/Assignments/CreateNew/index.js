import React from 'react'
import { Grid, Container, Typography, Box } from '@mui/material'
import Logo from '../../../../../assets/images/boy_computer.png'
import Steppers from './Steppers'
// import { useLocation } from "react-router-dom";

export default function CreateNew() {
    // let location= useLocation();
    // let query = new URLSearchParams(location.search)
    // console.log(query.get("inClass"))
    return (
        <Container maxWidth="full" sx={{ mt: 5, mb: 2, ml: 4, mr: 4 }}>
            <Grid container spacing={1} rowSpacing={{ xs: 25, md: 5, lg: 0 }}>
                <Grid item xs={12} md={12} lg={7} >
                    <Box sx={{
                        height: '70vh'
                    }}>
                        <Steppers />
                    </Box>
                </Grid>
                <Grid container item xs={12} md={12} lg={5} rowSpacing={2}>
                    <Grid item xs={12} sx={{ background: 'white' }}>
                        <Box sx={{ p: 3 }}>
                            <Typography variant="h5">About Assignment</Typography>
                            <Typography variant="body1">Enter the details about assignment to start new exam</Typography>
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
