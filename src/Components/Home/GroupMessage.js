import React, { useEffect } from 'react';
import { TextField, Grid, ListItemAvatar, ListItemText, Avatar, List, Button} from '@material-ui/core';
import {Dialog, IconButton, Typography, ListItem, ListItemSecondaryAction} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },

});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  messagebody: {
    width: '500px',
    display: 'flex',
    flexDirection: 'column'
  }
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function GroupMessage(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [allmessage, changeallmessage] = React.useState([])
  let sendmessagedata;
  const sendthis = async () => {
    const obj = {
      messageid: props.isopenmessage?.friendmessageid,
      message: sendmessagedata,
    }
    console.log(obj);
    changeallmessage([...allmessage, JSON.stringify([props.isopenmessage.myid, props.isopenmessage.myname ,sendmessagedata])]);
    console.log(props.isopenmessage.myid);
    await axios.post('https://desktop70app.herokuapp.com/sendgm', obj)
  }
  useEffect(async () => {
    setOpen(props.isopenmessage.open)
    if (props.isopenmessage.open == true) {
      const result = await axios.post('https://desktop70app.herokuapp.com/prevmessage', { mid: props.isopenmessage?.friendmessageid });
      changeallmessage([...result.data.result.messages]);
    }
  }, [props.isopenmessage.open])
  const handleClose = () => {
    setOpen(false);
    props.changeisopenmessage({ ...props.isopenmessage, open: false })
  };
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{ height: '52px' }}>
          <List dense>
            <ListItem>
              <ListItemAvatar>
                <Avatar alt={props.isopenmessage.fullname} src='#' />
              </ListItemAvatar>
              <ListItemText primary={<h3>{props.isopenmessage.fullname}</h3>} />
              <ListItemSecondaryAction></ListItemSecondaryAction>
            </ListItem>
          </List>
        </DialogTitle>
        <DialogContent dividers style={{ height: '350px' }}>
          <div className={classes.messagebody}>
            {allmessage?.map((val) => (
              <div style = {{display: 'flex', flexDirection: 'column', alignItems: (JSON.parse(val)[0] == props.isopenmessage?.myid) ? 'flex-end': 'flex-start'}}>
                <strong>{JSON.parse(val)[1]}</strong>
                <Typography>{JSON.parse(val)[2]}</Typography>
                <br />
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                onChange = {(e)=> {
                  sendmessagedata = e.target.value;
                }}
                size='small'
                fullWidth />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick = {sendthis}
            endIcon={<SendIcon />}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
