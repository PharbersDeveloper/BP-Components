import Component from '@ember/component';
import layout from '../../templates/components/bp-table/body';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { equal } from '@ember/object/computed';
import $ from 'jquery';

export default Component.extend({
	layout,
	tagName: 'tbody',
	classNames: ['bp-table-tbody-wrapper'],
	classNameBindings: ['isHover:row-hover'],
	attributeBindings: ['style'],
	hover: true,
	/**
	 * @author Frank Wang
	 * @property
	 * @name isHover
	 * @description 为 row 添加 hover 样式
	 * @type {Boolean}
	 * @default false
	 * @private
	*/
	isHover: equal('hover', true),
	/**
	 * @author Frank Wang
	 * @property
	 * @name hasBorder
	 * @description add's border for td
	 * @type {String}
	 * @default ''
	 * @private
	*/
	hasBorder: computed('border', function () {

		let border = this.get('border');

		return htmlSafe(border ? `border-bottom: 0.5px solid rgba(9,30,66,0.08);` : '');

	})

});
