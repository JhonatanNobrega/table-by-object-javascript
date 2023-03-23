import { elementAuxiliar } from './ElementAuxiliar.js';

class TdText {

	handle({ td, tdData }) {
		elementAuxiliar.setData(td, tdData);
		// let tda = document.createElement('td');
		// tda.style.fontWeight = 'normal';
		td.innerText = tdData.text;
	}
}

export const tdText = new TdText;