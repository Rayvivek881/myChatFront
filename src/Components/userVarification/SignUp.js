import React, { useState } from 'react';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link} from '@material-ui/core';
import {Box, Typography, Container, Grid} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import FormDialog from './OTP'
import axios from 'axios';

const initialstate = {
  fullname: '', password: '', username: '', email: '', cpassword: '',image: ''
}

function Copyright() {
  document.title = "Sign up"
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/"> Your Website </Link>{' '}
      {new Date().getFullYear()} {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const [val, Changeval] = useState('0');
  const [flage, Changeflage] = useState(false);
  const [loginForm, SetloginForm] = useState(initialstate);

  const buttenClicking = async (e) => {
    const obj = { ...loginForm, image: "" }
    console.log('sumitting......');
    console.log(loginForm);
    const result = await axios.post('/signup', obj);
    console.log(result.data);
    if (result.data.isVarified) {
      Changeval(result.data.val);
      Changeflage(!flage);
    } else {
      alert(result.data.massage);
    }
  }

  const handleChange = (e) => {
    SetloginForm({ ...loginForm, [e.target.name]: e.target.value });
  }

  const ConverBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const selectImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await ConverBase64(file);
    SetloginForm({ ...loginForm, [e.target.name]: base64 });
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fullname"
                label="Full Name"
                name="fullname"
                autoComplete="fullname"
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="username"
                label="Username"
                type="text"
                id="username"
                autoComplete="current-username"
                onChange={handleChange}
                helperText="Username should be unique"
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
                onChange={handleChange}
                helperText="Email should be unique"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="password"
                name="password"
                variant="outlined"
                required
                fullWidth
                type="password"
                id="password"
                label="password"
                onChange={handleChange}
                helperText="Passwords should Equal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="cpassword"
                name="cpassword"
                variant="outlined"
                required
                fullWidth
                type="password"
                onChange={handleChange}
                id="cpassword"
                label="Confirm Password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="image"
                type="file"
                onChange={(e) => selectImage(e)}
                name="image"
                helperText="Choose your image if you want give it should be less then 500KB"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Please select this Checkbox To Allow us to Use cookie Data"
              />
            </Grid>
          </Grid>
          <Button
            onClick={buttenClicking}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <FormDialog
        flage={flage}
        val={val}
        Changeflage={Changeflage}
        loginForm={loginForm} />
    </Container>
  );
}

export default withRouter(SignUp)