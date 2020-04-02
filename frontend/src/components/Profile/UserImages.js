import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { Query, Mutation } from 'react-apollo';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import red from '@material-ui/core/colors/red';
import Loading from '../Loading'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { GET_USER_IMAGES, UPDATE_USER_IMAGE, DELETE_USER_IMAGE, GET_ALL_IMAGES, GET_CURRENT_USER } from '../../queries';

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },  
    list: {
      display: 'inline-block',
      margin : '0px',
      padding: '0px'
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
    error: {
      textAlign: 'center',
      color: red[700]
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    link: {
        color: '#3f51b5'
    },
    box: {
      padding: '30px 130px 30px 130px',
      display: 'flex',
      flex: 1,
      flexDirection: 'row',
      width: '100%'
    },
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      minWidth: '1300px',
      maxWidth: '1300px'
    },
    action: {
      color: '#3f51b5'
    }
}));



const UserImages = ({username}) => {
  const classes = useStyles()
  const initialState = {name: '', category: '', description: '', username: ''}
  const [info, setInfo] = useState(initialState)
  const [open, setModal] = useState(false)
  const handleDelete = deleteUserImage => {
    deleteUserImage();
  }
  const handleChange = event => {
    const {name, value} = event.target
    setInfo({...info, [name]: value})
  }

  const closeModal = () => {
    setModal(false)
  }

  const loadImage = image => {
    setModal(true)
    setInfo({...image})
  }

  const handleSubmit = (event, updateUserImage) => {
    event.preventDefault()
    updateUserImage().then(({data}) => {
      setModal(false)
    })
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


  return (
    <Query query={GET_USER_IMAGES} variables={{username}}>
        {({data, loading, error}) => {
          if (loading || error) {
              return (
                  <Loading loading={loading} />
              )
          }
          return (
            <div className={classes.root}>
              <div className={classes.paper}>
                
                {open && <EditModal image={info} handleSubmit={handleSubmit} closeModal={closeModal} handleChange={handleChange} handleFileChange={handleFileChange} />}

                <h3>Your Images</h3>
                {!data.getUserImages.length && <p>You have not yet added any image!</p>}
                <div className={classes.box}>
                
                <Grid container spacing={2}>
                {data.getUserImages.map(image => 
                  <Grid item xs={6} sm={3}>
                    <Card className={classes.card} key={image._id}>
                        
                      <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={`data:${image.image}`}
                            title={image.name}
                        />
                        <CardContent>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  <span class={classes.bold}>Name: </span>{image.name}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  <span class={classes.bold}>Category: </span>{image.category}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" component="p">
                                  <span class={classes.bold}>Description: </span>{image.description}
                              </Typography>
                          </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Mutation 
                          mutation={DELETE_USER_IMAGE} 
                          variables={{ _id: image._id }}
                          refetchQueries={() => [
                            {query: GET_ALL_IMAGES },
                            {query: GET_CURRENT_USER }
                          ]}
                          update={(cache, {data: { deleteUserImage }} ) => {
                            const { getUserImages } = cache.readQuery({
                              query: GET_USER_IMAGES,
                              variables: { username } 
                            });

                            cache.writeQuery({
                              query: GET_USER_IMAGES,
                              variables: { username },
                              data: {
                                getUserImages: getUserImages.filter(image => image._id !== deleteUserImage._id)
                              }
                            })
                          }}
                        >
                          {(deleteUserImage, attrs = {}) => {
                            return (
                              <div>
                                <span>
                                  <EditIcon className={classes.action} onClick={() => loadImage(image)} />
                                </span>
                                <span>
                                  <DeleteOutlinedIcon className={classes.action} onClick={() => handleDelete(deleteUserImage)} />
                                  {attrs.loading ? "deleting" : null}
                                </span>
                              </div>
                            );
                          }}
                        
                        </Mutation>
                      </CardActions>
                    </Card>
                  </Grid>

                )} 
                </Grid>
                </div>
              </div>
            </div>
          );
        }}
    </Query>
  );
}

const EditModal = ({handleSubmit, image, closeModal, handleChange, handleFileChange}) => {
  const classes = useStyles();
  const error = null;
  
  return (
    <Mutation mutation={UPDATE_USER_IMAGE} variables={{
      _id: image._id,
      name: image.name,
      category: image.category,
      description: image.description,
      image: image.image
    }}>
      {updateUserImage => (
        <div>
          <form >
          <Dialog open={true} aria-labelledby="form-dialog-title">
          <DialogContent>
            <DialogTitle id="form-dialog-title">Edit</DialogTitle>
            <React.Fragment>
    
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="name"
                    name="name"
                    label="Name"
                    value={image.name}
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
                    value={image.category}
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
                    value={image.description}
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
                <Grid item xs={12} className={classes.error}>
                  {error && <p>{error.message}</p>}
                </Grid>
              </Grid>
    
              
              <DialogActions>
              <Button onClick={closeModal} color="primary">
                Cancel
              </Button>
              <Button onClick={(event) => handleSubmit(event, updateUserImage)} type="submit" color="primary" autoFocus>
                Edit
              </Button>
            </DialogActions>
            </React.Fragment>
            </DialogContent>
          </Dialog>
          </form>
        </div>
      )}
    
    </Mutation>
  );
}

export default UserImages;