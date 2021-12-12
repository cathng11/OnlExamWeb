import { Box, Chip, TextField } from '@mui/material';
import * as React from 'react';
export default function StudentDialog() {
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };
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
            <Chip
                label="Clickable Deletable"
                onClick={handleClick}
                onDelete={handleDelete}
            />
            <Chip
                label="Clickable Deletable"
                variant="outlined"
                onClick={handleClick}
                onDelete={handleDelete}
            />
        </Box>
    )
}
