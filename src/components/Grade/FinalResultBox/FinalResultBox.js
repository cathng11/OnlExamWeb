import React from 'react'
import {
    TextField,
    Typography,
    ListItem,
    ListItemText,
    Box,
    List,
    InputAdornment,
} from '@mui/material'
function UserItem({ data }) {
    return (
        <ListItem
            key={data.content}
            secondaryAction={<ListItemText primary={data.value} />}
            disablePadding
        >
            <ListItemText primary={data.content} />
        </ListItem>
    )
}
export default function FinalResultBox({info}) {
    return (
        <Box sx={{width: '100%'}}>
            <Typography variant="h5" sx={{ textAlign: 'center' }}>
                Final Result
            </Typography>
            <Box>
                <List>
                    {info.map((val) => (
                        <UserItem data={val} key={val.content} />
                    ))}
                </List>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pt: 3,
                        pb: 3,
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        label="Total Grade"
                        variant="outlined"
                        value={0}
                        disabled
                        size="small"
                        sx={{ mr: 3 }}
                    />
                    <TextField
                        disabled
                        label="Correct Answer"
                        id="filled-hidden-label-small"
                        defaultValue="0"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">/40</InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <TextField
                    id="outlined-multiline-static"
                    label="Feedback"
                    multiline
                    rows={4}
                    placeholder="Feedback"
                    fullWidth={true}
                    size="small"
                // defaultValue="Default Value"
                />
            </Box>
        </Box>
    )
}
