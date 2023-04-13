
class EAPrivado {

  _setData(element, { array_key, array_values }) {
    for (let i = 0; i < array_key.length; i++) {
      element[array_key[i]] = array_values[i];
    }
  }

  _setDataSet(element, { array_key, array_values }) {
    for (let i = 0; i < array_key.length; i++) {
      element.dataset[array_key[i]] = array_values[i];
    }
  }

  _setDataAttribute(element, { array_key, array_values }) {
    for (let i = 0; i < array_key.length; i++) {
      element.setAttribute([array_key[i]], array_values[i]);
    }
  }

  _setStyle(element, { array_key, array_values }) {
    for (let i = 0; i < array_key.length; i++) {
      element.style[array_key[i]] = array_values[i];
    }
  }

  _setClass(element, dataClass) {
    if (dataClass.length === 0) return;
    element.classList.add(...dataClass);
  }

  _arrayKeyValues(obj = {}) {
    return { array_key: Object.keys(obj), array_values: Object.values(obj) };
  }

  _filterData(arrayItensString) {
    let dataFilter = {};
    let array_key = Object.keys(this.data);
    let array_values = Object.values(this.data);
    for (let i = 0; i < array_key.length; i++) {
      if (!arrayItensString.includes(array_key[i])) continue;
      const key = array_key[i];
      const valor = array_values[i];
      dataFilter[key] = valor;
    }
    return dataFilter;
  }

  /**
   * Verifica se todos itens esta preenchidos
   */
  _allNotEmpty(array = null) {
    if (array === null) array = this.inputs;
    return array.every(input => input.value !== '');
  }

  _allSetEmpty(array = null) {
    if (array === null) array = this.inputs;
    return array.forEach(input => input.value = '');
  }

  _allNotEmptyBy(arrayItensString) {
    let array = this.inputs;
    let arrayItens = [];
    array.forEach(item => {
      if (arrayItensString.includes(item.dataset.iden)) {
        arrayItens.push(item);
      }
    });
    return this.allNotEmpty(arrayItens);
  }

  /**
   * Verifica se todos itens não esta preenchidos
   */
  _allEmpty(array = null) {
    if (array === null) array = this.inputs;
    return array.every(input => input.value === '');
  }

  _allEmptyBy(arrayItensString) {
    let array = this.inputs;
    let arrayItens = [];
    array.forEach(item => {
      if (arrayItensString.includes(item.dataset.iden)) {
        arrayItens.push(item);
      }
    });
    return this.allEmpty(arrayItens);
  }

  /**
   * Pega o primeiro item que encontrar não preenchido
   */
  _findEmpty(array = null) {
    if (array === null) array = this.inputs;
    return array.find(input => input.value === '');
  }

  /**
   * Pega o input pelo dataset iden
   */
  _getInput(iden, array = null) {
    if (array === null) array = this.inputs;
    return array.find(input => input.dataset.iden === iden);
  }

  _configOrganizeInputs(iden, obj) {
    if (obj.sanitizeFinalSeparator) {
      return iden.replace(/[\_][0-9]$/, '');
    }
    return iden;
  }
}

export const ea = new EAPrivado();
