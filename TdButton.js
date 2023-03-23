import { elementAuxiliar } from './ElementAuxiliar.js';

class TdButton {
    handle({ prefix, td, tdData }) {
        let button = document.createElement("button");
        button.type = "button";
        button.innerText = tdData.button;
        if (tdData.callback) {
            button.removerTrs = this.removerTrs;
            button.dataset.prefix = prefix;
            button.addEventListener('click', tdData.callback);
        }
        elementAuxiliar.setData(button, tdData);
        this.typeCustom(button, tdData);
        td.appendChild(button);
    }

    typeCustom(button, { typeCustom = 'Add' }) {
        if (typeCustom === 'Add') {
            button.classList.add("btn", "btn-primary");
            button.innerText = button.innerText + '+';
        }
        if (typeCustom === 'Remover') {
            button.classList.add("btn", "btn-danger");
            button.innerText = button.innerText + '-';
        }
    }

    removerTrs(event) {
        let prefixTr = event.target.dataset.prefix;
        let trs = [...document.querySelectorAll(`tr[data-prefix="${prefixTr}"]`)];
        trs.forEach(tr => {
            tr.parentElement.removeChild(tr);
        });
    }
}

export const tdButton = new TdButton;