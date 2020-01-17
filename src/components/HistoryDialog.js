import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles({
  listItem: {
    textAlign: 'right',
  },
});

export default function HistoryDialog(props) {
  const classes = useStyles();
  const { onClose, historyArr, open, onClearHistory } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = equation => {
    onClose(equation);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth='sm' scroll='body'>
      <DialogActions>
        <Button variant='contained' onClick={handleClose}>Cancel</Button>
        <Button variant='contained' onClick={onClearHistory}>Clear History</Button>
      </DialogActions>
      <List>
        {historyArr.map((equation, index) => (
          <ListItem divider className={classes.listItem} button onClick={() => handleListItemClick(equation)} key={index} >
            <ListItemText primary={equation} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

HistoryDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
