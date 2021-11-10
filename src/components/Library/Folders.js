import * as React from 'react'
import {
    Button,
    CardActionArea,
    CardActions,
    Grid,
    Divider,
    Typography,
    CardMedia,
    CardContent,
    Card,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import StringAvatar from '../Helper/StringAvatar'

function FolderItem({ data }) {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleCloseMenu = () => {
        setAnchorEl(null)
    }
    React.useEffect(() => {
        console.log(data)
    })
    return (
        <Card sx={{ maxWidth: 500, m: 5 }} key={data.id}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={data.image}
                    alt="myimg"
                />

                <CardContent>
                    <div
                        style={{
                            backgroundColor: 'white',
                            marginTop: '-50px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Avatar {...StringAvatar(data.nameFolder)} />
                    </div>
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
            <Divider />
            <CardActions
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Button size="small" color="primary">
                    Detail
                </Button>
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
                        <EditIcon sx={{ pr: 2 }} color="action" /> Edit
                    </MenuItem>
                    <MenuItem onClick={handleCloseMenu}>
                        <DeleteIcon sx={{ pr: 2 }} color="error" /> Delete
                    </MenuItem>
                </Menu>
            </CardActions>
        </Card>
    )
}
export default function Folders() {
    const data = [
        {
            id: 1,
            image:
                'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.6435-9/241770255_4005059492936002_930572996519637531_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_ohc=xEuGQHeUpoIAX9FxWut&_nc_ht=scontent.fhan2-4.fna&oh=1140c64bd604e70d15dac20c0384912f&oe=61940A84',
            nameFolder: 'Computer Network',
            createdDate: '12/12/2010',
            lastUpdatedDate: '1/1/2020 22:30:10',
            totalQuestions: 120,
            description:
                'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        },
        {
            id: 2,
            image:
                'https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/244456233_4099046333537317_6503526537058388164_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=6XC9mjR26UQAX9YN9WA&_nc_ht=scontent.fsgn2-1.fna&oh=332f7605f87bf508bda8e5ea89c93109&oe=61A0F0FB',
            nameFolder: 'Orient Object Programming',
            createdDate: '12/12/2010',
            lastUpdatedDate: '1/1/2020 22:30:10',
            totalQuestions: 120,
            description:
                'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        },
        {
            id: 3,
            image:
                'https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/244384991_4097822533659697_4213120340141986807_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=VTebPsTVbf0AX-nnZID&_nc_ht=scontent.fsgn2-1.fna&oh=387f0d112a5b5c464c794de40770ee10&oe=61A06AA1',
            nameFolder: 'Database',
            createdDate: '12/12/2010',
            lastUpdatedDate: '1/1/2020 22:30:10',
            totalQuestions: 120,
            description:
                'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        },
        {
            id: 4,
            image:
                'https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/242605665_4068819899893294_2228342551839506802_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=GmyAsNa4s7UAX94_uBG&_nc_oc=AQlF568skYhDCTRMZLnN_RWpggjooeD4488z75l_bSrJj2j_obFar4GSn25jXCcxghE5o4Ri1_VPSiC4yKtnAos0&tn=oeD-k-ka-skaGq_2&_nc_ht=scontent.fsgn2-5.fna&oh=74636d2d5679954e72b299caa64e7010&oe=61A250A8',
            nameFolder: 'Microcontrollers',
            createdDate: '12/12/2010',
            lastUpdatedDate: '1/1/2020 22:30:10',
            totalQuestions: 120,
            description:
                'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        },
        {
            id: 11,
            image:
                'https://scontent.fhan2-4.fna.fbcdn.net/v/t1.6435-9/241770255_4005059492936002_930572996519637531_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=730e14&_nc_ohc=xEuGQHeUpoIAX9FxWut&_nc_ht=scontent.fhan2-4.fna&oh=1140c64bd604e70d15dac20c0384912f&oe=61940A84',
            nameFolder: 'Computer Network',
            createdDate: '12/12/2010',
            lastUpdatedDate: '1/1/2020 22:30:10',
            totalQuestions: 120,
            description:
                'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        },
        {
            id: 12,
            image:
                'https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/244456233_4099046333537317_6503526537058388164_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=6XC9mjR26UQAX9YN9WA&_nc_ht=scontent.fsgn2-1.fna&oh=332f7605f87bf508bda8e5ea89c93109&oe=61A0F0FB',
            nameFolder: 'Orient Object Programming',
            createdDate: '12/12/2010',
            lastUpdatedDate: '1/1/2020 22:30:10',
            totalQuestions: 120,
            description:
                'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        },
        {
            id: 13,
            image:
                'https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/244384991_4097822533659697_4213120340141986807_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=730e14&_nc_ohc=VTebPsTVbf0AX-nnZID&_nc_ht=scontent.fsgn2-1.fna&oh=387f0d112a5b5c464c794de40770ee10&oe=61A06AA1',
            nameFolder: 'Database',
            createdDate: '12/12/2010',
            lastUpdatedDate: '1/1/2020 22:30:10',
            totalQuestions: 120,
            description:
                'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        },
        {
            id: 14,
            image:
                'https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/242605665_4068819899893294_2228342551839506802_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=GmyAsNa4s7UAX94_uBG&_nc_oc=AQlF568skYhDCTRMZLnN_RWpggjooeD4488z75l_bSrJj2j_obFar4GSn25jXCcxghE5o4Ri1_VPSiC4yKtnAos0&tn=oeD-k-ka-skaGq_2&_nc_ht=scontent.fsgn2-5.fna&oh=74636d2d5679954e72b299caa64e7010&oe=61A250A8',
            nameFolder: 'Microcontrollers',
            createdDate: '12/12/2010',
            lastUpdatedDate: '1/1/2020 22:30:10',
            totalQuestions: 120,
            description:
                'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
        },
    ]
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
                <Grid item xs={12} md={6} lg={3}>
                    <FolderItem key={value.id} data={value} />
                </Grid>
            ))}
        </Grid>
    )
}
