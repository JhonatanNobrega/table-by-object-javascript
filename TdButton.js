import { templateButton } from './Template/TemplateButton.js';

class TdButton {
  handle({ prefix, td, dataObjet }) {
    this.prefix = prefix;
    this.td = td;
    this.dataObjet = dataObjet;
    this.button = document.createElement("button");
    templateButton.handle(this.button, this.td, this.dataObjet);
    if (this.dataObjet.tabIndex) this.button.tabIndex = this.dataObjet.tabIndex;
    this.button.dataset.prefix = this.prefix;
    if (this.dataObjet.callback) {
      this.button.id_item = this.dataObjet.id ?? undefined;
      this.button.removerTrs = this.removerTrs;
      this.button.addEventListener('click', this.dataObjet.callback);
    }
    this.td.appendChild(this.button);
  }

  removerTrs(prefix) {
    let trs = [...document.querySelectorAll(`tr[data-prefix="${prefix}"]`)];
    trs.forEach(tr => {
      tr.parentElement.removeChild(tr);
    });
  }
}

export const tdButton = new TdButton;
