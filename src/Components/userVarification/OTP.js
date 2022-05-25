import React, { useEffect, useState } from 'react';
import {Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';
import axios from 'axios'; 
import {withRouter, useHistory } from 'react-router-dom'

function FormDialog(props) {
  const [open, setOpen] = useState(false);
  const [InputOTP, ChangeInputOTP] = useState(0);
  const history = useHistory()

  useEffect(() => {
    setOpen(props.flage);
  }, [props.flage]);

  const handleClose = () => {
    setOpen(false);
    props.Changeflage(false);
  };

  const onVarify = () => {
    setOpen(false);
    if (props.val == InputOTP) {
      axios.patch('https://desktop70app.herokuapp.com/signup', props.loginForm);
      history.push('/login');
    } else {
      alert('otp do not match');
    }
  }
  return (
    <div style= {{height: '200px'}}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">OTP Verification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            We have sent an Verification code in your submited email please enter 6 digits OTP code otherwise 
            retry to resubmit form
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="OTP"
            onChange = {(e) => {ChangeInputOTP(e.target.value)}}
            rowsMax = '6'
            type="Number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onVarify} color="primary">Varify</Button>
          <Button onClick={handleClose} color="primary">Retry</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter(FormDialog);