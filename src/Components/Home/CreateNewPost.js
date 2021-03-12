import React, { useContext, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import { GlobalContext } from '../Context/GlobalStroge'
import axios from 'axios';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const UseStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '550px',
    height: '430px'
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: '400px'
  },
  control: {
    padding: theme.spacing(2),
  },
  righttitle: {
    color: '#00b0ff',
    marginTop: '10px',
    height: '200px'
  },
  file: {
    color: '#00b0ff', 
    marginTop: '10px',
    height: '200px'
  },
  Friends: {
    height: '100%',
    width: '100%',
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

let initialpost = {
  image: '',
  Title: '',
  data: '',
}

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

export default function NewPost(props) {
  const classes = UseStyles();
  const {allPosts, userData, myname, ChangeBoth} = useContext(GlobalContext)
  const [postdata, Changepostdata] = React.useState(initialpost);
  const handlePostDataChange = (e) => Changepostdata({ ...postdata, [e.target.name]: e.target.value });
  

  const selectImage = async(e) => {
    const file = e.target.files[0];
    const base64 = await ConverBase64(file);
    Changepostdata({ ...postdata, [e.target.name]: base64 });
  }

  const handleClose = () =>  props.Changecreatepost(false)

  const sendPost = async () => {
    handleClose();
    const obj = {
      ...postdata,
      name: myname
    }
    const result = await axios.post('/createpost', obj);
    let obj1 = allPosts;
    obj1.unshift(result.data.newpost)
    let obj2 = userData;
    obj2.posts?.push(result.data.newpost._id);
    ChangeBoth(obj1, obj2);
    console.log(result.data);
  }

  const ConverBase64 = (file) => {
    return new Promise ((resolve, reject) => {
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

  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.createpost}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create New Posts
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.root}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Post Tilte"
                      onChange = {handlePostDataChange}
                      fullWidth
                      name = 'Title'
                      color='#fcfcfb'
                      helperText="this will become title your posts"
                      variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      className={classes.righttitle}
                      label="Post Body"
                      fullWidth
                      name = 'data'
                      onChange = {handlePostDataChange}
                      multiline
                      rows={7}
                      color='#fcfcfb'
                      helperText="What's in your mind about this post"
                      variant="outlined" />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      className={classes.file}
                      fullWidth
                      onChange = {(e) => selectImage(e)}
                      name = 'image'
                      type="file"
                      helperText="Choose an image to post from your Account"
                      variant="outlined" />
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" onClick={sendPost} color="primary">
            Post
          </Button>
          <Button autoFocus variant="contained" onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
