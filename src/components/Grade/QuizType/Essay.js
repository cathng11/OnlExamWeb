import React from 'react'
import { Box, TextField } from '@mui/material';

export default function Essay() {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { pr: 5, width: '100%' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                id="outlined-basic"
                placeholder="Enter your answer here"
                multiline
                rows={16}
                variant="outlined" />
        </Box>
    )
}
