import Component from '@ember/component';
import layout from '../../templates/components/bp-table/colgroup';
import {A} from '@ember/array';

export default Component.extend({
	layout,
	tagName: 'colgroup',
  	/**
	* @author Frank Wang
	* @property
	* @name columns
	* @description 需要展示的 columns 数组
	* @type {Array}
	* @default []
	* @public
	*/
	columns: A([])
});
