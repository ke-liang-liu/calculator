import { makeStyles } from '@material-ui/core/styles';

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
  developer: {
    gridArea: 'developer',
    margin: 'auto',
    backgroundColor: 'white',
    width: '100%'
  },
  bulletboard: {
    gridArea: 'bulletboard',
    textAlign: 'right',
    backgroundColor: theme.palette.grey[300],
    padding: theme.spacing(0, 1),
  },
  equation: {
    margin: theme.spacing(1, 0),
    marginBottom: 0,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateAreas: `
      'bulletboard bulletboard bulletboard bulletboard'
      'clear clear backspace divide'
      'seven eight nine multiply'
      'four five six subtract'
      'one two three add'
      'zero zero decimal equals'
      'developer developer developer developer'`,
    gridGap: theme.spacing(1),
    margin: 'auto',
    paddingTop: theme.spacing(1),
    width: 'fit-content',
  },
  item: {
    color: theme.palette.text.secondary.dark,
    whiteSpace: 'nowrap',
  },
}));

export default useStyles;
