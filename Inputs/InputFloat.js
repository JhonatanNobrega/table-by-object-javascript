import { elementAuxiliar } from './../Auxiliar/ElementAuxiliar.js';

class InputFloat {
  handle({ input, inputs, value, sanitize = true }) {
    input.type = 'text';
    input.pattern = '[\-?0-9]+([,\.][0-9]+)?';
    input.inputMode = 'decimal';
    input.inputAnterior = inputs[inputs.length - 2];
    input.addEventListener('beforeinput', keyInputFloat);
    if (sanitize) {
      input.getValue = stringByFloat;
      input.setValue = this.setValue;
      input.value = floatByString(value);
      input.addEventListener('change', inputSanitizeFloat);
    }
  }

  setValue(value, qtDecimal = false) {
    this.value = floatByString(value, qtDecimal);
  }
}

/**
 * FLOAT
 */
function inputSanitizeFloat(event) {
  let temNegativo = event.target.value.indexOf('-');
  event.target.value = event.target.value.replace(/[^0-9\,]/, '');
  if (
    event.target.dataset.float_negativo === 'true' &&
    temNegativo > -1
  ) {
    event.target.value = '-' + event.target.value;
  }
  let callbackChange = event.currentTarget.callbackChange ?? null;
  if (callbackChange) callbackChange(event);
}

function keyInputFloat(event) {
  if (['deleteContentBackward', 'deleteContentForward'].includes(event.inputType)) return;
  if (['insertLineBreak'].includes(event.inputType)) return focarInputPosterior(event);
  let qtPonto = elementAuxiliar.countChar(event.target.value, ',');
  if (event.data === ',' || parseInt(event.data, 10) < 10) {
    if (qtPonto === 1 && event.data === ',') event.preventDefault();
    return;
  }
  if (event.data === '.') {
    event.preventDefault();
    if (qtPonto === 0) event.target.value = event.target.value + ',';
    return;
  }
  if (event.data === '-' && event.target.dataset.float_negativo === 'true') {
    let qtNegativo = elementAuxiliar.countChar(event.target.value, '-');
    if (qtNegativo === 0) return;
  }
  event.preventDefault();
}

function stringByFloat(valorString = null) {
  if (valorString === null) valorString = this.value;
  if (valorString === '') return '';
  let float = valorString.replaceAll('.', '');
  float = parseFloat(float.replace(',', '.'));
  return float;
}

export function floatByString(valorFloat, qtDecimal = false) {
  valorFloat = qtDecimal ? elementAuxiliar.roundFloat(valorFloat, qtDecimal) : valorFloat;
  let valorString = valorFloat.toString();
  let qt = elementAuxiliar.countChar(valorString, '.');
  if (qt === 1) {
    valorString = valorString.replaceAll(',', '');
    valorString = valorString.replaceAll('.', ',');
  }
  return valorString;
}

function focarInputPosterior(event) {
  event.preventDefault();
  let inputAnterior = event.currentTarget.inputAnterior
  if (inputAnterior) {
    inputAnterior.focus();
  }
}

export const inputFloat = new InputFloat();
