import React, { useEffect } from 'react';
import {TextField, Dialog, DialogActions, DialogContent, DialogContentText, MenuItem, FormControl, Select} from "@material-ui/core";
import {Button, Avatar, ListItemAvatar, ListItemText, ListItem, List, Divider, Typography, Grid} from "@material-ui/core";
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
    maxheight: '50vh',
    maxWidth: '45vh'
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
  const {myid, friends} = React.useContext(GlobalContext)
  const history = useHistory(), params = useParams();
  const id = params.id;
  const handleChange = (event) =>  setAge(event.target.value);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [groupdata, changegroupdata] = React.useState({});
  const addthis = (arr) => {
    if (myid == JSON.parse(groupdata.Admin)[1]) {
      const obj = {
        friendid: arr[0],
        name: arr[1],
        groupid : groupdata._id,
        groupName : groupdata.groupName
      }
      console.log(obj);
      axios.put('/addmember', obj);
    } else {
      axios.get(`/addgroupreq?friendid=${arr[0]}&name=${arr[1]}&groupid=${groupdata._id}&groupName=${groupdata.groupName}`)
      alert('request sent');  
    }
  }
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(async () => {
    if (id != '') {
        console.log('taking1......');
        const result = await axios.get(`/groupquery/${id}`, {});
        console.log('taking2......');
        console.log(result.data.result);
        changegroupdata({...result.data.result});
    }
  }, [id]);

  const allmember = (
    <List className={classes.root}>
      {groupdata.members?.map((val, index) => (
        <div key = {JSON.parse(val)[0]}>
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
                    color="secondary">
                    Remove
                    </Button>
                  <Button
                    variant="contained"
                    style={{ marginLeft: '10px' }}
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
  const requests = (
    <List className={classes.root}>
      {groupdata.requests?.map((val, index) => (
        <div key = {JSON.parse(val)[0]}>
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
                    color="primary">
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    style={{ marginLeft: '10px' }}
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
    if (age == 1) setremove({ val: requests });
    else setremove({ val: allmember });
  }, [age])
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
                <img src={(groupdata.image == null) ? img1: groupdata.image} alt='vivek kumaar ray' className={classes.image} />
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
                                onClick = {() => addthis(JSON.parse(val))}
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
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <DialogContentText>change group name and status</DialogContentText>
          <TextField
            id="name"
            label="group Name"
            margin="dense"
            variant="outlined"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            variant="outlined"
            id="name"
            label="group status"
            type="text"
            fullWidth
          />
          <div>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
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
          <Button onClick={handleClose} color="primary">
            save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter(Groupinfo)
