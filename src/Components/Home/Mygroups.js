import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import { withRouter, useHistory } from 'react-router-dom';
import GroupMessage from './GroupMessage'
import { GlobalContext } from '../Context/GlobalStroge'

const initaialmassagedata = {
  fullname: '',
  friendmessageid: '',
  open: false,
}

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

function MyGroups(props) {
  const classes = useStyles(), history = useHistory();
  const [isopenmessage, changeisopenmessage] = React.useState(initaialmassagedata);
  const {userData, myid, myname} = React.useContext(GlobalContext)

  const openMessagebox = (fullname, friendmessageid) => {
    changeisopenmessage({
      ...isopenmessage,
      open: true,
      fullname: fullname,
      friendmessageid: friendmessageid,
      myid: myid,
      myname: myname
    })
    console.log(isopenmessage);
  }

  const groupProfile = (id) => history.push(`/ginfo/${id}`);
  return (
    <>
      <List className={classes.root}>
        <ListItem button onClick={() => props.Changetemp1(0)}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="back to main menu" />
        </ListItem>
        {userData.groups?.map((val) => (
          <div key={JSON.parse(val)[0]}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={JSON.parse(val)[1][0]} src="#" />
              </ListItemAvatar>
              <ListItemText
                primary={JSON.parse(val)[1]}
                secondary={
                  <React.Fragment>
                    <Button
                      variant="contained"
                      onClick={() => openMessagebox(JSON.parse(val)[1], JSON.parse(val)[0])}
                      size='small'
                      color="primary">
                      message
                    </Button>
                    <Button
                      variant="contained"
                      size='small'
                      onClick={() => groupProfile(JSON.parse(val)[0])}
                      style={{ marginLeft: '10px' }}
                      color="secondary">
                      info
                    </Button>
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>))}
      </List>
      <GroupMessage changeisopenmessage={changeisopenmessage} isopenmessage={isopenmessage} />
    </>
  );
}

export default withRouter(MyGroups)