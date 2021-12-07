import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
    Avatar, Box, Button, Card, CardActionArea,
    CardActions, CardContent, CardMedia, Divider, Grid, IconButton,
    Menu,
    MenuItem, Typography
} from '@mui/material'
import * as React from 'react'
import { Link } from "react-router-dom"
import data_library from '../../../../data/data_library'
import StringAvatar from './../../../../components/Avatar/StringAvatar'
import LoadingFolder from './../../../../components/Skeleton/LoadingFolder';

function FolderItem({ data, edit }) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleCloseMenu = () => {
        setAnchorEl(null)
    }
    const handleEdit = () => {
        edit(data.id)
    }
    return (
        <Card sx={{
            m: 5,
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
            borderRadius: '10px'
        }}
            key={data.id}>
            <Link to={`/library/folder/${data.nameFolder}/${data.id}`} >
                <CardActionArea sx={{ height: 350 }} >
                    <CardMedia
                        component="img"
                        height="140"
                        image={data.image}
                        alt="my_img"
                    />
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
                            <Avatar {...StringAvatar(data.nameFolder)} />
                        </Box>

                        <Typography gutterBottom variant="h5" component="div">
                            {data.nameFolder}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Created on: {data.createdDate}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Last updated: {data.lastUpdatedDate}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Total questions: {data.totalQuestions}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Description: {data.description}
                        </Typography>
                    </CardContent>

                </CardActionArea>
            </Link>
            <Divider />

            <CardActions
                sx={{
                    height: 50,
                    background: 'white',
                    width: '100%',
                    borderTop: '1px solid #bdc3c7'
                }}
                disableSpacing={true}
            >

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'white',
                    width: '100%'
                }}>
                    <Link to={`/library/folder/${data.nameFolder}/${data.id}`} >
                        <Button size="small" color="primary">
                            Detail
                        </Button>
                    </Link>
                    <IconButton
                        aria-label="more"
                        id="button"
                        aria-controls="menu"
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Box>


                <Menu
                    id="menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                        'aria-labelledby': 'button',
                    }}
                >
                    <MenuItem onClick={handleEdit}>
                        <EditIcon sx={{ pr: 1 }} color="action" onClick={handleEdit} /> Edit
                    </MenuItem>
                    <MenuItem onClick={handleCloseMenu}>
                        <DeleteIcon sx={{ pr: 1 }} color="error" /> Delete
                    </MenuItem>
                </Menu>
            </CardActions>
        </Card>
    )
}

export default function Folders({ edit, loading }) {
    const data = data_library
    if (loading) {
        return (<LoadingFolder view={'Library'} />)
    }
    else {
        return (
            <Grid
                container
                // spacing={1}
                direction="row"
                justify="space-between"
                alignItems="center"
                alignContent="center"
            >
                {data.map((value, index) => (
                    <Grid item xs={12} md={6} lg={3} key={index}>
                        <FolderItem key={value.id} data={value} edit={edit} />
                    </Grid>
                ))}
            </Grid>
        )
    }

}
