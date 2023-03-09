import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import '../styles/header.scss';
import Logo from '../assets/logos/logo-black.png';
import { connectWallet, getUsersContract } from '../context/utils/ContractsRequests';
import { GlobalContext } from '../context/GlobalContext';
import { UserType } from '../context/utils/UserType';


const pages = ['Transactions', 'Land registered', 'Citizens', 'Assets'];
const settings = ['Profile', 'Account', 'Logout'];

const homePageRedirection = {
  mainHome: '/',
  registryOffice: '/registry-office',
  citizen: '/citizen'
}

// destructuring window.ethereum



function Header() {
  const { state, dispatch } = React.useContext(GlobalContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const homePageLink = (state) => {
    if (!state.userData.isConnected) {
      return homePageRedirection.mainHome;
    } else {
      switch (state.userData.userType) {
        case UserType.RegistryOffice:
            return homePageRedirection.registryOffice;
        case UserType.Citizen:
          return homePageRedirection.citizen;
        default:
          return homePageRedirection.mainHome;
    }
    }
  }

  React.useEffect(() => {
    console.log(state.userData)
  }, []);

  const logoDisplay = (isLargeScreen) => {
    return <>
      <Box sx={{ display: isLargeScreen ? { xs: 'none', md: 'flex' } : { xs: 'flex', md: 'none' } }}>
        <img src={Logo} alt="mada-land" width="20px" height="20px" className="mr-2" />
      </Box>
      <Typography
        variant={isLargeScreen ? 'h6' : 'h5'}
        noWrap
        component="a"
        href={homePageLink(state)}
        sx={{
          mr: 2,
          fontFamily: 'Poppins',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'black',
          textDecoration: 'none',
          display: isLargeScreen ? { xs: 'none', md: 'flex' } : { xs: 'flex', md: 'none' },
          flexGrow: isLargeScreen ? 0 : 1,
        }}
      >
        Mada Land
      </Typography> </>
  }

  return (
    <AppBar position="static" color='header' className='header'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {logoDisplay(true)}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="black"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {logoDisplay(false)}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box className="public-address text-clip text-clip-size" sx={{ flexGrow: 0 }}>
            {state.userData.publicAddress} 
          {/* <Button color="buttonMain" variant="contained"
            onClick={connectToWallet}
            sx={{ my: 2, display: 'block' }}
          >
            Connect wallet
          </Button> */}
            
            {/* <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;