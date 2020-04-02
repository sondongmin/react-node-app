import React from 'react';
import './App.css';
import { Query } from 'react-apollo'
import { GET_ALL_IMAGES } from './queries'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Image from './components/Image/Image'
import Loading from './components/Loading'

const useStyles = makeStyles(theme => ({
    wrapper: {
      marginTop: theme.spacing(18),
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: theme.spacing(10),
    },
    root: {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'row',
    },

}));

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Home</h1>
      
      <Query query={ GET_ALL_IMAGES }>
        {({data, loading, error}) => {
          if (loading || error) {
            return (
                <Loading loading={loading} />
            )
          }
          return (
            <div className={classes.root}>
              <Grid container spacing={2}>                
                  {data.getAllImages.map(image => <Grid item xs={6} sm={3}><Image key={image._id} {...image}/></Grid>)}                
              </Grid>
            </div>
          )
        }}
      </Query>
    </div>
  );
}

export default App;
