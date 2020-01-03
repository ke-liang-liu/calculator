import React, { useState } from 'react';
import { Grid, Typography, Button } from '@material-ui/core/';
import './App.css';






function App() {
  // const [display, setDisplay] = useState('');

  return (
    <Grid container>
      <Grid item id="display" xs={12}>
        <Typography variant="h3" align='center' gutterBottom>
          Hello World
        </Typography>
      </Grid>
      {buttons.map(button => (
        <Grid item>
          <MyButton id={button.id} value={button.value} />
        </Grid>
      )
      )}
    </Grid>
  );
}

export default App;

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

const MyButton = (props) => {
  return (
    <Button
      // style={{ height: 90 }}
      variant='contained'
      id={props.id}
      value={props.value}
      fullWidth>
      {props.value}
    </Button>
  );
}