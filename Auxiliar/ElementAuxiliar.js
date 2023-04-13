import { ea } from './EAPrivado.js';

class ElementAuxiliar {

  setData(element, { dataSet = {}, dataStyle = {}, dataAttribute = {}, dataClass = [], data = {} }) {
    ea._setData(element, ea._arrayKeyValues(data));
    ea._setDataSet(element, ea._arrayKeyValues(dataSet));
    ea._setStyle(element, ea._arrayKeyValues(dataStyle));
    ea._setClass(element, dataClass);
    ea._setDataAttribute(element, ea._arrayKeyValues(dataAttribute));
  }

  countChar(valorString, letraAlvo) {
    let resultado = 0;
    for (const letraAtual of valorString) {
      if (letraAtual === letraAlvo) {
        resultado++;
      }
    }
    return resultado;
  }

  roundFloat(valorFloat, qtDecimal) {
    if (qtDecimal && qtDecimal > 0) {
      let valorRedondar = 10;
      for (let i = 1; i < qtDecimal; i++) {
        valorRedondar *= 10;
      }
      valorFloat = Math.round(valorFloat * valorRedondar) / valorRedondar;
    }
    return valorFloat;
  }

  organizeInputs(event, objConfig = {}) {
    let obj = {
      inputs: event.currentTarget.inputs,
      filter: ea._filterData,
      allSetEmpty: ea._allSetEmpty,
      allNotEmpty: ea._allNotEmpty,
      allNotEmptyBy: ea._allNotEmptyBy,
      allEmpty: ea._allEmpty,
      allEmptyBy: ea._allEmptyBy,
      findEmpty: ea._findEmpty,
      getInput: ea._getInput,
      data: {}
    };
    if (!obj.inputs) return obj;
    obj.inputs.forEach(input => {
      let iden = ea._configOrganizeInputs(input.dataset.iden, objConfig);
      obj.data[iden] = input.getValue();
    });
    return obj;
  }

  organizeInputsArray(inputs, objConfig = {}) {
    let event = { currentTarget: { inputs } };
    return this.organizeInputs(event, objConfig);
  }
}

export const elementAuxiliar = new ElementAuxiliar();
