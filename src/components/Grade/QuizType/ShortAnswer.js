import React from 'react'
import { Box, TextField } from '@mui/material';
export default function ShortAnswer({ solution}) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { pr: 5,width: '100%' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" placeholder="Enter your answer here" variant="outlined" />
        </Box>
    )
}
