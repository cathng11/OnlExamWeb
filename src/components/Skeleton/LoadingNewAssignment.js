import { Box, Skeleton, Paper } from '@mui/material'
import React from 'react'
export default function LoadingNewAssignment() {
    return (
        <Paper component="div"
            sx={{
                height: '70vh',
                background: '#D6E6F2',
                p: 5,
                m: 5,
                boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                borderRadius: '10px'
            }}>
            <Box>
                <Skeleton variant="rectangular" width={'30%'} height={50} animation="wave" />
                <Skeleton animation="wave" height={40} width="100%" />
                <Skeleton animation="wave" height={40} width="100%" />
                <Skeleton animation="wave" height={40} width="80%" />
                <Skeleton animation="wave" height={40} width="80%" />
                <Skeleton animation="wave" height={15} width="40%" />
            </Box>
        </Paper>

    )
}
