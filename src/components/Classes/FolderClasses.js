import * as React from 'react'
import {
    Button,
    CardActionArea,
    CardActions,
    Grid,
    Divider,
    Typography,
    CardContent,
    Card,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Box,
    CardHeader,
    Container,
    Chip
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import StringAvatar from '../Helper/StringAvatar'
import { useHistory } from "react-router-dom";

function FolderItem({ data, title, view }) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleCloseMenu = () => {
        setAnchorEl(null)
    }
    let history = useHistory();

    function handleClickDetail() {
        if (view === 'Assignment')
        {
            history.push(`/${data.id}/assignment`);
        }
        else if(view==='Classes')
        {
            history.push(`/${data.id}/student`);
        }
        else if(view==='Grade')
        {
            history.push(`/${data.id}/grade`);
        }
            
    }
    const heightCard = view === 'Grade' ? 280 : 230;

    return (
        <Card sx={{
            // maxWidth: 500, 
            m: 3,
            height: heightCard,
            // background: '#CDD0CB' ,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        }}
            key={data.id}>
            <CardActionArea
                sx={{ height: heightCard - 40 }}
                onClick={handleClickDetail}>
                <CardHeader
                    height="150"
                    sx={{
                        // background: '#CDD0CB',
                        // height: '100px' 
                    }}
                    title={data.classname}
                    subheader={data.subject}
                />
                <Divider />
                <CardContent sx={{
                    // background: '#E8EAE6' 
                }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            alignItems: 'flex-end',
                            marginTop: '-50px',
                        }}
                    >
                        <Avatar {...StringAvatar(data.subject)} />
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        Class ID: {data.id}
                    </Typography>

                    {view === "Grade" ? (
                        <>
                            <Typography variant="body1" color="text.secondary" component="div">
                                Status: <Chip label={data.status} color={data.status === 'Accepted' ? 'success' : 'error'} />
                            </Typography>
                            <Typography variant="body1" color="text.secondary" component="div">
                                Number Of Papers Is Accepted: {data.numOfPapersIsAccepted}/{data.totalPapers}
                            </Typography>
                        </>
                    ) : (<><Typography variant="body1" color="text.secondary">
                        Total {title}: {title === 'Students' ? data.totalStudents : data.totalAssignments}
                    </Typography></>)}
                </CardContent>
            </CardActionArea>
            {/* <Divider /> */}
            <CardActions
                sx={{
                    height: 50,
                    width: '100%',
                    borderTop: '1px solid #bdc3c7',
                    // background: '#CFDAC8'
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
                    {/* <Link to={`/class/${data.id}/assignment`} > */}
                    <Button size="small" color="primary" onClick={handleClickDetail}>
                        Detail
                    </Button>
                    {/* </Link> */}
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
                    <MenuItem onClick={handleCloseMenu}>
                        <EditIcon sx={{ pr: 1 }} color="action" /> Edit
                    </MenuItem>
                    <MenuItem onClick={handleCloseMenu}>
                        <DeleteIcon sx={{ pr: 1 }} color="error" /> Delete
                    </MenuItem>
                </Menu>
            </CardActions>
        </Card>
    )
}
export default function FolderClasses({ data, title, view }) {

    return (
        <Container maxWidth="full" sx={{ mt: 3 }}>
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                alignContent="center"
            >
                {data.map((value, index) => (
                    <Grid item xs={12} md={6} lg={3} key={value.id}>
                        <FolderItem
                            key={value.id}
                            data={value}
                            title={title}
                            view={view} />
                    </Grid>
                ))}
            </Grid>
        </Container>

    )

}
