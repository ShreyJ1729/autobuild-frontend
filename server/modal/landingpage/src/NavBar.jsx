import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <AppBar position='fixed' color='transparent'>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Box to='/'>
            <img
              src='https://supabase.io/new/images/logo-text-white.svg'
              alt='Supabase logo'
            />
          </Box>
          <Box sx={{ display: { sm: 'none', md: 'flex' } }}>
            <Box component={'a'} href={'https://supabase.io/docs'}>
              <Typography fontWeight={700}>Docs</Typography>
            </Box>
            <Box marginLeft={3} component={'a'} href={'https://supabase.io/blog'}>
              <Typography fontWeight={700}>Blog</Typography>
            </Box>
            <Box marginLeft={3} component={'a'} href={'https://supabase.io/about'}>
              <Typography fontWeight={700}>About</Typography>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <IconButton
              onClick={handleMenu}
              size='large'
              edge='start'
              color='inherit'
              aria-label='Menu'
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose}>
                <Box component='a' href={'https://supabase.io/docs'}>
                  Docs
                </Box>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {' '}
                <Box component='a' href={'https://supabase.io/blog'}>
                  Blog
                </Box>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {' '}
                <Box component='a' href={'https://supabase.io/about'}>
                  About
                </Box>
              </MenuItem>
            </Menu>
          </Box>
          <Button
            component='a'
            target='blank'
            href='https://app.supabase.io/'
            size='large'
            style={{
              color: 'white',
              background:
                'linear-gradient(45deg, rgba(128,0,0,1) 0%, rgba(181,0,19,1) 50%, rgba(252,103,0,1) 100%)',
              opacity: 0.9,
              fontWeight: 'bold',
            }}
          >
            Sign In
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
