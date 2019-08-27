import Component from '@ember/component';
import layout from '../../templates/components/bp-table/thead';
import {A} from '@ember/array';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { isEmpty } from '@ember/utils';

export default Component.extend({
	layout,
	classNames:['bp-table-thead-wrapper'],
	attributeBindings: ['style'],
	/**
	* @author Frank Wang
	* @property
	* @name columns
	* @description 需要展示的 columns 数组
	* @type {Array}
	* @default []
	* @public
	*/
	columns:A([]),
	/**
	 * @author Frank Wang
	 * @property
	 * @name style
	 * @description thead style
	 * @type {String}
	 * @default ''
	 * @public
	*/
	style: computed('scrollLeft',function() {
		let scrollLeft = this.get('scrollLeft');

		console.log(`scrollLeft is ${scrollLeft}`);
		if (isEmpty(scrollLeft)) {
			return htmlSafe('');
		}
		return htmlSafe(`transform:translateX(-${scrollLeft}px)`);
	})
});
