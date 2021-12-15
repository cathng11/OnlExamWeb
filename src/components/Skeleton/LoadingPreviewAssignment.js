import React from 'react'
import { Box, Skeleton } from '@mui/material';

export default function LoadingPreviewAssignment() {
    function generate(element) {
        return [0, 1, 2, 3].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        )
    }
    return (
        <div>
            {
                generate(
                    <Box sx={{ width: '40vw'}}>
                        <Skeleton variant="rectangular" width={'100%'} height={50} animation="wave" />
                        <Box>
                            <Skeleton animation="wave" height={15} width="80%" />
                            <Skeleton animation="wave" height={15} width="60%" />
                            <Skeleton animation="wave" height={15} width="50%" />
                            <Skeleton animation="wave" height={15} width="40%" />
                        </Box>
                    </Box>

                )}
        </div>
    )
}
