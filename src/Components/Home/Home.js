import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Friendlst from '../Home/Friendlist';
import AllPosts from './HomePosts';
import { Typography, Grid } from '@material-ui/core';
import Friendrequest from './FriendRequests';
import Leftmenu from './HomeLeftMenu'
import MyGroups from './Mygroups'
import SimpleBackdrop from '../Waiting/ProgressBar'
import { GlobalContext } from '../Context/GlobalStroge'

const UseStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    scrollbarWidth: 'none'
  }, 
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    height: "90vh",
    overflow: 'scroll',
  },
  control: {
    padding: theme.spacing(2),
  },
  righttitle: {
    color: '#00b0ff',
  },
  Friends: {
    height: '100%',
    width: '100%'
  }
}));


function Home() {
  const [progressbar, changeprogressbar] = useState(false);
  const classes = UseStyles();
  const [temp1, Changetemp1] = useState(0);
  let tag = 'Friend Requests';
  const {myid, Temp} = useContext(GlobalContext)

  let renderleft;
  if (Temp == 0) {
    renderleft = ( <Friendrequest /> )
    tag = 'Friend Requests';
  } else if (Temp == 1) {
    renderleft = ( <Friendlst /> )
    tag = 'Friends';
  } else if (Temp == 2) {
    renderleft =  'there is no Notefications';
    tag = 'Notefications';
  }
  if (!myid) {

  }
  console.log('home......');

  return (
    <>
    <Grid container className={classes.root} spacing={0}>
      <Grid item xs={3}>
        <div className={classes.paper}>
          {temp1 == 0 ?  <Leftmenu  Changetemp1={Changetemp1} /> : <MyGroups Changetemp1 = {Changetemp1} />}
        </div>
      </Grid>
      <Grid item xs={6}> <div className={classes.paper}> <AllPosts /> </div> </Grid>
      <Grid item xs={3}>
        <div className={classes.paper}>
          <Grid spacing = {3} >
            <Grid xs = {12}>
              <div className= {classes.righttitle}> <Typography> {tag} </Typography> </div>
            </Grid>
            <Grid xs = {12} style= {{marginTop: '2px'}}>
              <div className= {classes.Friends}> {renderleft} </div>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
    <SimpleBackdrop progressbar = {progressbar} changeprogressbar = {changeprogressbar}/>
    </>
  )
}

export default Home
