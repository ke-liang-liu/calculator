import React from 'react';
import { Button } from '@material-ui/core/';

const MyButton = (props) => {
  return (
    <Button
      size='large'
      variant='contained'
      id={props.id}
      value={props.value}
      onClick={() => { props.handleClick(props.value) }}
      fullWidth>
      {props.value}
    </Button>
  );
}

export default MyButton;

export const buttons = [
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
  { id: "equals", value: "=" },
  { id: "backspace", value: "<-" },
]