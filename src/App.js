import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MyButton, { buttons } from './components/MyButton';
import useStyles from './components/styles';

function Calculator() {
  const classes = useStyles();

  const [lastButton, setLastButton] = useState('0');
  const [currVal, setCurrVal] = useState(() => {
    const localData = localStorage.getItem('calculatorCurrVal');
    if (isNaN(localData) || localData === 'Infinity' || localData === null) {
      setLastButton('0');
      return '0';
    }
    return localData;
  });

  const [equation, setEquation] = useState(() => {
    const localData = localStorage.getItem('calculatorEquation');
    return localData;
  });

  useEffect(() => {
    localStorage.setItem('calculatorCurrVal', currVal);
  }, [currVal]);
  useEffect(() => {
    localStorage.setItem('calculatorEquation', equation);
  }, [equation]);
  const [prevVal, setPrevVal] = useState('0');
  const [currOperator, setCurrOperator] = useState('+');
  const [evaluated, setEvaluated] = useState(false);
  const [currSign, setCurrSign] = useState('+');
  const [bgColor, setBgColor] = useState('white');

  const handleClick = (value) => {

    const evaluateResult = () => {
      const expression = `${prevVal} ${currOperator} (${currSign}${currVal})`;
      let equation;
      if (currSign === '+' && prevVal === '0') {
        equation = `${currOperator} ${currVal}`;
      } else if (currSign === '+' && prevVal !== '0') {
        equation = `${prevVal} ${currOperator} ${currVal}`;
      } else {
        equation = expression;
      }
      const tens = 1000000000000;
      // eslint-disable-next-line
      const answer = Math.round(tens * eval(expression)) / tens;
      setCurrVal(answer.toString());
      setPrevVal(answer.toString());
      setEquation(equation + ' = ' + answer.toString());
    }

    switch (value) {
      case 'AC':
        setCurrVal('0');  //zero is 48, space is 32 or 160
        setPrevVal('0');
        setEvaluated(false);
        setCurrOperator('+');
        setCurrSign('+');
        setEquation('0');
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
    <div style={{ width: '100%', height: '100vh', backgroundColor: `${bgColor}` }}>
      <div className={classes.gridContainer}>
        <div className={[classes.item, classes.bulletboard].join(' ')}>
          <Typography variant='subtitle1'>
            {equation}
          </Typography>
          <Divider className={classes.divider} />
          <Typography id="display" variant="h4" align='right' value={currVal}>
            {currVal}
          </Typography>
        </div>
        {buttons.map(button => (
          <div className={[classes.item, classes[button.id]].join(' ')} key={button.id}>
            <MyButton id={button.id} value={button.value} handleClick={handleClick} />
          </div>
        ))}
        <div className={[classes.item, classes.developer].join(' ')}>
          <Typography
            variant="body2"
            align='center'
            value={currVal}
            onClick={() => {
              if (bgColor === 'white') {
                setBgColor('black')
              } else {
                setBgColor('white')
              }
            }}>
            Designed and Coded By Keliang Liu
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Calculator;