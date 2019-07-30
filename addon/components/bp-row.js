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
	/**
	 * @author Frank Wang
	 * @method
	 * @name dataReady
	 * @description 当 chart 请求数据完成之后
	 * @param 该类/方法的参数，可重复定义。
	 * @return 该类/方法的返回类型。
	 * @example 创建例子。
	 * @private
	 */
	dataReady(data, config) {
		this._super(...arguments);
		this.onQueryReady(data, config);
	},
	/**
	 * @author Frank Wang
	 * @method
	 * @name onQueryReady
	 * @description 当子组件中的数据请求完毕之后执行
	 * @param 该类/方法的参数，可重复定义。
	 * @return 该类/方法的返回类型。
	 * @example 创建例子。
	 * @public
	 */
	onQueryReady(data, config) {
		this._super(...arguments);
	},
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
