import {
    Container,
    CssBaseline,
    Grid,
    Typography,
    Breadcrumbs,
    Link,
    Stack,
    Fab,
    Input,
    Box,
} from '@mui/material'
import React from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import AddIcon from '@mui/icons-material/Add'
import TableLibrary from '../components/Library/CreateForm/TableLibrary'
import Folders from '../components/Library/Folders'
function handleClick(event) {
    event.preventDefault()
    console.info('You clicked a breadcrumb.')
}

export default function Library() {
    const breadcrumbs = [
        <Link
            underline="hover"
            key="1"
            color="inherit"
            href="/"
            onClick={handleClick}
        >
            Library
        </Link>,
        <Link
            underline="hover"
            key="2"
            color="inherit"
            href="/getting-started/installation/"
            onClick={handleClick}
        >
            Folder
        </Link>,
        <Typography key="3" color="text.primary">
            Computer Network
        </Typography>,
    ]

    return (
        <Container maxWidth="full" sx={{ mt: 0, mb: 2 }}>
            <CssBaseline />
            <Stack spacing={2} sx={{ p: 2 }}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </Stack>
            <Grid container sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'white',
                pl: 5, pr: 5

            }}>
                <Grid item xs={12} lg={6}>
                    <Typography color="text.primary" variant="h5"   >
                        Exam Folders
                    </Typography>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}
                    >
                        <Input placeholder="Search" inputProps={'Search'} sx={{ mr: 5 }} />
                        <Fab size="small" color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Box>

                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-around" alignItems="flex-start" sx={{ background: 'white' }}>
                <Folders/>
            </Grid>
        </Container>
    )
}
