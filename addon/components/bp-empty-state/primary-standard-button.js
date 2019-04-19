import Component from '@ember/component';
import layout from '../../templates/components/bp-empty-state/primary-standard-button';

export default Component.extend({
	layout,
	tagName: '',
	onPrimaryClick() { },
	onStandardClick() { },
	actions: {
		primaryClick() {
			this.get('onPrimaryClick')();
		},
		standardClick() {
			this.get('onStandardClick')();
		}
	}
});
