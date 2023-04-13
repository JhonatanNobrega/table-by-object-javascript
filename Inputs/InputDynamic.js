class InputDynamic {
  /**
   *
   * @param {td: HTMLTableColElement}
   */
  handle({ input, value, td }) {
    input.readOnly = true;
    input.tabIndex = -1;
    input.disabled = true;
    input.value = value ?? '--';
    input.style.background = '#ccffcc';
    input.style.outline = 'none';
    input.addEventListener('change', inputSanitizeDynamic);
    td.style.background = input.style.background;
    td.style.boxShadow = '0px 0px 0px 1px #FFF inset';
  }
}

/**
 * DYNAMIC
 */
function inputSanitizeDynamic(event) {
  // Implementar alguma validação se preciso...
  let callbackChange = event.currentTarget.callbackChange ?? null;
  if (callbackChange) callbackChange(event);
}

export const inputDynamic = new InputDynamic();
