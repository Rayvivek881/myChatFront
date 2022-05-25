import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Button, TextField, IconButton, Typography, Dialog} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from 'axios';
import {GlobalContext} from '../Context/GlobalStroge'

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

export default function EditPosts(props) {
  const [newdata, changenewdata] = React.useState({Title: props.posteditdata.Title, 
                    data: props.posteditdata.data, image: props.posteditdata.image})
  const {allPosts, ChangePosts, myid} = React.useContext(GlobalContext)
  const handleClose = () =>  props.changeisopen(false);
  
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
    changenewdata({ ...newdata, [e.target.name]: base64 });
  }

  const savedata = () => {
    let obj = allPosts;
    obj[props.posteditdata.index] = {
      ...obj[props.posteditdata.index],
      ...newdata
    }
    ChangePosts(obj);
    axios.patch('https://desktop70app.herokuapp.com/editpost', {...newdata, postid: props.posteditdata._id});
  }

  console.log(props.posteditdata);
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.isopen}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Post
        </DialogTitle>
        <DialogContent dividers>
          <TextField
            variant='outlined'
            label='Post Title'
            defaultValue = {props.posteditdata.Title}
            onChange = {(e) => {
              changenewdata({...newdata, [e.target.name]: e.target.value})
            }}
            name='Title'
            helperText='edit if you want to change it'
            fullWidth />
          <TextField
            id="outlined-basic"
            label="Post Body"
            name = 'data'
            onChange = {(e) => {
              changenewdata({...newdata, [e.target.name]: e.target.value})
            }}
            fullWidth
            defaultValue = {props.posteditdata.data}
            multiline
            rows={7}
            color='#fcfcfb'
            helperText="What's in your mind about this post"
            variant="outlined" />
          <TextField
            variant='outlined'
            name='image'
            type = 'file'
            onChange = {(e) => selectImage(e)}
            helperText='edit if you want to change it'
            fullWidth />
        </DialogContent>
        <DialogActions>
        <Button
        variant="contained"
        color="primary"
        onClick = {handleClose}
        startIcon={<CancelIcon />}>
        cancel
      </Button>
        <Button
        variant="contained"
        onClick = {savedata}
        color="primary"
        startIcon={<SaveIcon />}>
        Save
      </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
