import {
    Avatar, Box, CardContent, CardHeader, Divider, Typography
} from '@mui/material';
import React from 'react';
import StringAvatar from '../Avatar/StringAvatar';
export default function CardAreaClass({ data }) {
    return (
        <div>
            <CardHeader
                height="150"
                sx={{
                    // background: '#CDD0CB',
                    // height: '100px' 
                }}
                title={data.ClassName}
                subheader={`ID: ${data.ClassID}`}
            />
            <Divider />
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'flex-end',
                        marginTop: '-50px',
                    }}
                >
                    <Avatar {...StringAvatar(data.ClassName)} />
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{pb:1}}>
                    Total Students: {data.TotalStudents}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{pb:1}}>
                    Total Assignments: {data.TotalAssignments}
                </Typography>
            </CardContent>
        </div>
    )
}
