import Component from '@ember/component';
import layout from '../templates/components/bp-layout';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';

export default Component.extend({
	layout,
	/**
	 * 设置是否折行.
	 *
	 * @property wrap
	 * @type boolean
	 * @default false
	 * @private
	 */
	isWrap: equal('wrap', true),
	/**
	 * 设置多行情况下的对齐方式.
	 *
	 * @property multi
	 * @type string
	 * @default 'stretch'
	 * @private
	 */
	multiRow: computed('multi', function () {
		let multi = this.get('multi');

		switch (multi) {
		case 'start':
			return 'mul-s';
		case 'end':
			return 'mul-e';
		case 'center':
			return 'mul-c';
		case 'between':
			return 'mul-b';
		case 'around':
			return 'mul-a';
		default:
			return 'mul-d';
		}
	}),
	/**
	 * 决定主轴上的对齐方式.
	 *
	 * @property main
	 * @type string
	 * @default 'start'
	 * @private
	 */
	mainAxis: computed('direction', 'main', function () {
		let direction = this.get('direction'),
			justify = this.get('main');

		switch (justify) {
		case 'end':
			return direction !== 'col' ? 'row-me' : 'col-me';
		case 'center':
			return direction !== 'col' ? 'row-mc' : 'col-mc';
		case 'between':
			return direction !== 'col' ? 'row-mb' : 'col-mb';
		case 'around':
			return direction !== 'col' ? 'row-ma' : 'col-ma';
		default:
			return direction !== 'col' ? 'row-ms' : 'col-ms';
		}
	}),

	/**
	 * 决定交叉轴上的对齐方式.
	 *
	 * @property cross
	 * @type string
	 * @default 'stretch'
	 * @private
	 */
	crossAxis: computed('direction', 'cross', function () {
		let direction = this.get('direction'),
			aliginItems = this.get('cross');

		switch (aliginItems) {
		case 'start':
			return direction !== 'col' ? 'row-cs' : 'col-cs';
		case 'end':
			return direction !== 'col' ? 'row-ce' : 'col-ce';
		case 'center':
			return direction !== 'col' ? 'row-cc' : 'col-cc';
		case 'baseline':
			return direction !== 'col' ? 'row-cb' : 'col-cb';
		default:
			return direction !== 'col' ? 'row-cd' : 'col-cd';
		}
	}),
	classNameBindings: [
		'flexDirection',
		'mainAxis',
		'crossAxis',
		'isWrap',
		'multiRow'
	]
}).reopenClass({
	positionalParams: ['direction', 'main', 'cross', 'wrap', 'multi']
});