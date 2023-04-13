import { elementAuxiliar } from './../Auxiliar/ElementAuxiliar.js';

class InputScale {
  handle({ input, inputs, value, sanitize = true }) {
    input.type = 'text';
    input.placeholder = 'Ex. 10x20';
    input.inputAnterior = inputs[inputs.length - 2];
    input.addEventListener('beforeinput', keyInputScale);
    if (sanitize) {
      input.getValue = getValue;
      input.setValue = this.setValue;
      input.value = stringByScale(value);
      input.addEventListener('change', inputSanitizeScale);
    }
  }

  setValue(value) {
    this.value = stringByScale(value);
  }
}

/**
 * SCALE
 */
const RegexpSanitizeScale = new RegExp('^[0-9]+[x][0-9]+$');
function inputSanitizeScale(event) {
  if (!RegexpSanitizeScale.test(event.target.value)) {
    event.target.value = '';
  }
  let callbackChange = event.currentTarget.callbackChange ?? null;
  if (callbackChange) callbackChange(event);
}

function keyInputScale(event) {
  if (['deleteContentBackward', 'deleteContentForward'].includes(event.inputType)) return;
  if (['insertLineBreak'].includes(event.inputType)) return focarInputPosterior(event);
  let qtX = elementAuxiliar.countChar(event.target.value, 'x');
  if (parseInt(event.data, 10) < 10) {
    return;
  }
  if (event.data === 'x' || event.data === 'X') {
    event.preventDefault();
    if (event.target.value === '') return;
    if (qtX === 0) event.target.value = event.target.value + 'x';
    return;
  }
  event.preventDefault();
}

function getValue() {
  return this.value;
}

function stringByScale(valorString) {
  return RegexpSanitizeScale.test(valorString) ? valorString : '';
}

function focarInputPosterior(event) {
  event.preventDefault();
  let inputAnterior = event.currentTarget.inputAnterior
  if (inputAnterior) {
    inputAnterior.focus();
  }
}

export const inputScale = new InputScale();
