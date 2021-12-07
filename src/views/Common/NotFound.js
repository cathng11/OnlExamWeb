import React from 'react'
import { Container } from '@mui/material';
import NotFoundLogo from '../../assets/images/NotFound.png';
export default function NotFound() {
    return (
        <Container
            maxWidth='full'
            sx={{
                // width: '100vw',
                // height: '100vh',
                // mt:2,
                backgroundImage: `url(${NotFoundLogo})`,
                height: '90%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: { xs: 'contain', md: 'contain', lg: 'cover' },
                backgroundPosition: { xs: 'left', md: 'center', lg: 'center' },
                position: 'absolute',
                // ml: { xs: -5, md: 0, lg: 0 }
            }}>

        </Container>
    )
}
