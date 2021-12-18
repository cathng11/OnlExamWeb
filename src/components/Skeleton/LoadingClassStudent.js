import React from 'react'
import { Skeleton, Typography, Container, List, ListItem, IconButton, ListItemText } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function LoadingClassStudent() {
    function generate(element) {
        return [0, 1, 2, 3, 4, 5,].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        )

    }
    return (
        <Container maxWidth="full">
            <List sx={{ width: '100%', p: 2 }}>
                {generate(
                    <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="detail"  >
                                <ArrowRightIcon />
                            </IconButton>
                        }
                    >
                        <Skeleton variant="circular" width={40} height={40} sx={{p:3,mr:3}}/>
                        <ListItemText
                            primary={<Typography variant="h6" ><Skeleton /></Typography>}
                            secondary={<Typography variant="body"><Skeleton /></Typography>}
                        />



                    </ListItem>
                )}
            </List>
        </Container>
    )
}
