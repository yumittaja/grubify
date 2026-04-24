import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  InputBase,
  Box,
  alpha,
  styled,
} from '@mui/material';
import {
  Search as SearchIcon,
  ShoppingCart as ShoppingCartIcon,
  Restaurant as RestaurantIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../theme/ColorModeContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.14)
      : alpha(theme.palette.common.black, 0.08),
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.common.white, 0.22)
        : alpha(theme.palette.common.black, 0.14),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const colorMode = React.useContext(ColorModeContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemCount] = useState(3); // This would come from a cart context in a real app

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <AppBar position="sticky" elevation={2}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logo"
          onClick={handleLogoClick}
          sx={{ mr: 2 }}
        >
          <RestaurantIcon sx={{ fontSize: 28 }} />
        </IconButton>
        
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            flexGrow: 0,
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            mr: 4
          }}
          onClick={handleLogoClick}
        >
          Snack4U
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Box component="form" onSubmit={handleSearch} sx={{ mr: 2 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search restaurants, foods..."
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
        </Box>

        <IconButton
          color="inherit"
          aria-label="toggle color mode"
          onClick={colorMode.toggleColorMode}
          sx={{ mr: 1 }}
        >
          {colorMode.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <Button color="inherit" sx={{ mr: 2 }}>
          Sign In
        </Button>

        <IconButton
          color="inherit"
          aria-label="shopping cart"
          onClick={handleCartClick}
        >
          <Badge badgeContent={cartItemCount} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
