import SkateboardingIcon from '@mui/icons-material/Skateboarding';
import {
  AppBar, Avatar, Box, Button, Divider, Grid, IconButton, styled, Toolbar, Tooltip, Typography
} from '@mui/material';
import * as React from 'react';
import {
  Link, Route, withRouter
} from "react-router-dom";
import '../../styles/LinkEffect.css';
import MenuBar from '../Menu/MenuBar';


const MenuLink = ({ title, path, activeOnlyWhenExact, username }) => {
  return (
    <Route
      path={path} exact={activeOnlyWhenExact} children={({ match }) => {
        var color = match ? '#3D4E81' : 'black';
        var weight = match ? 'bold' : 'normal';
        return (
          <Button
            sx={{ mr: 5, fontSize: '1rem' }}
          >
            <Link
              to={username ? `/${username}${path}` : path}
              // to={path}
              className="second after" style={{ color: color, fontWeight: weight }}>{title}</Link>
          </Button>
        )
      }}
    />
  )
}
const CaptionTypo = ({ title }) => {
  return (
    <Typography
      variant="caption"
      component="div"
      sx={{
        flexGrow: 0.1,
        ml: 4
      }}
      fontSize="10px"
      color='white'
    >
      {title}
    </Typography>
  )
}

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  width: '100vw',
  padding: 0,
  '@media (min-width: 600px)': {
    padding: 0,
    minHeight: '0px'
  }
}));
const CustomAppBar = styled(AppBar)(({ theme }) => ({
  width: '100%',
  margin: 0,
  padding: 0,
  background: 'white',
  color: 'black',
  borderBottom: '1px solid #eef2f3',
  boxShadow: 'none',
}));
const CaptionGridContainer = styled(Grid)(({ theme }) => ({
  background: '#1C1C1C',
  height: '20px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start'
}));
const LogoBox = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.gradient,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}));
const MenuBox = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.gradient,
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  width: '150px',
  borderRadius: '10px',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  // border: '1px solid #eef2f3',
  '&:hover': {
    cursor: 'pointer'
  }
}));
function HeadBar({ allowedRoutes }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const user = JSON.parse(localStorage.getItem('user'))
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <CustomAppBar position="fixed" >
      <CustomToolbar>
        <Grid container>
          <Grid item xs={2} md={2} lg={2}>
            <LogoBox>
              <Box >
                <SkateboardingIcon />
              </Box>
              <Typography variant="h4" component="div" sx={{ flexGrow: 0.1 }} color="#FFFADE  ">
                DolphinE
              </Typography>
            </LogoBox>

          </Grid>
          <Grid container item xs={10} md={10} lg={10} direction="row">
            <CaptionGridContainer container item xs={12}>
              <Grid item lg={2}>
                <CaptionTypo title="09032491405" />
              </Grid>
              <Divider orientation="vertical" light />
              <Grid item lg={2}>
                <CaptionTypo title="no-reply@dolphinexam.com" />
              </Grid>
              <Divider orientation="vertical" light />
              <Grid item lg={3}>
                <CaptionTypo title="193 Nguyen Luong Bang, Da Nang city, Viet Nam" />
              </Grid>
            </CaptionGridContainer>
            <Grid container item xs={12} md={12} lg={12} sx={{ background: 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);' }}>
              <Grid item lg={10} sx={{ p: 2 }}>
                <div
                  style={{ display: 'flex', flexDirection: 'row' }}
                  className="link-wrapper"
                >
                  {
                    allowedRoutes
                      .filter(menu => menu.type === 'MenuLink')
                      .map((menu, index) =>
                        <MenuLink
                          key={index}
                          title={menu.title}
                          path={`${menu.path}`}
                          username={localStorage.getItem('roles') === 'STUDENT' ? user.Username : ''}
                          activeOnlyWhenExact={menu.exact} />)
                  }
                </div>
              </Grid>
              <Grid item xs={2} md={2} lg={2} sx={{ p: 2, background: 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);' }}>
                <MenuBox onClick={handleClick} >
                  <Typography
                    variant="p"
                    component="div"
                    sx={{ flexGrow: 0.1, ml: 4 }}
                    fontSize="small"
                    color="black "
                  >
                    {user ? user.Username : ''}
                  </Typography>
                  <Tooltip title="Account settings">
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <Avatar sx={{ width: 24, height: 24, background: '#3D4E81' }}>{user ? user.Firstname.substring(0, 1) : ''}</Avatar>
                    </IconButton>
                  </Tooltip>
                </MenuBox>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <MenuBar
          anchorEl={anchorEl}
          open={open}
          setAnchor={handleClose} />
      </CustomToolbar>
    </CustomAppBar>
  )
}
export default withRouter(HeadBar)