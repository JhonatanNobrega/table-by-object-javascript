
class InputDate {
  handle({ input, inputs, value, sanitize = true }, dataObjet) {
    input.type = 'date';
    input.inputAnterior = inputs[inputs.length - 2];
    if (sanitize) {
      input.value = value ?? '';
      input.getValue = getValue;
      input.setValue = this.setValue;
      input.addEventListener('change', inputSanitizeDate);
    }

    this.setDateConfig(input, dataObjet);
  }

  setDateConfig(input, dataObjet) {
    if (dataObjet.dateFuture === 'true' || dataObjet.datePast === 'true') {
      let dataAtual = new Date();
      let dataAtualString = dataAtual.toLocaleDateString();
      let regex = new RegExp('^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$');
      let date = '';
      if (regex.test(dataAtualString)) {
        let array = regex.exec(dataAtualString);
        date = `${array[3]}-${array[2]}-${array[1]}`;
      } else {
        date = dataAtualString;
      }

      if (dataObjet.dateFuture) this.setDateFuture(input, date);
      if (dataObjet.datePast) this.setDatePast(input, date);
    }
  }

  setDateFuture(input, minDate) {
    input.min = minDate;
  }

  setDatePast(input, maxDate) {
    input.max = maxDate;
  }

  setValue(value) {
    this.value = value;
  }
}



/**
 * DATE
 */
const RegexpSanitizeDate = new RegExp('^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$');
function inputSanitizeDate(event) {
  if (!RegexpSanitizeDate.test(event.currentTarget.value)) {
    event.currentTarget.value = '';
  }

  if (event.currentTarget.max) {
    let dataInput = new Date(event.currentTarget.value);
    let dataMax = new Date(event.currentTarget.max);
    if (dataInput.getTime() > dataMax.getTime()) {
      event.currentTarget.value = '';
    }
  }

  if (event.currentTarget.min) {
    let dataInput = new Date(event.currentTarget.value);
    let dataMin = new Date(event.currentTarget.min);
    if (dataInput.getTime() < dataMin.getTime()) {
      event.currentTarget.value = '';
    }
  }

  let callbackChange = event.currentTarget.callbackChange ?? null;
  if (callbackChange) callbackChange(event);
}

function getValue() {
  return this.value;
}

export const inputDate = new InputDate();
