import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

export default function HistoryDialog(props) {
  const { onClose, history, open, onClearHistory } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = equation => {
    onClose(equation);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth='xs' fullWidth scroll='paper'>
      <DialogActions style={{ justifyContent: 'space-around', marginTop: 8 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={handleClose}>&nbsp;&nbsp;</Button>
        <Button startIcon={<DeleteOutlineIcon />} endIcon={history.length ? history.length : ''} onClick={onClearHistory}>Clear History</Button>
      </DialogActions>
      <DialogContent>
        {history.length ? (
          <List>
            {history.map((equation, index) => (
              <ListItem divider button onClick={() => handleListItemClick(equation)} key={index} >
                <ListItemText primary={equation} />
              </ListItem>
            ))}
          </List>
        ) : (
            <p style={{ textAlign: 'center' }}>Your calculation history appears here so that you can reuse the results</p>
          )}
      </DialogContent>
    </Dialog>
  );
}

HistoryDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
