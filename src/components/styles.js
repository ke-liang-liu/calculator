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
  backspace: { gridArea: 'backspace' },
  memory: { gridArea: 'memory' },
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
    borderRadius: theme.shape.borderRadius,
  },
  equation: {
    margin: theme.spacing(1, 0),
    marginBottom: 0,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateAreas: `
      'bulletboard bulletboard bulletboard bulletboard'
      'clear memory memory backspace'
      'seven eight nine divide'
      'four five six multiply'
      'one two three subtract'
      'zero decimal equals add'
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
  historyDialog: {
    width: 'fit-content',
  }
}));

export default useStyles;
