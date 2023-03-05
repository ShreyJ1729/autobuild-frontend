import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const menuItems = [
  {
    id: 1,
    text: 'Database',
    link: '#database',
  },
  {
    id: 2,
    text: 'Authentication',
    link: '#authentication',
  },
  {
    id: 3,
    text: 'API',
    link: '#api',
  },
  {
    id: 4,
    text: 'Functions',
    link: '#functions',
  },
  {
    id: 5,
    text: 'Subscriptions',
    link: '#subscriptions',
  },
  {
    id: 6,
    text: 'Storage',
    link: '#storage',
  },
];

const MenuWrapper = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'block',
  },
}));

const MenuItemsWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const Details = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(open);
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Supabase
            </Typography>
            <Button color="inherit" href="#contact">
              Contact
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer anchor={'left'} open={open} onClose={toggleDrawer(false)}>
        <MenuWrapper>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.id} onClick={toggleDrawer(false)}>
                <ListItemText primary={item.text} href={item.link} />
              </ListItem>
            ))}
          </List>
        </MenuWrapper>
      </Drawer>
      <MenuItemsWrapper>
        <List sx={{ display: 'flex' }}>
          {menuItems.map((item) => (
            <Button key={item.id} href={item.link} color="inherit">
              {item.text}
            </Button>
          ))}
        </List>
      </MenuItemsWrapper>
    </React.Fragment>
  );
};

export default Details;
