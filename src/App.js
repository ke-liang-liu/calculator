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
  developer: { gridArea: 'developer', margin: 'auto' },

  gridContainer: {
    display: 'grid',
    gridTemplateAreas: `
      'bulletboard bulletboard bulletboard bulletboard'
      'clear clear equals equals'
      'seven eight nine add'
      'four five six subtract'
      'one two three multiply'
      'zero zero decimal divide'
      'developer developer developer developer'`,
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
  const [currVal, setCurrVal] = useState('0');
  const [prevVal, setPrevVal] = useState('0');
  const [currOperator, setCurrOperator] = useState('+');
  const [evaluated, setEvaluated] = useState(false);
  const [lastButton, setLastButton] = useState('0');
  const [currSign, setCurrSign] = useState('+');

  const handleClick = (value) => {
    switch (value) {
      case 'AC':
        setCurrVal('0');
        setPrevVal('0');
        setEvaluated(false);
        setCurrOperator('+');
        setCurrSign('+');
        break;
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9': {
        setEvaluated(false);
        if (
          lastButton === 'AC'
          || (lastButton === '0' && currVal === '0')
          || (lastButton === '=')
          || ['+', '-', '*', '/'].includes(lastButton)
        ) {
          setCurrVal(value);
        } else {
          setCurrVal(currVal + value);
        }
        break;
      }
      case '.': {
        if (evaluated) {
          setCurrVal('0.');
          value = '0.';
        } else if (!currVal.includes('.')) {
          setCurrVal(currVal + '.');
        }
        break;
      }
      case '-':
      case '+':
      case '*':
      case '/':
        if (/\d/.test(lastButton)) {
          const expression = `${prevVal} ${currOperator} (${currSign}${currVal})`;
          // eslint-disable-next-line
          const answer = Math.round(10000000000000 * eval(expression)) / 10000000000000;
          setPrevVal(answer.toString());
          setCurrVal(answer.toString());
          setCurrOperator(value);
        } else if (value === '-' && ['+', '-', '*', '/'].includes(lastButton)) {
          setCurrSign('-');
        } else if (['+', '*', '/'].includes(value) && lastButton === '-') {
          setCurrSign('+');
          setCurrOperator(value);
        } else {
          setCurrOperator(value);
        }
        break;
      case '=': {
        if (lastButton === '=') {
          return;
        }
        const expression = `${prevVal} ${currOperator} (${currSign}${currVal})`;
        // eslint-disable-next-line
        const answer = Math.round(10000000000000 * eval(expression)) / 10000000000000;
        setCurrVal(answer.toString());
        setPrevVal(answer.toString());
        setEvaluated(true);
        setCurrOperator('+');
        setCurrSign('+');
        break;
      }
      default:
    }
    setLastButton(value);
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
        <div className={[classes.item, classes.developer].join(' ')}>
          <Typography variant="body2" align='center' value={currVal}>
            Designed and Coded By Keliang Liu
          </Typography>
        </div>
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