import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MyButton, { buttons } from './components/MyButton';
import useStyles from './components/styles';

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
    document.addEventListener('keydown', e => {
      e.stopImmediatePropagation();
      switch (e.keyCode) {
        case 27:  // Esc
        case 65:  // A
        case 67:  // C
          document.getElementById('clear').click();
          break;
        case 110:
        case 190:
          document.getElementById('decimal').click();
          break;
        case 48:
        case 96:
          document.getElementById('zero').click();
          break;
        case 49:
        case 97:
          document.getElementById('one').click();
          break;
        case 50:
        case 98:
          document.getElementById('two').click();
          break;
        case 51:
        case 99:
          document.getElementById('three').click();
          break;
        case 52:
        case 100:
          document.getElementById('four').click();
          break;
        case 53:
        case 101:
          document.getElementById('five').click();
          break;
        case 54:
        case 102:
          document.getElementById('six').click();
          break;
        case 55:
        case 103:
          document.getElementById('seven').click();
          break;
        case 56:
        case 104:
          document.getElementById('eight').click();
          break;
        case 57:
        case 105:
          document.getElementById('nine').click();
          break;
        case 13:
          document.getElementById('equals').click();
          break;
        case 107:
        case 187:
          document.getElementById('add').click();
          break;
        case 109:
        case 189:
          document.getElementById('subtract').click();
          break;
        // case 56:
        case 106:
          document.getElementById('multiply').click();
          break;
        case 111:
        case 191:
          document.getElementById('divide').click();
          break;
        case 8:
          document.getElementById('backspace').click();
          break;
        default:
      }
    });
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