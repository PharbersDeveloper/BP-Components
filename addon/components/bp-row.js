import layout from '../templates/components/bp-row';
// import BPLayout from 'bp-components/components/bp-layout';
import Component from '@ember/component';
import RowContainer from '../mixins/row-container';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default Component.extend(RowContainer, {
	layout,
	classNames: ['bp-row'],
	attributeBindings: ['style'],
	style: computed('height', function () {
		let height = this.get('height');

		return htmlSafe(`height:${height}px`);
	}),
	init() {
		this._super(...arguments);
	},
	didReceiveAttrs() {
		this._super(...arguments);
		let rowModel = this.get('rowModel'),
			keys = Object.keys(rowModel),
			height = rowModel.height;

		this.set('height', height);

		for (let i = 0, len = keys.length; i < len; i++) {
			let key = keys[i];

			this.set(key, rowModel[key]);
		}
	},
	didInsertElement() {
		this._super(...arguments);
	}
});
