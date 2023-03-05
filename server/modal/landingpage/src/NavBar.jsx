import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';

const Logo = styled('img')(({ theme }) => ({
  height: '40px',
  [theme.breakpoints.up('sm')]: {
    height: '50px',
  },
}));

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color='transparent' elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Logo src="https://supabase.io/new/images/logo-dark.png" alt="Supabase Logo"/>
          <Box sx={{ flexGrow: 1 }}/>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Button variant="text" color="inherit">Docs</Button>
            <Button variant="text" color="inherit">Pricing</Button>
            <Button variant="text" color="inherit">Blog</Button>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
            <Button variant="contained" color="secondary" size="small" href="https://app.supabase.io/auth/sign/in" target="__blank">Sign In</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
