import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import BackspaceIcon from '@material-ui/icons/Backspace';
import MyButton, { buttons } from './components/MyButton';
import HistoryDialog from './components/HistoryDialog';
import useStyles from './components/styles';
import keyboardFunc from './components/keyboard';

function Calculator() {
  const HISTORY_LEN = 50;
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
  useEffect(() => {
    localStorage.setItem('calculatorCurrVal', currVal);
  }, [currVal]);
  const [currOperator, setCurrOperator] = useState('+');
  const [currSign, setCurrSign] = useState('+');
  const [bgColor, setBgColor] = useState('white');
  const [history, setHistory] = useState(() => {
    const localData = localStorage.getItem('calculatorHistory');
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
  }, [history]);
  const [open, setOpen] = useState(false);

  document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', keyboardFunc);
  });
  const doAC = () => {
    setPrevVal('initZero');
    setCurrVal('0');
    setEvaluated(false);
    setCurrOperator('+');
    setCurrSign('+');
  }
  const handleClick = (value) => {
    const evaluateResult = () => {
      if (prevVal === 'initZero') {
        setPrevVal(currVal);
        return;
      }
      const expression = `${prevVal} ${currOperator} (${currSign}${currVal})`;
      let _equation;
      if (currSign === '+') {
        _equation = `${prevVal} ${currOperator} ${currVal}`;
      } else {
        _equation = `${prevVal} ${currOperator} ${currSign}${currVal}`;
      }
      const tens = 100000000000;
      // eslint-disable-next-line
      let answer = Math.round(tens * eval(expression)) / tens;
      answer = answer.toString();
      setCurrVal(answer);
      setPrevVal(answer);
      _equation += ' = ' + answer;
      saveHistory(_equation);
    }

    switch (value) {
      case 'AC':
        doAC();
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
        if (currVal.length === 15 && /\d/.test(lastButton)) { return; }
        if (
          lastButton === 'AC'
          || (currVal === '0' && lastButton !== '=') // fix a bug when result is zero
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
        if ('<-' === lastButton || 'MR' === lastButton) {
          setPrevVal(currVal);
          setCurrOperator(value);
        } else if (/\d/.test(lastButton)) {
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

  const handleClickOpen = () => {
    setOpen(true);
    setLastButton('MR');
  };

  const handleClearHistory = () => {
    setHistory([]);
    setOpen(false);
    doAC();
  }
  const handleClose = equation => {
    setOpen(false);
    if (!equation) { return; }
    saveHistory(equation);
    const _currVal = equation.split('=')[1].trim();
    setCurrVal(_currVal);
  };
  const saveHistory = (equation) => {
    if (history.length >= HISTORY_LEN) {
      let tmpArr = [equation, ...history];
      tmpArr.pop();
      setHistory(tmpArr);
    } else {
      setHistory([equation, ...history]);
    }
  }
  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: `${bgColor}` }}>
      <div className={classes.gridContainer}>
        <div className={[classes.item, classes.bulletboard].join(' ')}>
          <Typography className={classes.equation} variant='subtitle1'>
            {history.length > 0 ? history[0] : '0'}
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

        <div className={[classes.item, classes.backspace].join(' ')} >
          <Button size='large' variant='contained' id='backspace' onClick={() => handleClick('<-')} fullWidth style={{ height: 42 }}>
            <BackspaceIcon fontSize='small' />
          </Button>
        </div>
        <div className={[classes.item, classes.memory].join(' ')} >
          <Button id='hisButton' size='large' variant="contained" onClick={handleClickOpen} fullWidth>
            MR
          </Button>
        </div>
        <HistoryDialog className={classes.historyDialog}
          open={open}
          onClose={handleClose}
          onClearHistory={handleClearHistory}
          history={history}
        />
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