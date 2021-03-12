import React, { useContext, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom'
import {Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Checkbox, Dialog} from '@material-ui/core';
import { FormControlLabel, Typography, Container, makeStyles } from '@material-ui/core';
import {DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import {GlobalContext} from '../Context/GlobalStroge'

function Copyright() {
  document.title = "Login page"
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialstate = {
  password: '',
  username: '',
}
const initialstate1 = {
  password: '',
  cpassword: '',
}


function SignIn(props) {
  const classes = useStyles();
  const [loginForm, SetloginForm] = useState(initialstate);
  let [frotp, cfrotp] = React.useState('');
  const [openvar, setOpenvar] = React.useState(false); 
  const [openvar1, setOpenvar1] = React.useState(false); 
  const [openvar2, setOpenvar2] = React.useState(false); 
  const [isemail, cisemail] = React.useState(false); 
  const [searchdata, changesearchdata] = React.useState('');
  const [usergivenotp, changeusergivenotp] = React.useState('');
  const [forgetForm, changeforgetForm] = React.useState(initialstate1);
  const history = useHistory();
  const {ChangeuserData} = useContext(GlobalContext)

  const handleClickOpen1 = () => {
    setOpenvar(true);
  };
  const handleClose1 = () => {
    setOpenvar(false);
  };
  const handleClickOpen2 = () => {
    setOpenvar1(true);
  };
  const handleClose2 = () => {
    setOpenvar1(false);
  };
  const handleClickOpen3 = () => {
    setOpenvar2(true);
  };
  const handleClose3 = () => {
    setOpenvar2(false);
  };
  const savepassword = async () => {
    const obj = {
      ...forgetForm,
      isemail: isemail,
      emailorusername: searchdata
    }
    axios.patch('/forgetpass', obj);
    handleClose3();
  }
  const sendOtpTovarify = async () => {
    console.log('sending.......');
    const result = await axios.post('/forgetpass', {emailorusername: searchdata});
    console.log('got sent.......');
    if (result.data.isVarified) {
      cfrotp(result.data.val);
      cisemail(result.data.isemail);
      console.log(frotp);
      handleClose1();
      handleClickOpen2();
    } else {
      alert(result.data.massage);
    }
  }
  const varifyOtp = () => {
    if (frotp == usergivenotp) {
      console.log('passed.......');
      handleClickOpen3();
    } else {
      alert('otp did not match')
    }
    console.log(frotp, usergivenotp);
    handleClose2();
  }
  const forgetpass1 = (
    <Dialog open={openvar} onClose={handleClose1} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Forget password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your email Address or username to search your account
          And reseting your password
          </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          value = {searchdata}
          onChange = {(e) => {changesearchdata(e.target.value);}}
          label="Email Address or username"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose1} color="primary">
          Cancel
          </Button>
        <Button onClick={sendOtpTovarify} color="primary">
          Search Account
          </Button>
      </DialogActions>
    </Dialog>
  );
  const forgetpass2 = (
    <Dialog open={openvar1} onClose={handleClose2} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Forget password</DialogTitle>
      <DialogContent>
        <DialogContentText>
        We have sent an Verification code in your submited email please enter 6 digits OTP code otherwise 
            retry to resubmit form
          </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name1"
          onChange = {(e) => {changeusergivenotp(e.target.value);}}
          label="Enter OTP"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose2} color="primary">
          Cancel
          </Button>
        <Button onClick={varifyOtp} color="primary">
          Varify
          </Button>
      </DialogActions>
    </Dialog>
  );
  const forgetpass3 = (
    <Dialog open={openvar2} onClose={handleClose3} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title1">Enter new password</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="name1"
          variant = 'outlined'
          onChange = {(e) => {changeforgetForm(
            {
              ...forgetForm,
              [e.target.name]: e.target.value
            }
          );}}
          name="password"
          label="password"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          variant = 'outlined'
          onChange = {(e) => {changeforgetForm(
            {
              ...forgetForm,
              [e.target.name]: e.target.value
            }
          );}}
          name="cpassword"
          label="Confrom password"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose3} color="primary">
          Cancel
          </Button>
        <Button onClick={savepassword} color="primary">
          save
          </Button>
      </DialogActions>
    </Dialog>
  );

  const handleChange = (e) => {
    SetloginForm({ ...loginForm, [e.target.name]: e.target.value });
  }

  const handleSubmit = async () => {
    const result = await axios.post('/login', loginForm);
    console.log(result.data);
    if (result.data.isVarified) {
        console.log(result.data.data);
        ChangeuserData(result.data.data);
        history.push('/');
    } else {
      alert(result.data.massage);
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            onChange = {handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange = {handleChange}
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Select this Checkbox To Allow Use cookie Data"
          />
          <Button
            onClick = {handleSubmit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
          <Grid item xs onClick = {handleClickOpen1}>
              <Link variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {forgetpass1}
      {forgetpass2}
      {forgetpass3}
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(SignIn)