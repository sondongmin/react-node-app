import React from 'react';
import Grid from '@material-ui/core/Grid'
import Image from './../Image/Image'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    wrapper: {
      marginTop: theme.spacing(18),
    },
    title: {
      marginBottom: theme.spacing(10),
    },
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        minWidth: '1560px',
        maxWidth: '1560px'
    },
    first: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        width: '100%',
    },
    box: {
        padding: '30px 130px 30px 130px',
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        width: '100%'
    }

}));



const UserInfo = ({ session }) => {
    const classes = useStyles();
    const formatDate = string => {
        const date = new Date(string);
        const month = ('0' + (date.getMonth()+1)).slice(-2);
        const day  = ('0' + date.getDate()).slice(-2);
        const hours  = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);
        const seconds = ('0' + date.getSeconds()).slice(-2);
        return [ date.getFullYear(), month, day].join('-') + ' ' + [hours, minutes, seconds].join(':') ;
    }
    if (!session.getCurrentUser) {
        return null;
    }
    return (
        <div className={classes.root}>
            <div className={classes.first}>
                <h3>User Info</h3>
                <p>Username: {session.getCurrentUser.username}</p>
                <p>Email: {session.getCurrentUser.email}</p>
                <p>Join Date: {formatDate(session.getCurrentUser.createdAt)}</p>
                <h3>Your Favorites</h3>
            </div>
            
            <div className={classes.box}>
                
                <Grid container spacing={2}>
                
                
                {session.getCurrentUser.favorites.map(favorite => 
                    <Grid item xs={6} sm={3}><Image key={favorite._id} {...favorite}/></Grid>
                )}
                </Grid>
            </div>

            {!session.getCurrentUser.favorites.length && <p>You have no favorite.</p>}
                
        </div>
            

    )
}

export default UserInfo;