import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import EmberObject from '@ember/object';

export default Mixin.create({
	/**
	 * @author Frank Wang
	 * @property
	 * @name collapsed
	 * @description 展示 row 的折叠状态
	 * @type Boolean
	 * @default false
	 * @public
	 */
	collapsed: false,
	/**
	 * @author Frank Wang
	 * @property
	 * @name height
	 * @description row height
	 * @type Number
	 * @default 350
	 * @public
	 */
	height: 350,
	/**
	 * @author Frank Wang
	 * @property
	 * @name time
	 * @description show dashboard time range
	 * @type Object
	 * @default {}
	 * @public
	 */
	time: computed(function () {
		return EmberObject.create({
			from: new Date().getTime() - 6 * 60 * 60 * 1000,
			to: new Date().getTime()
		});
	}),
	/**
	 * @author Frank Wang
	 * @method
	 * @name destory
	 * @description destory this row
	 * @param rowId
	 * @return void
	 * @example 创建例子。
	 * @public
	 */
	destory(id) {
		// your code is here
		window.console.log(id);
	}
});
