import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';
import axios from 'axios'
import { GlobalContext } from '../Context/GlobalStroge'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Friendrequest() {
  const classes = useStyles();
  const {userData, ChangeuserData} = useContext(GlobalContext);
  console.log(userData, ChangeuserData);
  const accpetFriendReq = async (id, index, name) => {
    let temp = userData;
    temp.friendrequest.splice(index, 1);
    ChangeuserData(temp);
    await axios.put(`/friendacc?friendid=${id}&name=${name}`, {});
  }
  console.log('changing...........');
  const deleteFriendReq = async (id, index, name) => {
    let temp = userData;
    temp.friendrequest.splice(index, 1);
    ChangeuserData(temp);
    await axios.delete(`/friendreq?friendid=${id}&name=${name}`, {});
  }

  return (
    <List className={classes.root}>
      {userData.friendrequest?.map((val, index) => (
        <div key={JSON.parse(val)[0]}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={JSON.parse(val)[1]} src="#" />
            </ListItemAvatar>
            <ListItemText
              primary={JSON.parse(val)[1]}
              secondary={
                <React.Fragment>
                  i want to be your friend
                  <Button
                    variant='contained'
                    onClick = {(e) => accpetFriendReq(JSON.parse(val)[0], index, JSON.parse(val)[1])}
                    color='primary' >Accpet</Button>
                </React.Fragment>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" 
              onClick = {() => deleteFriendReq(JSON.parse(val)[0], index, JSON.parse(val)[1])}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
}
