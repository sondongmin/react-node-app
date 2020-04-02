import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SearchItem from './SearchItem';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_IMAGES } from '../../queries';


const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3), 
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  button: {
    marginTop: theme.spacing(3),
  },
  li: {
    listStyleType: 'none',
    textAlign: 'center',
    display: 'inline-block',
    width: '100%'
  },
  list: {
    display: 'inline-block',
    margin : '0px',
    padding: '0px'
  }
}));

const Search = () => {
  const classes = useStyles();
  const initialState = {name: ''};
  const [info, setInfo] = useState(initialState);
  const initialStateList = {searchImages: []};
  const [list, setList] = useState(initialStateList);

  const handleData = ({searchImages}) => {
    setList({
      searchImages
    });
  }

  const handleChange = async (event) => {
    event.persist();
    const {name, value} = event.target;
    setInfo({...info, [name]: value});
  }

  const handleClick = async (event, client) => {
    event.preventDefault();
    const { data } = await client.query({
      query: SEARCH_IMAGES,
      variables: { searchTerm: info['name'] }
    });
    handleData(data);
  }

  return (
    <ApolloConsumer>
      {(client) => {
        
        return (
          <div className={classes.paper}>
            <form>
            
              <React.Fragment>
              <CssBaseline />
              <main className={classes.layout}>
                  <Typography component="h1" variant="h4" align="center">
                    Search
                  </Typography>
                  <Typography component="h2" variant="h5" align="center">
                    Image
                  </Typography>
      
                  <React.Fragment>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id="name"
                        name="name"
                        label="Name"
                        fullWidth
                        autoComplete="name"
                        onChange={(event) => {
                          handleChange(event);
                        }}
                      />
                    </Grid>
                    
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={(event) => {
                      handleClick(event, client);
                    }}
                    className={classes.button}
                  >
                    Search
                  </Button>
                </React.Fragment>
              </main>
            </React.Fragment>
            
          </form>
          <div>
            <ul className={classes.list}>
              {list.searchImages.map(image =>
                <SearchItem key={image._id} {...image} />
              )}
            </ul>
          </div>
        </div>
          
        );
      }}
    </ApolloConsumer>
  );
  
}

export default Search;
