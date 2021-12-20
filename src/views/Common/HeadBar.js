import {
  AppBar, Avatar, Box, Button, Grid, styled, Toolbar, Typography
} from '@mui/material';
import * as React from 'react';
import {
  Link, Route, withRouter
} from "react-router-dom";
import LOGO from '../../assets/images/dolphin.png';
import '../../styles/LinkEffect.css';
import MenuBar from '../Menu/MenuBar';
const MenuLink = ({ title, path, activeOnlyWhenExact, username }) => {
  return (
    <Route
      path={path} exact={activeOnlyWhenExact} children={({ match }) => {
        var color = match ? '#3D4E81' : '#380036';
        var weight = match ? 'bold' : 'normal';
        return (
          <Button
            sx={{ mr: 5, fontSize: '1rem' }}
          >
            <Link
              to={username ? `/${username}${path}` : path}
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
  backdropFilter: 'blur(150px)',
  boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;',
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
  background: 'linear-gradient( 178.1deg,  rgba(60,55,106,1) 8.5%, rgba(23,20,69,1) 82.4% );',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}));

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundImage: '#242052',
  textAlign: 'center',
  textTransform: 'lowercase',
  transition: '0.5s',
  backgroundSize: '200% auto',
  color: 'white',
  boxShadow: '0 0 20px #eee',
  borderRadius: '20px',
  paddingLeft: '30px',
  paddingRight: '30px',
  display: 'block',
  '&:hover': {
    backgroundPosition: 'right center',
    color: '#fff',
    textDecoration: 'none',
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
              <Avatar alt="D" src={LOGO} sx={{ width: 24, height: 24 }} />
              <Typography variant="h4" component="div" sx={{
                pl: 1,
                flexGrow: 0.1,
                fontFamily: 'Lemon, cursive'
              }} color="#EAEDF2" >
                Dolphin
              </Typography>
            </LogoBox>

          </Grid>
          <Grid container item xs={10} md={10} lg={10} direction="row">
            <CaptionGridContainer container item xs={12}>
              <Grid item xs={2}>
                <CaptionTypo title="09032491405" />
              </Grid>
              <Grid item xs={3}>
                <CaptionTypo title="contact.onlxam@gmail.com" />
              </Grid>
              <Grid item xs={7}>
                <CaptionTypo title="193 Nguyen Luong Bang, Da Nang city, Viet Nam" />
              </Grid>
            </CaptionGridContainer>
            <Grid container item xs={12} md={12} lg={12}

            >
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
              <Grid item xs={2} md={2} lg={2}
                sx={{
                  p: 2,
                }}
              >
                <CustomButton
                  variant="contained"
                  onClick={handleClick}>
                  {user ? user.Username : ''}
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <MenuBar
          anchorEl={anchorEl}
          open={open}
          setAnchor={handleClose} />
      </CustomToolbar>
    </CustomAppBar >
  )
}
export default withRouter(HeadBar)