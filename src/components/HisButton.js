import React from 'react';
import { Button } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  thisButton: {
    // color: theme.palette.grey[700],
    justifyContent: 'flex-end',
    padding: theme.spacing(1, 0.5),
  }
}));

const HisButton = (props) => {
  const classes = useStyles();
  return (
    <Button
      variant='contained'
      className={classes.thisButton}
      // onClick={}
      fullWidth>
      198327098
    </Button>
  );
}

export default HisButton;