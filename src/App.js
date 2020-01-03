import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  bulletboard: { gridArea: 'bulletboard', textAlign: 'right', backgroundColor: '#e0e0e0' },
  zero: { gridArea: 'zero' },
  one: { gridArea: 'one' },
  two: { gridArea: 'two' },
  three: { gridArea: 'three' },
  four: { gridArea: 'four' },
  five: { gridArea: 'five' },
  six: { gridArea: 'six' },
  seven: { gridArea: 'seven' },
  eight: { gridArea: 'eight' },
  nine: { gridArea: 'nine' },
  add: { gridArea: 'add' },
  subtract: { gridArea: 'subtract' },
  multiply: { gridArea: 'multiply' },
  divide: { gridArea: 'divide' },
  clear: { gridArea: 'clear' },
  decimal: { gridArea: 'decimal' },
  equals: { gridArea: 'equals' },

  gridContainer: {
    display: 'grid',
    gridTemplateAreas: `
      'bulletboard bulletboard bulletboard bulletboard'
      'clear clear equals equals'
      'seven eight nine divide'
      'four five six multiply'
      'one two three subtract'
      'zero zero decimal add'`,
    gridGap: theme.spacing(0.5),
    margin: 'auto',
    width: 268,
  },
  item: {
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

function Calculator() {
  const classes = useStyles();
  const [currVal, setCurrVal] = useState(String.fromCharCode(48));


  const handleClick = (value) => {
    setCurrVal(value);
  }

  return (
    <Container maxWidth='sm'>
      <div className={classes.gridContainer}>

        <div className={[classes.item, classes.bulletboard].join(' ')} id="display">
          <Typography variant="h4" align='right' value={currVal}>
            {currVal}
          </Typography>
        </div>
        {buttons.map(button => (
          <div className={[classes.item, classes[button.id]].join(' ')} key={button.id}>
            <MyButton id={button.id} value={button.value} handleClick={handleClick} />
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Calculator;

const MyButton = (props) => {
  return (
    <Button
      style={{ height: 'inherit' }}
      variant='contained'
      id={props.id}
      value={props.value}
      onClick={() => { props.handleClick(props.value) }}
      fullWidth>
      {props.value}
    </Button>
  );
}

const buttons = [
  { id: "zero", value: "0" },
  { id: "one", value: "1" },
  { id: "two", value: "2" },
  { id: "three", value: "3" },
  { id: "four", value: "4" },
  { id: "five", value: "5" },
  { id: "six", value: "6" },
  { id: "seven", value: "7" },
  { id: "eight", value: "8" },
  { id: "nine", value: "9" },
  { id: "add", value: "+" },
  { id: "subtract", value: "-" },
  { id: "multiply", value: "*" },
  { id: "divide", value: "/" },
  { id: "clear", value: "AC" },
  { id: "decimal", value: "." },
  { id: "equals", value: "=" }]