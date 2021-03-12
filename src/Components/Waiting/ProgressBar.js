import React, { useEffect } from 'react';
import {Backdrop, CircularProgress} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleBackdrop(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  useEffect(()=> {
    setOpen(props.progressbar);
  }, [props.progressbar])
  console.log();
  return (
    <div>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  );
}
