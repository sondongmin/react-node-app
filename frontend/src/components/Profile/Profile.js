import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserInfo from './UserInfo';
import UserImages from './UserImages';
import AuthWrapper from '../Auth/AuthWrapper';

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(18),
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
    },
    break: {
      flexBasis: '100%',
      height: 0,
    }
}));


const Profile = ({session}) => {
  const classes = useStyles();
  
  return (
    <div className={classes.paper}>
      <UserInfo session={session} />
      <UserImages username={session.getCurrentUser.username} />
    </div>
  );
}

export default AuthWrapper(session => session && session.getCurrentUser)(Profile);