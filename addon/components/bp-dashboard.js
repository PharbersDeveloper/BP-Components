import Component from '@ember/component';
import layout from '../templates/components/bp-dashboard';
import DashboardContainer from '../mixins/dashboard-container';
// import dashboard from '../types/dashboard';

export default Component.extend(DashboardContainer, {
	layout,
	classNames: ['bp-dashboard'],
	/**
	 * @author Frank Wang
	 * @method
	 * @name destroy
	 * @description 销毁当前 dashboard，以及其内部的其他
	 * @param dashboardId
	 * @return void
	 * @example 创建例子。
	 * @public
	 */
	destroy(dashboardId) {
		// code here
		window.console.log(dashboardId);
	},
	didReceiveAttrs() {
		this._super(...arguments);

		let dashboardModel = this.get('dashboardModel'),
			keys = Object.keys(dashboardModel);

		for (let i = 0, len = keys.length; i < len; i++) {
			let key = keys[i];

			this.set(key, dashboardModel[key]);
		}

	}
});
