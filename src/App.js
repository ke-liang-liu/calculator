import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MyButton, { buttons } from './components/MyButton';
import useStyles from './components/styles';
import keyboardFunc from './components/keyboard';

function Calculator() {
  const classes = useStyles();
  const [lastButton, setLastButton] = useState('0');
  const [evaluated, setEvaluated] = useState(false);
  const [prevVal, setPrevVal] = useState('initZero');
  const [currVal, setCurrVal] = useState(() => {
    const localData = localStorage.getItem('calculatorCurrVal');
    if (localData === null || isNaN(localData) || localData === 'Infinity') {
      setLastButton('0');
      return '0';
    }
    setEvaluated(true);
    setLastButton('=');
    return localData;
  });

  const [equation, setEquation] = useState(() => {
    const localData = localStorage.getItem('calculatorEquation');
    if (localData === null || localData === 'null' || localData === 'Infinity') {
      return '0';
    }
    return localData;
  });

  useEffect(() => {
    localStorage.setItem('calculatorCurrVal', currVal);
  }, [currVal]);
  useEffect(() => {
    localStorage.setItem('calculatorEquation', equation);
  }, [equation]);
  const [currOperator, setCurrOperator] = useState('+');
  const [currSign, setCurrSign] = useState('+');
  const [bgColor, setBgColor] = useState('white');
  
  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', keyboardFunc);
  });

  const handleClick = (value) => {
    const evaluateResult = () => {
      if (prevVal === 'initZero') {
        setPrevVal(currVal);
        return;
      }
      const expression = `${prevVal} ${currOperator} (${currSign}${currVal})`;
      let equation;
      if (currSign === '+') {
        equation = `${prevVal} ${currOperator} ${currVal}`;
      } else {
        equation = `${prevVal} ${currOperator} ${currSign}${currVal}`;
      }
      const tens = 100000000000;
      // eslint-disable-next-line
      const answer = Math.round(tens * eval(expression)) / tens;
      setCurrVal(answer.toString());
      setPrevVal(answer.toString());
      setEquation(equation + ' = ' + answer.toString());
    }
    const doAC = () => {
      setPrevVal('initZero');
      setCurrVal('0');
      setEvaluated(false);
      setCurrOperator('+');
      setCurrSign('+');
    }
    switch (value) {
      case 'AC':
        doAC();
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
          || (currVal === '0') // (lastButton === '0' && currVal === '0') 
          || ['+', '-', '*', '/'].includes(lastButton)
        ) {
          setCurrVal(value);
        } else if (lastButton === '=') {
          doAC();
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
        } else if (prevVal === 'initZero') {
          setPrevVal(currVal);
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
        setPrevVal('initZero');
        evaluateResult();
        setCurrOperator('+');
        setEvaluated(true);
        setCurrSign('+');
        break;
      }
      case '<-':
        if (currVal === 'Infinity' || currVal === '-Infinity') {
          setCurrVal('0');
          return;
        }
        if (isNaN(currVal)) {
          setCurrVal('0');
          return;
        }
        if (currVal.length === 1) {
          setCurrVal('0');
          return;
        } else {
          const tmp = currVal.slice(0, currVal.length - 1);
          setCurrVal(tmp);
        }
        break;
      default:
    }
    setLastButton(value);
  }

  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: `${bgColor}` }}>
      <div className={classes.gridContainer}>
        <div className={[classes.item, classes.bulletboard].join(' ')}>
          <Typography className={classes.equation} variant='subtitle1'>
            {equation}
          </Typography>
          <Divider className={classes.divider} />
          <Typography id="display" variant="h4" value={currVal}>
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