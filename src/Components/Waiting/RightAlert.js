import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function RightAlert(props) {
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  return (
    <Snackbar
        open={props.snack.a}
        autoHideDuration={4000}
        onClose={() => {props.changesnack({a: false, m: '', e: false })}}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <Alert severity={(props.snack.e) ? 'success' : 'error'}> {props.snack.m} </Alert>
    </Snackbar>
  )
}

export default RightAlert
