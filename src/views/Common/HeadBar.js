import {
  AppBar, Avatar, Box, Button, Divider, Grid, IconButton, styled, Toolbar, Tooltip, Typography
} from '@mui/material';
import * as React from 'react';
import {
  Link, Route, withRouter
} from "react-router-dom";
import logo from '../../assets/images/logo.png';
import { PrivateRoutesConfig } from '../../config';
import MapAllowedRoutes from '../../routes/MapAllowedRoutes';
import '../../styles/LinkEffect.css';
import { getAllowedRoutes } from '../../utils';
import MenuBar from '../Menu/MenuBar';



const MenuLink = ({ title, path, activeOnlyWhenExact }) => {
  return (
    <Route
      path={path} exact={activeOnlyWhenExact} children={({ match }) => {
        var active = match ? '#640d14' : 'black';
        return (
          <Button
            sx={{ mr: 5, fontSize: '1rem' }}
          >
            <Link 
            // to={'/cathng11' + path} 
            to={path} 
            className="second after" style={{ color: active }}>{title}</Link>
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
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  // padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))
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
  background: '#640d14',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}));
const MenuBox = styled(Box)(({ theme }) => ({
  background: '#640d14',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  width: '150px',
  borderRadius: '10px',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  border: '1px solid #eef2f3',
  '&:hover': {
    cursor: 'pointer'
  }
}));
function HeadBar() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  React.useEffect(() => {
    localStorage.setItem('roles', 'TEACHER');
    console.log(localStorage.getItem('roles'))
    // history.push('/cathng11');

  }, [])
  let allowedRoutes = [];
  allowedRoutes = getAllowedRoutes(PrivateRoutesConfig);
  // const username = 'cathng11'

  return (
    <Box sx={{ display: 'flex' }}>
      <CustomAppBar position="fixed" >
        <CustomToolbar>
          <Grid container>
            <Grid item xs={2} md={2} lg={2}>
              <LogoBox>
                <Box >
                  <img
                    src={logo}
                    style={{ width: '50px', height: '50px' }}
                    alt="Day la anh"
                  />
                </Box>
                <Typography variant="h5" component="div" sx={{ flexGrow: 0.1 }} color="white">
                  ONEXAMINE
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
                  <CaptionTypo title="no-reply@onexamine.com" />
                </Grid>
                <Divider orientation="vertical" light />
                <Grid item lg={3}>
                  <CaptionTypo title="193 Nguyen Luong Bang, Da Nang city, Viet Nam" />
                </Grid>
              </CaptionGridContainer>
              <Grid container item xs={12} md={12} lg={12} >
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
                            activeOnlyWhenExact={menu.exact} />)
                    }
                  </div>
                </Grid>
                <Grid item xs={2} md={2} lg={2} sx={{ p: 2 }}>
                  <MenuBox onClick={handleClick}>
                    <Typography
                      variant="p"
                      component="div"
                      sx={{ flexGrow: 0.1, ml: 4 }}
                      fontSize="small"
                      color="white"
                    >
                      Cathng11
                    </Typography>
                    <Tooltip title="Account settings">
                      <IconButton size="small" sx={{ ml: 1 }}>
                        <Avatar sx={{ width: 24, height: 24 }}>M</Avatar>
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
      <Box component="main" sx={{ flexGrow: 1, background: 'white' }}>
        <DrawerHeader sx={{ background: 'white' }}></DrawerHeader>
        <MapAllowedRoutes 
        routes={allowedRoutes} 
        // basePath={"/cathng11"} 
        basePath={""} 
        isAddNotFound />
      </Box>

    </Box >
  )
}
export default withRouter(HeadBar)