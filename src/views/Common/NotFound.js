import React from 'react'
import { Container } from '@mui/material';
import NotFoundLogo from '../../assets/images/NotFound.png';
export default function NotFound() {
    return (
        <Container
            maxWidth='full'
            sx={{
                backgroundImage: `url(${NotFoundLogo})`,
                height: '90%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: { xs: 'contain', md: 'contain', lg: 'cover' },
                backgroundPosition: { xs: 'left', md: 'center', lg: 'center' },
                position: 'absolute',
            }}>

        </Container>
    )
}
