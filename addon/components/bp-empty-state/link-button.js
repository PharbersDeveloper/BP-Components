import Component from '@ember/component';
import layout from '../../templates/components/bp-empty-state/link-button';

export default Component.extend({
	layout,
	tagName: '',
	onClick() { },
	actions: {
		click() {
			this.get('onClick')();
		}
	}
});
