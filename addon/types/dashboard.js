import EmberObject from '@ember/object';
// import panel from './panel';

const Dashboard = EmberObject.extend({
	/**
	 * @author Frank Wang
	 * @property
	 * @name editable
	 * @description 是否可以进行编辑
	 * @type Boolean
	 * @default true
	 * @public
	 */
	editable: true,
	/**
	 * @author Frank Wang
	 * @property
	 * @name time
	 * @description show dashboard time range
	 * @type Object
	 * @default {}
	 * @public
	 */
	time: EmberObject.create({
		from: new Date().getTime() - 6 * 60 * 60 * 1000,
		to: new Date().getTime()
	}),
	/**
	 * @author Frank Wang
	 * @property
	 * @name title
	 * @description dashboard's title
	 * @type String
	 * @default 'home'
	 * @public
	 */
	title: 'home',
	/**
	 * @author Frank Wang
	 * @property
	 * @name version
	 * @description dashboard's version
	 * @type number
	 * @default 0
	 * @public
	 */
	version: 0,
	/**
	 * @author Frank Wang
	 * @method
	 * @name destory
	 * @description destory this dashboard
	 * @param dashboardId
	 * @return void
	 * @example 创建例子。
	 * @public
	 */
	destory(id) {
		// delete this dashboard from backend.
		window.console.log(id);
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name timeRangeUpdate
	 * @description update this dashboard time range
	 * @param start:timestamp,
	 * @param end:timestamp
	 * @return void
	 * @example 创建例子。
	 * @public
	 */
	timeRangeUpdate(start, end) {
		let timeRange = this.get('time');

		timeRange.setProperties({
			from: start,
			to: end
		});
	}
});

export { Dashboard };