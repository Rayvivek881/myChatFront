import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {withRouter, useHistory, useParams} from 'react-router-dom'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import {GlobalContext} from '../Context/GlobalStroge'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  papermain: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100vh'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '40vh'
  },
  image: {
    borderRadius: '30px',
    height: '40vh',
  },
  editButton: {
    width: '250px',
    marginTop: '5px'
  },
  chooose: {
    marginTop: '10px',
    width: '300px'
  },
  root1: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
}));
 function EditProfile(props) {
  const classes = useStyles();
  console.log('In Profile editing........');
  const {userData, ChangeuserData, myid} = React.useContext(GlobalContext);
  const [updateForm, changeupdateForm] = React.useState({
    image: userData.image,
    fullname: userData.fullname,
    status: userData.status
  });
  const history = useHistory(), params = useParams();

  const BackToProfile = () => history.push(`/profile/${params.id}`);

  const changedata = (e) => changeupdateForm({...updateForm, [e.target.name]: e.target.value})
  
  const changeImage = async(e) => {
    const file = e.target.files[0];
    const base64 = await ConverBase64(file);
    changeupdateForm({ ...updateForm, [e.target.name]: base64 });
  }

  const sumbitthisdata = () => {
      console.log(updateForm);
      ChangeuserData({
          ...userData,
          ...updateForm
        });
    history.push(`/profile/${myid}`)
    axios.put('https://desktop70app.herokuapp.com/editprofile', updateForm);
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
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8} >
          <div className={classes.papermain}>
            <Grid container spacing={0}>
              <Grid item xs={4}>
                <div className={classes.paper}>
                  <img src={(updateForm.image)} alt='vivek kumaar ray' className={classes.image} />
                  <div className={classes.chooose}>
                    <input type="file" name = 'image' onChange= {changeImage} id="actual-btn" style={{ marginTop: '10px' }} hidden />
                    <label id='fuck' for="actual-btn">Choose your profile picture</label>
                  </div>
                </div>
              </Grid>
              <Grid item xs={8}>
                <div className={classes.paper}>
                  <form className={classes.root1} noValidate autoComplete="off">
                    <TextField
                      label="Username"
                      id="outlined-size-normal"
                      fullWidth
                      name='username'
                      dvalue = {userData.username}
                      variant="outlined"
                      disabled
                      helperText='you can not Change this'
                    />
                    <TextField
                      label="your fullname"
                      id="outlined-size-normal1"
                      fullWidth
                      onChange = {changedata}
                      name='fullname'
                      value = {updateForm.fullname}
                      variant="outlined"
                      helperText='Change this if you want to update your fullname'/>
                    <TextField
                      label="your Status"
                      id="outlined-size-normal2"
                      onChange = {changedata}
                      fullWidth
                      value = {updateForm.status}
                      name='status'
                      variant="outlined"
                      helperText='Change this if you want to update your status'/>
                    <div style = {{marginTop: '10px'}}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        onClick = {sumbitthisdata}
                        startIcon={<SaveIcon />}>
                        update profile
                    </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick = {BackToProfile}
                        size="large"
                        style={{ marginLeft: '30px' }}
                        startIcon={<ExitToAppIcon />}>
                        Back to Profile
                    </Button>
                    </div>
                  </form>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}
export default withRouter(EditProfile);