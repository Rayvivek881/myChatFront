import React, { useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import { red } from '@material-ui/core/colors';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { withRouter, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';
import axios from 'axios';
import { GlobalContext } from '../Context/GlobalStroge'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  typography: {
    padding: theme.spacing(2),
    overflow: 'hidden'
  },
  root1: {
    flexGrow: 1,
    width: '420px',
    height: '450px',
    margin: '0px'
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: '450px',
    width: '420px'
  },
  avatar: {
    backgroundColor: red[500],
  },
  pappermassage: {
    height: '330px',
    width: '420px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll'
  },
  pappertitle: {
    height: '50px',
    width: '420px'
  },
  papperinput: {
    height: '50px',
    width: '420px'
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    marginTop: '0px',
    height: '50px'
  },
  inputmassage: {
    flexGrow: 1
  },
  papap: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  Sendicon: {
    height: '30px',
    width: '30px'
  }
}));



function Friendlst() {
  const classes = useStyles(), history = useHistory();
  const {userData, myid} = useContext(GlobalContext)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [massagesName, ChangemassagesName] = React.useState('User')
  const [massageslocation, Changemassageslocation] = React.useState(null)
  const [pid, changepid] = React.useState('');
  const [messageobj, cmessageobj] = React.useState({});
  const [messagedata, cmessagedata] = React.useState([]);
  let sendthismessgge;

  console.log('Friendlst.........');
  console.log(myid);
  const handleClick = async (event, name, mid, tk) => {
    setAnchorEl(event.currentTarget);
    ChangemassagesName(name);
    Changemassageslocation(mid);
    const result = await axios.post('https://desktop70app.herokuapp.com/prevmessage', { mid: mid });
    cmessageobj({...result.data.result});
    cmessagedata([...result.data.result.messages])
    changepid(tk);
  };


  const mainMessageChange = (e) => sendthismessgge = e.target.value;
  const handleClose = () => setAnchorEl(null);
  const profileFriend = () =>  history.push(`/profile/${pid}`);
  
  console.log(messagedata);
  const sendMessage = async () => {
    const obj = {
      messageid: massageslocation,
      message: sendthismessgge
    }
    console.log(obj);
    cmessagedata([...messagedata, JSON.stringify([myid, sendthismessgge])])
    await axios.patch('https://desktop70app.herokuapp.com/massage', obj)
  }

  const open = Boolean(anchorEl);
  const id = open ? true : undefined;
  const popit = (
    <Popover
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
      <Typography className={classes.typography}>
        <div className={classes.root1}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <div className={classes.paper}>
                <Grid item xs={12}>
                  <div>
                    <div className={classes.demo}>
                      <List dense={true}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar
                              src='#' alt={massagesName}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={massagesName}
                          />
                          <Button
                            color='primary'
                            variant="contained" 
                            onClick = {(e) => profileFriend(e)}
                            style={{ marginRight: '5px' }}>Profile</Button>
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="delete" onClick={handleClose}>
                              <ClearIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                    </div>
                  </div>
                </Grid>
                <Grid >
                  <div className={classes.pappermassage}>
                    {messagedata?.map((val) => (
                      <div style = {{flexDirection: 'column', alignItems: 'flex-start'}}>
                      <strong>{(JSON.parse(val)[0] == JSON.parse(messageobj.friend1)[0]) ?
                      JSON.parse(messageobj.friend1)[1] : JSON.parse(messageobj.friend2)[1]
                      }</strong>
                      <p>{JSON.parse(val)[1]}</p>
                      </div>
                    ))}
                  </div>
                </Grid>
                <div className={classes.inputmassage}>
                  <Grid container spacing={0}>
                    <Grid item xs={9}>
                      <div className={classes.papap}>
                        <TextField
                          fullWidth
                          variant = 'outlined'
                          style = {{marginTop: '10px'}}
                          size = 'small'
                          label='Massage'
                          name='mainMessage'
                          onChange={mainMessageChange}
                        />
                      </div>
                    </Grid>
                    <Grid item xs={3}>
                      <div className={classes.papap} style={{ height: '47px' }}>
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ marginTop: '12px' }}
                          onClick={sendMessage}
                          endIcon={<SendIcon />}>send</Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </Typography>
    </Popover >
  );
  return (
    <List className={classes.root}>
      {userData.friends?.map((val) => (
        <div key={JSON.parse(val)[0]}>
          <ListItem
            alignItems="flex-start"
            name='1234568'
            onClick={(e) => handleClick(e, JSON.parse(val)[1], JSON.parse(val)[2], JSON.parse(val)[0])}>
            <ListItemAvatar>
              <Badge color="secondary" variant="dot">
                <Avatar alt={JSON.parse(val)[1]} src="#" />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={JSON.parse(val)[1]}
              secondary={
                <div style={{ color: 'green' }}>
                  {JSON.parse(val)[2]}
                </div>
              }
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete">
                <Badge color="secondary" badgeContent={5} />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant="fullWidth" component="li" />
        </div>))}
      {popit}
    </List>
  );
}

export default withRouter(Friendlst)