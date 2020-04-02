import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(18),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }
}));

const Loading = (props) => {
    const classes = useStyles();
    
    return (
        <div className={classes.paper}>
            {props.loading ? (
                <h1>Loading</h1>
            ) : (
                <h1>Error</h1>
            )}
        </div>
    )
    
}


export default Loading;