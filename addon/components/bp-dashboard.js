import Component from '@ember/component';
import layout from '../templates/components/bp-dashboard';
import DashboardContainer from '../mixins/dashboard-container';

export default Component.extend(DashboardContainer, {
	layout,
	classNames: ['bp-dashboard'],
	init() {
		this._super(...arguments);
		window.console.log(this.get('time'));
	}
});
