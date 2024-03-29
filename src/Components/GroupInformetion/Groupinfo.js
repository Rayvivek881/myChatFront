import React, { useEffect } from 'react';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, MenuItem, FormControl, Select } from "@material-ui/core";
import { Button, Avatar, ListItemAvatar, ListItemText, ListItem, List, Divider, Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import img1 from '../images/default_profile.png'
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from '@material-ui/icons/Add';
import { red } from "@material-ui/core/colors";
import { useHistory, useParams, withRouter } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import InputLabel from '@material-ui/core/InputLabel';
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import axios from 'axios';
import { GlobalContext } from '../Context/GlobalStroge'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  papermain: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: '#3f51b5',
    height: '120vh'
  },
  paper: {
    color: theme.palette.text.secondary,
    height: '55vh',
  },
  input: {
    display: "none",
  },
  image: {
    borderRadius: '40px',
    maxheight: '45vh',
    maxWidth: '40vh'
  },
  paperpost: {
    marginTop: '15px',
    height: '83vh',
    overflow: 'scroll'
  },
  editButton: {
    marginTop: '8px',
    width: '350px'
  },
  media: {
    height: 56,
    paddingTop: "90%",
    maxwidth: '350px',
    maxHeight: '250px',
    alignItems: 'center'
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  root2: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  editButton1: {
    marginTop: '5px'
  },
  friendgrid: {
    overflow: 'scroll',
    height: '510px'
  },
  popuplist: {
    cursor: 'pointer'
  },
  chooose: {
    marginTop: '10px',
    width: '100%'
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '300px'
  },
}));

const initaialmassagedata = {
  fullname: '',
  friendmessageid: '',
  open: false
}

function Groupinfo(props) {
  const [age, setAge] = React.useState(0);
  const classes = useStyles();
  const { myid, friends, userData, ChangeuserData } = React.useContext(GlobalContext)
  const history = useHistory(), params = useParams();
  const id = params.id;
  const handleChange = (event) => setAge(event.target.value);
  const [groupdata, changegroupdata] = React.useState({});
  let groupedit = {
    image: groupdata.image,
    status: groupdata.status,
    groupName: groupdata.groupName,
    groupid: groupdata._id
  }
  const quitthisgroup = () => {
    const newuserData = userData;
    newuserData.groups.splice(newuserData.groups.indexOf(JSON.stringify([groupdata._id, groupdata.groupName])), 1);
    ChangeuserData(newuserData);
    axios.get(`https://desktop70app.herokuapp.com/quitgroup?groupid=${groupdata._id}&groupNmae=${groupdata.groupName}`, {})
    history.push('/');
  }
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const addthis = (arr) => {
    if (myid === JSON.parse(groupdata.Admin)[1]) {
      const obj = {
        friendid: arr[0],
        name: arr[1],
        groupid: groupdata._id,
        groupName: groupdata.groupName
      }
      console.log(obj);
      axios.put('https://desktop70app.herokuapp.com/addmember', obj);
    } else {
      axios.get(`https://desktop70app.herokuapp.com/addgroupreq?friendid=${arr[0]}&name=${arr[1]}&groupid=${groupdata._id}&groupName=${groupdata.groupName}&Adminid=${groupdata.Admin}`)
      alert('request sent');
    }
  }
  const handleClose = () => setOpen(false);


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
  const changeImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await ConverBase64(file);
    groupedit = { ...groupedit, image: base64 };
  }
  const editmyprofile = () => {
    changegroupdata({ ...groupdata, image: groupedit.image, status: groupedit.status, groupName: groupedit.groupName,});
    console.log(groupdata);
    axios.post('https://desktop70app.herokuapp.com/editgroup', groupedit);
    handleClose();
  }
  console.log(groupdata);
  const removethisfromFroup = (val, index) => {
    axios.get(`https://desktop70app.herokuapp.com/rmmember?groupid=${groupdata._id}&member=${val}`, {});
    console.log(index);
    var newgroupdata = groupdata;
    newgroupdata.members?.splice(index, 1);
    changegroupdata({ ...newgroupdata });
  }
  console.log('updateing........');
  useEffect(async () => {
    if (id != '') {
      console.log('taking1......');
      const result = await axios.get(`https://desktop70app.herokuapp.com/groupquery/${id}`, {});
      console.log('taking2......');
      console.log(result.data.result);
      changegroupdata({ ...result.data.result });
    }
  }, [id]);

  const allmember = (
    <List className={classes.root}>
      {groupdata.members?.map((val, index) => (
        <div key={JSON.parse(val)[0]}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="#" />
            </ListItemAvatar>
            <ListItemText
              primary={JSON.parse(val)[1]}
              secondary={
                <React.Fragment>
                  <Button
                    variant="contained"
                    onClick={() => removethisfromFroup(val, index)}
                    color="secondary">
                    Remove
                    </Button>
                  <Button
                    variant="contained"
                    style={{ marginLeft: '10px' }}
                    onClick={() => history.push(`/profile/${JSON.parse(val)[0]}`)}
                    color="primary">
                    profile
                    </Button>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>))}
    </List>
  );
  const addmember = (val, index) => {
    if (myid != JSON.parse(groupdata.Admin)[1]) {
      alert('you can not');
      return;
    }
    let newgroupdata = groupdata;
    newgroupdata.members?.push(val);
    newgroupdata.requests?.splice(index, 1);
    changegroupdata({ ...newgroupdata });
    let obj = {
      groupid: groupdata._id,
      friendid: JSON.parse(val)[0],
      name: JSON.parse(val)[1],
      groupName: groupdata.groupName
    }
    axios.put('https://desktop70app.herokuapp.com/addmember', obj);
  }

  const requests = (
    <List className={classes.root}>
      {groupdata.requests?.map((val, index) => (
        <div key={JSON.parse(val)[0]}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="#" />
            </ListItemAvatar>
            <ListItemText
              primary={JSON.parse(val)[1]}
              secondary={
                <React.Fragment>
                  <Button
                    variant="contained"
                    onClick={() => addmember(val, index)}
                    color="primary">
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    style={{ marginLeft: '10px' }}
                    onClick={() => history.push(`/profile/${JSON.parse(val)[0]}`)}
                    color="primary">
                    profile
                    </Button>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>))}
    </List>
  );
  const [remove, setremove] = React.useState({ val: allmember });
  useEffect(() => {
    if (age === 1) setremove({ val: requests });
    else setremove({ val: allmember });
  }, [age]);
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <div className={classes.papermain}>
            <Grid container spacing={0}>
              <Grid
                item xs={5}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                sm={5}>
                <img src={(groupdata.image === null) ? img1 : groupdata.image} alt='vivek kumaar ray' className={classes.image} />
                <Typography style={{ marginTop: '10px' }} >All your Friends</Typography>
                <Grid item xs={12} className={classes.friendgrid}>
                  <List className={classes.root2}>
                    {friends?.map((val, index) => (
                      <div key={JSON.parse(val)[0]}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <Avatar>{JSON.parse(val)[1]}</Avatar>
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={JSON.parse(val)[1]} secondary={
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                size='small'
                                startIcon={<AddIcon />}
                                onClick={() => addthis(JSON.parse(val))}
                                className={classes.editButton1}>
                                add
                            </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                size='small'
                                style={{ marginLeft: '5px' }}
                                className={classes.editButton1}>
                                profile
                            </Button>
                            </>
                          } />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>))}
                  </List>
                </Grid>
              </Grid>
              <Grid item xs={7} style={{ alignItems: 'center' }}>
                <Typography variant='h5' style={{ marginTop: '50px' }}>{groupdata.groupName}</Typography>
                <Typography variant='caption'>{groupdata.status}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px' }}
                  fullWidth
                  onClick={handleClickOpen}
                  startIcon={<EditIcon />}>
                  Edit group profile
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginTop: '10px' }}
                  fullWidth
                  onClick = {() => quitthisgroup()}
                  endIcon={<ExitToAppIcon />}>
                  quit group
                </Button>
                <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">group Information</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    onChange={handleChange}>
                    <MenuItem value={0}>All Group Members</MenuItem>
                    <MenuItem value={1}>Add Requests</MenuItem>
                  </Select>
                </FormControl>
                <Grid item xs={12} className={classes.paperpost}>
                  {remove.val}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogContent>
          <DialogContentText>change group name and status</DialogContentText>
          <TextField
            id="name"
            label="group Name"
            margin="dense"
            onChange={(e) => {
              groupedit = {
                ...groupedit,
                groupName: e.target.value
              }
            }}
            variant="outlined"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            variant="outlined"
            id="name"
            onChange={(e) => {
              groupedit = {
                ...groupedit,
                status: e.target.value
              }
            }}
            label="group status"
            type="text"
            fullWidth
          />
          <div>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              onChange={changeImage}
              multiple
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                endIcon={<PhotoCamera />}
                className={classes.chooose}
                component="span">
                Change profile
              </Button>
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editmyprofile} color="primary">
            save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter(Groupinfo)
