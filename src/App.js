import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
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
  bulletboard: {
    gridArea: 'bulletboard',
    textAlign: 'right',
    backgroundColor: theme.palette.divider,
  },
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
    gridGap: theme.spacing(1),
    margin: 'auto',
    marginTop: theme.spacing(1),
    width: 'fit-content',
  },
  item: {
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
  },
}));

function Calculator() {
  const classes = useStyles();
  const [lastButton, setLastButton] = useState('0');
  const [currVal, setCurrVal] = useState(() => {
    const localData = localStorage.getItem('calculatorCurrValue');
    if (isNaN(localData) || localData === 'Infinity') {
      setLastButton('0');
      return '0';
    }
    return localData;
  });
  useEffect(() => {
    localStorage.setItem('calculatorCurrValue', currVal);
  }, [currVal]);
  const [prevVal, setPrevVal] = useState('0');
  const [currOperator, setCurrOperator] = useState('+');
  const [evaluated, setEvaluated] = useState(false);
  const [currSign, setCurrSign] = useState('+');

  const handleClick = (value) => {
    const evaluateResult = () => {
      const expression = `${prevVal} ${currOperator} (${currSign}${currVal})`;
      const tens = 1000000000000;
      // eslint-disable-next-line
      const answer = Math.round(tens * eval(expression)) / tens;
      setCurrVal(answer.toString());
      setPrevVal(answer.toString());
    }

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
        if (currVal.length === 16 && /\d/.test(lastButton)) { return; }
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
          evaluateResult();
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
        evaluateResult();
        setCurrOperator('+');
        setEvaluated(true);
        setCurrSign('+');
        break;
      }
      default:
    }
    setLastButton(value);
  }

  return (
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