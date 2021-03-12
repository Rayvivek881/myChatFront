import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import {GlobalContext} from '../Context/GlobalStroge'

export default function CreateGroup(props) {
  const [groupName, changegroupName] = React.useState('')
  const { ChangeuserData, userData } = React.useContext(GlobalContext)

  const handleClose = () => props.changenewGroup(false)

  const sendRequest = async () => {
      props.changenewGroup(false)
      const result = await axios.get(`/creategroup?groupName=${groupName}`, {}) 
      let obj = userData;
      obj.groups?.push(JSON.stringify(result.data.addit));
      ChangeuserData(obj);
  }

  return (
    <div>
      <Dialog open={props.newGroup} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">Create new Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group Name"
            onChange = {(e) => changegroupName(e.target.value)}
            style = {{width: '400px'}}
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={sendRequest} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
