import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SIGN_IN_USER } from './../../queries'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import red from '@material-ui/core/colors/red';



const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(18),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    textAlign: 'center',
    color: red[700]
  }
}));

function SignIn(props) {
  const classes = useStyles();
  const initialState = {username: '', password: ''};
  const [info, setInfo] = useState(initialState);
  const handleChange = event => {
    const {name, value} = event.target;
    setInfo({...info, [name]: value});
  }
  const handleSubmit = (event, signInUser) => {
    event.preventDefault();
    signInUser().then(async ({data}) => {
      localStorage.setItem('token', data.signInUser.token);
      await props.refetch();
      setInfo(initialState);
      props.history.push("/");

      
    }).catch(err => err);
  }
  const validateForm = () => {
    const {username, password} = info;
    const isInvalid = !username || !password;
    return isInvalid;

  }
  const {username, password} = info;


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Mutation mutation={SIGN_IN_USER} variables={{username, password}}>
          {(signUpUser, {data, loading, error}) => {

            return (
              <form className={classes.form} noValidate onSubmit={event => handleSubmit(event, signUpUser)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      value={username}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="password"
                      value={password}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}className={classes.error}>
                    {error && <p>{error.message}</p>}
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  disabled={loading || validateForm()}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
              </form>
            );
          }}
          
        </Mutation>
      </div>
    </Container>
  );
}
export default withRouter(SignIn);