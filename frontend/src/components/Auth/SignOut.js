import React from 'react';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    link: {
        color: "white"
    }
}));

const SignOut = ({history}) => {
    const classes = useStyles();
    const handleSignOut = (client, history) => {
        localStorage.setItem('token', '');
        client.resetStore();
        history.push('/');

    }
    return (
        <ApolloConsumer>
            { client => {
                return <MeetingRoomIcon className={classes.link} onClick={() => handleSignOut(client, history)}/>
            }}
            
        </ApolloConsumer>
    );
    
}

export default withRouter(SignOut);
