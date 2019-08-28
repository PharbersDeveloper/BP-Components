import Component from '@ember/component';
import layout from '../../templates/components/bp-table/cell';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
	layout,
	tagName: 'td',
	attributeBindings: ['style','title'],
	/**
	 * @author Frank Wang
	 * @property
	 * @name title
	 * @description 为hover后显示全部提供支持（暂不需要了）
	 * @type {String}
	 * @default ''
	 * @private
	*/
	// title: computed('value',function(){
	// 	return this.get('value');
	// }),
	/**
	 * @author Frank Wang
	 * @property
	 * @name style
	 * @description 内联样式
	 * @type {String}
	 * @default ''
	 * @private
	*/
	style: computed('column', function () {
		let column = this.get('column'),
			align = column.align ? `text-align: ${column.align}` : '';

		return htmlSafe( align);
	})
});
