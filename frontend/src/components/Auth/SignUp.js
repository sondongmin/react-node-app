import React, { useState }from 'react';
import { withRouter} from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SIGN_UP_USER } from './../../queries'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
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

function SignUp(props) {
  const classes = useStyles();
  const initialState = {username: '', email: '', password: '', passwordConfirm: ''};
  const [info, setInfo] = useState(initialState);
  const handleChange = event => {
    const {name, value} = event.target;
    setInfo({...info, [name]: value});
  }
  const handleSubmit = (event, signUpUser) => {
    event.preventDefault();
    signUpUser().then(async ({data}) => {
      localStorage.setItem('token', data.signUpUser.token);
      await props.refetch();
      setInfo(initialState);
      props.history.push("/");

    }).catch(err => err);
  }
  const validateForm = () => {
    const {username, email, password, passwordConfirm} = info;
    const isInvalid = !username || !email || !password || !passwordConfirm || password !== passwordConfirm;
    return isInvalid;

  }
  const {username, email, password, passwordConfirm} = info;


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Mutation mutation={SIGN_UP_USER} variables={{username, email, password}}>
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
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}

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
                  <Grid item xs={12}>
                    <TextField
                      
                      variant="outlined"
                      required
                      fullWidth
                      name="passwordConfirm"
                      id="passwordConfirm"
                      label="passwordConfirm"
                      type="password"
                      autoComplete="passwordConfirm"
                      value={passwordConfirm}
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
                  Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            );
          }}
          
        </Mutation>
      </div>
    </Container>
  );
}

export default withRouter(SignUp);