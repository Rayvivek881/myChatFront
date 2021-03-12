import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
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

export default function ProfileMSG(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [messagedata, changemessagedata] = React.useState({})
  const [allmessage, changeallmessage] = React.useState([])
  let sendmessagedata;
  const sendthis = async () => {
    const obj = {
      messageid: props.isopenmessage?.friendmessageid,
      message: sendmessagedata,
      vk: props.isopenmessage?.vk
    }
    console.log(obj);
    changeallmessage([...allmessage, JSON.stringify([props.isopenmessage.myid, sendmessagedata])]);
    console.log(props.isopenmessage.myid);
    await axios.patch('/massage', obj)
  }
  useEffect(async () => {
    setOpen(props.isopenmessage.open)
    if (props.isopenmessage.open == true) {
      const result = await axios.post('/prevmessage', { mid: props.isopenmessage?.friendmessageid });
      changemessagedata({ ...result.data.result })
      changeallmessage([...result.data.result.messages])
      console.log(messagedata);
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
                <strong>{(JSON.parse(val)[0] == JSON.parse(messagedata.friend1)[0]) ? 
                  JSON.parse(messagedata.friend1)[1] : JSON.parse(messagedata.friend2)[1]}</strong>
                <Typography>{JSON.parse(val)[1]}</Typography>
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
