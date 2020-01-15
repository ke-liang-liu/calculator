export default function keyboardFunc(e) {
  e.stopImmediatePropagation();
  console.log(e.keyCode);
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
    case 104:
      document.getElementById('eight').click();
      break;
    case 57:
    case 105:
      document.getElementById('nine').click();
      break;
    case 13: // Enter
      e.stopPropagation();
      e.preventDefault();
      document.getElementById('equals').click();
      break;
    case 187:  // + or =
      if (e.shiftKey) {
        document.getElementById('add').click();
      } else {
        document.getElementById('equals').click();
      }
      break;
    case 107: //NumPad add
      document.getElementById('add').click();
      break;
    case 109:
    case 189:
      document.getElementById('subtract').click();
      break;
    case 56:  // * or 8
      if (e.shiftKey) {
        document.getElementById('multiply').click();
      } else {
        document.getElementById('eight').click();
      }
      break;
    case 106: // NumPad *
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
}