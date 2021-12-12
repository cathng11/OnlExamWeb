import { Box, TextField } from '@mui/material';
import * as React from 'react';
export default function ClassDialog() {
    return (
        <Box>
            <TextField
                id="name-text"
                label="Class Name"
                variant="filled"
                fullWidth={true}
                sx={{ pb: 3 }}
                size="small"
            />
        </Box>
    )
}
