import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PeopleIcon from '@material-ui/icons/People';
import GroupIcon from '@material-ui/icons/Group';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import ChatIcon from '@material-ui/icons/Chat';
import CloudIcon from '@material-ui/icons/Cloud';
import CreateGroup from '../Home/CreateNewGroup'
import {GlobalContext} from '../Context/GlobalStroge'
import { withRouter, useHistory } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function Leftmenu(props) {
  const classes = useStyles();
  const history = useHistory();
  const [newGroup, changenewGroup] = React.useState(false)
  const {ChangeTemp, myid} = useContext(GlobalContext)
  const newGroup1 = () => {
    changenewGroup(true);
    console.log('creating.......');
  }

  return (
    <>
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick = {() => history.push(`/profile/${myid}`)}>
        <ListItemIcon>
          <Avatar alt="Vivek" src="#" />
        </ListItemIcon>
        <ListItemText primary="Vivek kumar ray" />
      </ListItem>
      <ListItem button onClick = {() => ChangeTemp(1)}>
        <ListItemIcon>
          <PeopleIcon fontSize = 'large' />
        </ListItemIcon>
        <ListItemText primary="Friends" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FavoriteIcon fontSize = 'large' />
        </ListItemIcon>
        <ListItemText primary="Liked Posts" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AllInboxIcon fontSize = 'large' />
        </ListItemIcon>
        <ListItemText primary="All Posts" />
      </ListItem>
      <ListItem button onClick = {() => props.Changetemp1(1)}>
        <ListItemIcon>
          <GroupIcon fontSize = 'large'/>
        </ListItemIcon>
        <ListItemText primary="Groups" />
      </ListItem>
      <ListItem button onClick = {newGroup1}>
        <ListItemIcon>
          <GroupIcon fontSize = 'large'/>
        </ListItemIcon>
        <ListItemText primary="Create new group" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ChatIcon fontSize = 'large'/>
        </ListItemIcon>
        <ListItemText primary="Live Chat" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <CloudIcon fontSize = 'large'/>
        </ListItemIcon>
        <ListItemText primary="Weather" />
      </ListItem>
    </List>
    <CreateGroup newGroup = {newGroup} changenewGroup = {changenewGroup}/>
    </>
  );
}
