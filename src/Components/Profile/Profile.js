import React, { useContext, useEffect } from 'react';
import {Divider, List, ListItem, ListItemText, ListItemAvatar, Popover, ListItemIcon} from '@material-ui/core';
import {Grid, Button, Card, CardHeader, IconButton, Avatar, CardActions, CardContent, CardMedia, Typography} from '@material-ui/core';
import { withRouter, useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import {GlobalContext} from '../Context/GlobalStroge'
import clsx from "clsx";
import axios from 'axios';
import moment from 'moment'
import ProfileMSG from './ProfileMessage'
import EditPosts from '../Profile/EditPosts'
import SimpleBackdrop from '../Waiting/ProgressBar'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'scroll'
  },
  papermain: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: '90vh',
  },
  paper: {
    color: theme.palette.text.secondary,
    height: '55vh',
  },
  image: {
    borderRadius: '40px',
    height: '50vh',
  },
  paperpost: {
    marginTop: '15px',
    height: '90vh',
    overflow: 'scroll',
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
    height: '560px'
  },
  popuplist: {
    cursor: 'pointer'
  }
}));

const initaialmassagedata = {
  fullname: '',
  friendmessageid: '',
  open: false
}

function Profile(props) {
  const [progressbar, changeprogressbar] = React.useState(false);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [mydata, changemydata] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isopen, changeisopen] = React.useState(false);
  const [isopenmessage, changeisopenmessage] = React.useState(initaialmassagedata);
  const [posteditdata, changeposteditdata] = React.useState({});
  const params = useParams(), history = useHistory();
  const profileid = params.id;
  const {friends, myid, myname, userData, allPosts, ChangePosts, ChangeBoth} = useContext(GlobalContext);

  const searchmessageid = () => {
    for (let index = 0; index < friends?.length; index++) {
      if (JSON.parse(friends[index])[0] == mydata._id) {
        return JSON.parse(friends[index])[2];
      }
    }
    return null
  }

  const gotoMessagebox = () => {
    changeisopenmessage({ 
      ...isopenmessage, 
      open: true,
      fullname: mydata.fullname,
      friendmessageid: searchmessageid(),
      myid,
      myname
    })
  }

  const handleClick = (event, val, index) => {
    setAnchorEl(event.currentTarget);
    changeposteditdata({...val, index: index})
  };

  const deletethisPost = () => {
    setAnchorEl(null);
    let newposts = allPosts;
    newposts.splice(posteditdata.index, 1);
    let newUserData = userData;
    newUserData.posts.splice(newUserData.posts.indexOf(posteditdata._id), 1);
    ChangeBoth(newposts, newUserData);
    axios.patch(`/mypost?postid=${posteditdata._id}`, {});
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const poupdata = (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button onClick={() => changeisopen(true)}>
            <ListItemIcon className={classes.popuplist}>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit post" />
          </ListItem>
          <ListItem button onClick={() => deletethisPost()}>
            <ListItemIcon className={classes.popuplist}>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="delete post" />
          </ListItem>
        </List>
      </div>
    </Popover>
  );
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const sendToEditProfile = () => history.push('/editprofile');

  const even = (flage, index) => {
    var newPost = allPosts;
    if (!flage) newPost[index].likes.push(myid);
    else newPost[index].likes.splice(newPost[index].likes.indexOf(myid), 1);
    ChangePosts(newPost);
  }

  const likeThisPost = async (postid, flage, index) => {
    even(flage, index);
    if (!flage) {
      await axios.put(`/like?postid=${postid}`, {});
    } else {
      await axios.put(`/rmlike?postid=${postid}`, {});
    }
  }

  const sendFriendRequest = (e, id) => {
    axios.put(`/friendreq?friendid=${id}`, {});
    alert('request sent');
  }

  const gotomyfriendprofile = (id) => {
    history.push(`/profile/${id}`);
  }

  useEffect(async () => {
    changeprogressbar(true);
    if (profileid != '') {
      if (profileid == myid) changemydata({ ...userData })
       else {
        const result = await axios.get(`/mypost/${profileid}`, {});
        changemydata({ ...result.data.mydata });
      }
    }
    changeprogressbar(false);
  }, [profileid])
  console.log('profile page.........');
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
                <img src={mydata.image} alt='vivek kumaar ray' className={classes.image} />
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.editButton}
                  onClick={sendToEditProfile}
                  startIcon={<EditIcon />}>
                  Edit profile
                </Button>
                <Typography style={{ marginTop: '10px' }} >All Friends</Typography>
                <Grid item xs={12} className={classes.friendgrid}>
                  <List className={classes.root2}>
                    {mydata.friends?.map((val) => (
                      <div key={JSON.parse(val)[0]}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar>
                              <Avatar>{val}</Avatar>
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={JSON.parse(val)[1]} secondary={
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={(e) => sendFriendRequest(e, JSON.parse(val)[0])}
                                className={classes.editButton1}>
                                Add Friend
                            </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                style={{ marginLeft: '5px' }}
                                onClick={() => gotomyfriendprofile(JSON.parse(val)[0])}
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
                <Typography variant='h5' style={{ marginTop: '50px' }}>{mydata.fullname}</Typography>
                <Typography variant='caption'>{mydata.status}</Typography>
                <Grid container spacing={2} style={{ marginTop: '10px' }}>
                  <Grid item xs={4}>
                    <Typography style={{ color: 'green' }}>6</Typography>
                    <Typography variant='subtitle1'>Mutural friends</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography style={{ color: 'green' }}>{mydata.friends?.length}</Typography>
                    <Typography variant='subtitle1'>friends</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography style={{ color: 'green' }}>{mydata.posts?.length}</Typography>
                    <Typography variant='subtitle1'>Posts</Typography></Grid>
                </Grid>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '20px' }}
                  fullWidth
                  onClick={(e => sendFriendRequest(e, mydata._id))}
                  startIcon={<AddIcon />}>
                  Add friend
                </Button>
                <Button
                  variant="contained"
                  color="default"
                  style={{ marginTop: '10px' }}
                  fullWidth
                  onClick={gotoMessagebox}
                  endIcon={<SendIcon />}>
                  Send Message
                </Button>
                <Typography style={{ marginTop: '10px' }} >
                  All Posts of {mydata.fullname}</Typography>
                <Grid item xs={12} className={classes.paperpost}>
                  {allPosts.map((val, index) => (
                    (val.userid == mydata._id) ?
                    <Card key={val._id}>
                      <CardHeader
                        avatar={
                          <Avatar aria-label="recipe" className={classes.avatar}> R</Avatar>
                        }
                        action={
                          <IconButton aria-label="settings" onClick={(e) => handleClick(e, val, index)}>
                            <MoreVertIcon />
                          </IconButton>
                        }
                        title={val.Title}
                        subheader={moment(val.createdAt).fromNow()}
                      />
                      {poupdata}
                      <CardMedia
                        className={classes.media}
                        image={val.image}
                        title="Paella dish"
                      />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {val.data}
                        </Typography>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites"
                          onClick={() => { likeThisPost(val._id, (val.likes?.indexOf(myid) != -1), index) }}>
                          <FavoriteIcon color={(val.likes?.indexOf(myid) != -1) ? 'secondary' : 'primary'} />
                        </IconButton>
                        <IconButton aria-label="share">
                          <ShareIcon />
                        </IconButton>
                        <IconButton
                          className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded
                          })}
                          onClick={handleExpandClick}
                          aria-expanded={expanded}
                          aria-label="show more">
                          <ExpandMoreIcon />
                        </IconButton>
                      </CardActions>
                    </Card>: ''))}
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <ProfileMSG
        changeisopenmessage={changeisopenmessage}
        isopenmessage={isopenmessage} />
      <EditPosts
        isopen={isopen}
        posteditdata = {posteditdata}
        changeisopen={changeisopen} />
      <SimpleBackdrop progressbar = {progressbar} changeprogressbar = {changeprogressbar}/>
    </div>
  );
}

export default withRouter(Profile);