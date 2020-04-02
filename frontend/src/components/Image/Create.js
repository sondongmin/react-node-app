import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Mutation } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ADD_IMAGE, GET_ALL_IMAGES, GET_USER_IMAGES } from '../../queries';
import red from '@material-ui/core/colors/red';
import { withRouter } from 'react-router-dom';
import AuthWrapper from '../Auth/AuthWrapper';


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
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  error: {
    textAlign: 'center',
    color: red[700]
  },
  upload: {
    visibility: 'hidden'
  }

}));

const Create = (props) => {
  const classes = useStyles();
  const initialState = {name: '', category: '', description: '', username: '', image:''};
  const [info, setInfo] = useState(initialState);
  const {session} = props;
  useEffect(() => {
    if (session && session.getCurrentUser) {
      setInfo({username: session.getCurrentUser.username});
    }
  }, [session]);
  

  const handleChange = event => {
    const {name, value} = event.target;
    setInfo({...info, [name]: value});
  }
  const handleFileChange = async (file) => {

    const toBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
    let result = await toBase64(file);

    setInfo({...info, 'image': result});
    
  }
  const handleSubmit = (event, addImage) => {
    event.preventDefault();
    addImage().then(async ({data}) => {
      setInfo(initialState);
      props.history.push("/");

    }).catch(err => err);
  }

  const validateForm = () => {
    const { name, category, description, image } = info;
    const isInvalid = !name || !category || !description || !image;

    return isInvalid;
  }

  const updateCache = (cache, {data: { addImage }}) => {
    const { getAllImages } = cache.readQuery({
      query: GET_ALL_IMAGES
    });
    cache.writeQuery({
      query: GET_ALL_IMAGES,
      data: {
        getAllImages: [addImage, ...getAllImages]

      }
    })
  }

  const { name, category, description, username, image } = info;

  return (
    <Mutation 
      mutation={ADD_IMAGE} 
      variables={{ name, category, description, username, image }}
      refetchQueries={() => [
        { query: GET_USER_IMAGES, variables: { username }}
      ]}
      update={updateCache}
      
    >
      {(addImage, {data, loading, error}) => {
        
        return (
          <form className={classes.form} noValidate onSubmit={event => handleSubmit(event, addImage)}>
            <div className={classes.paper}>
              <React.Fragment>
              <CssBaseline />
              <main className={classes.layout}>
                <Paper className={classes.paper}>
                  <Typography component="h1" variant="h4" align="center">
                    Create
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
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="category"
                          name="category"
                          label="Category"
                          fullWidth
                          autoComplete="category"
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          id="description"
                          name="description"
                          label="Description"
                          fullWidth
                          multiline
                          autoComplete="description"
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                      <input
                        color="primary"
                        accept="image/*"
                        type="file"
                        onChange={e => handleFileChange(e.target.files[0])}
                        id="icon-button-file"
                        style={{ display: 'none', }}
                      />
                      <label htmlFor="icon-button-file">
                        <Button
                            color="primary"
                            fullWidth
                            variant="contained"
                            component="span"
                            className={classes.submit}
                        >
                          Upload
                        </Button>
                        </label>
                      </Grid>
                      <Grid item xs={12} className={classes.error}>
                        {error && <p>{error.message}</p>}
                      </Grid>


                    </Grid>

                    <Button
                      disabled={loading || validateForm()}
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Create
                    </Button>
                  </React.Fragment>

                </Paper>
              </main>
            </React.Fragment>
            </div>
          </form>
        );
    }}
    </Mutation>
  );
}

export default AuthWrapper(session => session && session.getCurrentUser)(withRouter(Create));
