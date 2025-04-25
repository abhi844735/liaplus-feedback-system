import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import DashboardIcon from '@mui/icons-material/Dashboard';

const Header = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Feedback System
          </Typography>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/" 
            startIcon={<FeedbackIcon />}
          >
            Submit Feedback
          </Button>
          <Button 
            color="inherit" 
            component={RouterLink} 
            to="/dashboard" 
            startIcon={<DashboardIcon />}
          >
            Dashboard
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 