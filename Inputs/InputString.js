class InputString {
  /**
   *
   * @param {td: HTMLTableColElement}
   */
  handle({ input, inputs, value, td }, dataObjet) {
    if (!dataObjet.maxLength) new Error('Todo input string tem que ter um limite!');
    input.maxLength = dataObjet.maxLength;
    input.value = value ?? '';
    input.inputAnterior = inputs[inputs.length - 2];
    input.addEventListener('beforeinput', keyInputString);
    input.addEventListener('change', inputSanitizeString);
  }
}

/**
 * STRING
 */
function inputSanitizeString(event) {
  // Implementar alguma validação se preciso...
  let callbackChange = event.currentTarget.callbackChange ?? null;
  if (callbackChange) callbackChange(event);
}

function keyInputString(event) {
  if (['deleteContentBackward', 'deleteContentForward'].includes(event.inputType)) return;
  if (['insertLineBreak'].includes(event.inputType)) return focarInputPosterior(event);
}

function focarInputPosterior(event) {
  event.preventDefault();
  let inputAnterior = event.currentTarget.inputAnterior
  if (inputAnterior) {
    inputAnterior.focus();
  }
}

export const inputString = new InputString();
