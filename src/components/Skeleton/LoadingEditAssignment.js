import React from 'react'
import { Box, Skeleton, Container } from '@mui/material'

export default function LoadingEditAssignment() {
    return (
        <Container maxWidth="full">
            <Box>
                <Skeleton animation="wave" height={40} width="100%" />
                <Skeleton animation="wave" height={40} width="80%" />
                <Skeleton animation="wave" height={40} width="80%" />
            </Box>
        </Container>
    )
}
