import { elementAuxiliar } from "../Auxiliar/ElementAuxiliar.js";

class TemplateTd {
  handle(td, dataObjet) {
    /**
     * TD
     */
    if (dataObjet.typeCustom) this.typeCustom(td, dataObjet.typeCustom);
    elementAuxiliar.setData(td, dataObjet.colData ?? {});
  }

  /**
   * @param td {HTMLTableColElement}
   */
  typeCustom(td, typeCustom) {
    if (typeCustom === 'blocked') {
      td.style.background = '#EEE';
    }
  }
}

export const templateTd = new TemplateTd();
