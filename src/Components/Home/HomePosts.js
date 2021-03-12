import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import moment from 'moment'
import { GlobalContext } from '../Context/GlobalStroge'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    maxHeight: '100%'
  },
  media: {
    maxheight: '100%',
    paddingTop: '150%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function AllPosts() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { allPosts, ChangePosts, myid} = useContext(GlobalContext);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const even = (flage, index) => {
    var newPost = allPosts;
    console.log(myid);
    if(!flage) {
      newPost[index].likes.push(myid);
      ChangePosts(newPost);
    } else {
      newPost[index].likes.splice(newPost[index].likes.indexOf(myid), 1);
      ChangePosts(newPost);
    }
  }
  console.log('homepost.........');
  const likeThisPost = async (postid, flage, index)=> {
    even(flage, index);
    if(!flage) {
      await axios.put(`/like?postid=${postid}`, {});
    } else {
      await axios.put(`/rmlike?postid=${postid}`, {});
    }
  }
  return (
    <Grid container spacing={1} >
      {allPosts?.map((val, index) => (
      <Grid item xs={12} key= {val.username}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                <img src = {val.image} />
          </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={val.Title}
            subheader={moment(val.createdAt).fromNow()}
          />
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
            <IconButton aria-label="add to favorites" onClick = {() => 
              likeThisPost(val._id, (val.likes.indexOf(myid) != -1), index)}>
              <FavoriteIcon color = {(val.likes.indexOf(myid) != -1) ? 'secondary': 'primary'}/>
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid> ))}
    </Grid>
  );
}
