import React, { useState, useContext } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MessageIcon from '@material-ui/icons/Message';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Button, Avatar, Chip} from '@material-ui/core'
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withRouter, useHistory, Link } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import {GlobalContext} from '../Context/GlobalStroge'
import NewPost from '../Home/CreateNewPost';
import axios from 'axios';
import RightAlert from '../Waiting/RightAlert'

const useStyles = makeStyles((theme) => ({
  mybutton: {
    margin: '2px 2px 2px 2px',
    borderRadius: '15px',
    height: '40px'
  },
  root: {
    display: 'flex',
  },
  Chip: {
    width: '90px',
    height: '35px',
    marginTop: '7px'
  },
  grow: {
    flexGrow: 1,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function NavBar(props) {
  console.log('Navbar running...........');
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setopenMenu] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isSearchOpen = Boolean(openMenu);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [createpost, Changecreatepost] = useState(false);
  const [searchdata, Changesearchdata] = useState({matches: [], group: []});
  const {userData, ChangeuserData, ChangeTemp} = useContext(GlobalContext);
  const [snack, changesnack] = useState({ a: false, m: '', e: false })
  const history = useHistory();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const postPopUpOpen = () => {
    Changecreatepost(true);
  }

  const handleSearchMenuOpen = async (event) => {
    if (event.keyCode == 13) {
      setopenMenu(event.currentTarget);
      const result = await axios.post('/search', { search: event.target.value });
      Changesearchdata({matches: result.data.matches, group: result.data.group});
      console.log(searchdata);
    }
  };

  const sendtoProfile = () =>  history.push(`/profile/${userData?._id}`);

  const sendFriendRequest = (e, id ) => {
    changesnack({a: true, m: 'your friend request has sent', e: true})
    axios.put(`/friendreq?friendid=${id}`, {});
  }

  const ChangeleftMenu = (e, val) => {
    ChangeTemp(val);
    setAnchorEl(null);
  }
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleSearchMenuClose = () => {
    setopenMenu(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const tak = () => {
    console.log('clicked');
  }

  const SearchID = 'primary-search-account-menu1';
  const renderSearchMenu = (
    <Menu
      anchorEl={openMenu}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={SearchID}
      keepMounted
      style={{ marginTop: '40px' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isSearchOpen}
      onClose={handleSearchMenuClose}>
      <MenuItem >
        <p style={{ textAlign: 'center' }}> your Searches </p>
      </MenuItem>
      {searchdata.matches?.map((val) => (
        <MenuItem key={val._id} style={{justifyContent: 'space-between'}}>
          <div style ={{display: 'flex'}}>
          <Avatar alt={val.fullname} src="#" />
          <p style={{ marginLeft: '8px' }}> {val.fullname} </p>
          </div>
          <Button
            variant='contained'
            style={{ display: 'block' }}
            onClick={(e) => sendFriendRequest(e, val._id)}
            color='primary' >
            Add friend </Button>
        </MenuItem>
      ))}
      {searchdata.group?.map((val) => (
        <MenuItem key={val._id} style={{justifyContent: 'space-between'}}>
          <div style ={{display: 'flex'}}>
          <Avatar alt={val.groupName} src="#" />
          <p style={{ marginLeft: '8px' }}> {val.groupName} </p>
          </div>
          <Button
            variant='contained'
            style={{ display: 'block' }}
            color='primary' >
            Add request </Button>
        </MenuItem>
      ))}

    </Menu>
  );



  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={sendtoProfile}>Profile</MenuItem>
      <MenuItem onClick={postPopUpOpen}>Add New Posts</MenuItem>
      <MenuItem onClick={(e) => ChangeleftMenu(e, 0)}>Friends Requests</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Posts</MenuItem>
      <MenuItem onClick={(e) => ChangeleftMenu(e, 1)}>Friends</MenuItem>
      <MenuItem onClick={(e) => ChangeleftMenu(e, 2)}>Notefication</MenuItem>
      <MenuItem onClick={handleMenuClose}>My Groups</MenuItem>
      <MenuItem onClick={handleMenuClose}>Live Chats</MenuItem>
      <Link underline='none' to ='/signup'><MenuItem>Create an Account</MenuItem></Link>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MessageIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <p>Menu</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Log out </p>
      </MenuItem>
    </Menu>
  );
  const keyDown = (e) => {
    if (e.keyCode == 13) console.log('you preshed enter ' + e.target.value);
  }
  const GotoHome = () => { history.push('/'); }
  const changeUser = () => {
    if (userData?.fullname == undefined) props.history.push('/Login'); 
    else {
      axios.get('/logout', {});
      ChangeuserData({});
    }
  }
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={GotoHome}
            aria-label="open drawer"
          >
            <HomeIcon />
          </IconButton>
          <Typography
            className={classes.title}
            onClick={tak}
            variant="h6" noWrap>
            Vk Chats
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon onClick={() => { console.log('hello world') }} />
            </div>
            <InputBase
              placeholder="Search...."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onKeyDown={(e) => handleSearchMenuOpen(e)}
              inputProps={{ 'aria-label': 'search' }}
            />
            {renderSearchMenu}
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Chip
              onClick={sendtoProfile}
              avatar={<Avatar alt={(userData?.fullname != undefined) ? userData?.fullname : 'User'} src="#" />}
              label={(userData?.fullname != undefined) ? userData.fullname : 'User'}
              className={classes.Chip}
              variant="outlined"
              size="medium"
              color="secondary"
            />
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={userData?.newmessage != undefined ? userData?.newmessage : 0} color="secondary" onClick={(e) => ChangeleftMenu(e, 1)}>
                <MessageIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" onClick={(e) => ChangeleftMenu(e, 2)} color="inherit">
              <Badge badgeContent={15} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Button
              variant="outlined"
              size="small"
              className={classes.mybutton}
              style={{ marginLeft: '10px' }}
              onClick={changeUser}
              color="secondary">
              {(userData?.fullname != undefined) ? 'Logout' : 'Login'}
            </Button>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <NewPost createpost={createpost} Changecreatepost={Changecreatepost} />
    </div>
  );
}

export default withRouter(NavBar)