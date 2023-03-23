class ElementAuxiliar {

    setData(element, { dataSet = {}, dataStyle = {}, dataAttribute = {}, dataClass = [] }) {
        this._setDataSet(element, this._arrayKeyValues(dataSet));
        this._setStyle(element, this._arrayKeyValues(dataStyle));
        this._setClass(element, dataClass);
        this._setDataAttribute(element, this._arrayKeyValues(dataAttribute));
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
}

export const elementAuxiliar = new ElementAuxiliar();