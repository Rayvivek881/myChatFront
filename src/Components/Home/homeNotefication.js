import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { GlobalContext } from '../Context/GlobalStroge'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function Notefications() {
  const { userData } = useContext(GlobalContext)
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {userData.notifications?.map((val, index) => (
      <>
      <ListItem alignItems="flex-start" key = {index} button >
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography>
                {JSON.parse(val)[1]}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </>
      ))}
    </List>
  );
}
