import layout from '../templates/components/bp-layout';
import BPLayout from 'bp-components/components/bp-layout';
import RowContainer from '../mixins/row-container';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default BPLayout.extend(RowContainer, {
	layout,
	classNames: ['bp-row'],
	attributeBindings: ['style'],
	style: computed('height', function () {
		let height = this.get('height');

		return htmlSafe(`height:${height}px`);
	}),
	init() {
		this._super(...arguments);
		window.console.log(this.get('height'));
	},
	didInsertElement() {
		this._super(...arguments);
		let height = this.get('rowModel').height;

		this.set('height', height);
	}
});
