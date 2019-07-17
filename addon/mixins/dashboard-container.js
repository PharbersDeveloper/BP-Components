import Mixin from '@ember/object/mixin';
import EmberObject from '@ember/object';

export default Mixin.create({
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
	 * @name id
	 * @description 用来区分当前用户的不同 dashboard,当前用户每生成一个dashboard，这 id 就会发生改变
	 * @type Number
	 * @default 0
	 * @public
	 */
	id: 0,
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
	 * @name uid
	 * @description the dashboard uuid
	 * @type String
	 * @default null
	 * @public
	 */
	uid: null,
	/**
	 * @author Frank Wang
	 * @property
	 * @name version
	 * @description dashboard's version,when dashboard is changed,this property is increase
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
