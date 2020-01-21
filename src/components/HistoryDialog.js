import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles({
  listItem: {
    textAlign: 'right',
  },
});

export default function HistoryDialog(props) {
  const classes = useStyles();
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
        <Button startIcon={<DeleteOutlineIcon />} onClick={onClearHistory}>Clear History</Button>
        <Button startIcon={<CancelOutlinedIcon />} onClick={handleClose}>&nbsp;Cancel&nbsp;</Button>
      </DialogActions>
      <DialogContent>
        {history.length ? (
          <List>
            {history.map((equation, index) => (
              <ListItem divider className={classes.listItem} button onClick={() => handleListItemClick(equation)} key={index} >
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
