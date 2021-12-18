import {
    Avatar, Box, CardContent, CardMedia, Typography
} from '@mui/material';
import React from 'react';
import StringAvatar from '../Avatar/StringAvatar';
export default function CardAreaLibrary({data}) {
    return (
        <div>
            <CardMedia
                component="img"
                height="150vh"
                image={data.Avatar}
                alt="my_img"
            />
            <CardContent sx={{ width: '100%',height: '35vh' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'flex-end',
                        marginTop: '-50px',
                    }}
                >
                    <Avatar {...StringAvatar(data.LibraryFolderName)} />
                </Box>

                <Typography gutterBottom variant="h5" component="div">
                    {data.LibraryFolderName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Created on: {data.CreatedDate.substring(0,9)}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Last updated: {data.UpdatedDate.substring(0,9)}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Total questions: {data.TotalQuestions}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Description: {data.Description}
                </Typography>
            </CardContent>
        </div>
    )
}
