import { elementAuxiliar } from './Auxiliar/ElementAuxiliar.js';
import { templateTd } from './Template/TemplateTd.js';

class TdText {

  handle({ td, dataObjet }) {
    this.td = td;
    this.dataObjet = dataObjet;
    templateTd.handle(this.td, this.dataObjet);
    this.settings();
  }
  /**
  * Configurações gerais
  */
  settings() {
    this.td.innerHTML = this.dataObjet.text;
    elementAuxiliar.setData(this.td, this.dataObjet.colData ?? {});
  }
}

export const tdText = new TdText;
