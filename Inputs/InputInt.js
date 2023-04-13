import { inputFloat } from './InputFloat.js';

class InputInt {
  handle({ input, inputs, value }) {
    inputFloat.handle({ input, inputs, sanitize: false });
    input.getValue = stringByInt;
    input.value = intByString(value);
    input.addEventListener('change', inputSanitizeInt);
  }
}

/**
 * INT
 */
function inputSanitizeInt(event) {
  let temNegativo = event.target.value.indexOf('-');
  event.target.value = event.target.value.replace(/[^0-9]+/g, '');
  if (
    event.target.dataset.float_negativo === 'true' &&
    temNegativo > -1
  ) {
    event.target.value = '-' + event.target.value;
  }
  let callbackChange = event.currentTarget.callbackChange ?? null;
  if (callbackChange) callbackChange(event);
}

function stringByInt(valorString = null) {
  if (valorString === null) valorString = this.value;
  if (valorString === '') return '';
  return parseInt(valorString);
}

function intByString(valorInt) {
  return String(valorInt);
}

export const inputInt = new InputInt();
