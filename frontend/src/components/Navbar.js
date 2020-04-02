import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import PersonIcon from '@material-ui/icons/Person';
import SignOut from './Auth/SignOut';



const useStyles = makeStyles(theme => ({
    
    toolbar: {
      paddingRight: 24,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    navigation: {
        display: 'none',
        color: 'white',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
    },
    link: {
        color: "white"
    }
}));

const NavbarUnAuth = () => {
    const classes = useStyles();
    return (
        <div className={classes.navigation}>
            <IconButton >
                <NavLink className={classes.link} to="/" exact><CropOriginalIcon /></NavLink>
            </IconButton>
            <IconButton >
                <NavLink className={classes.link} to="/search" exact><SearchIcon /></NavLink>
            </IconButton>
            <IconButton>
                <NavLink className={classes.link} to="/signin" exact><ExitToAppIcon /></NavLink>
            </IconButton>
            <IconButton>
                <NavLink className={classes.link} to="/signup" exact><AccountBoxIcon /></NavLink>
            </IconButton>
        </div>
    );
};

const NavbarAuth = () => {
    const classes = useStyles();
    return (
        <div className={classes.navigation}>
            <IconButton >
                <NavLink className={classes.link} to="/" exact><CropOriginalIcon /></NavLink>
            </IconButton>
            <IconButton >
                <NavLink className={classes.link} to="/search" exact><SearchIcon /></NavLink>
            </IconButton>
            <IconButton>
                <NavLink className={classes.link} to="/image/create" exact><AddPhotoAlternateIcon /></NavLink>
            </IconButton>
            <IconButton>
                <NavLink className={classes.link} to="/profile" exact><PersonIcon /></NavLink>
            </IconButton>
            <IconButton>
                <SignOut />
            </IconButton>
        </div>
    );
};


const Navbar = ({session}) => {
    const classes = useStyles();
    return (
        <AppBar position="absolute" className={classes.appBar}>
            <Toolbar className={classes.toolbar}>

                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                    Piccolo
                </Typography>
                
                {session && session.getCurrentUser ? <NavbarAuth session={session} /> : <NavbarUnAuth />}
                
            </Toolbar>
        </AppBar>
    );
};

export default Navbar