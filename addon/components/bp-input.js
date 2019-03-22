import Component from '@ember/component';
import layout from '../templates/components/bp-input';
import { equal } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend({
	layout,
	tagName: 'div',
	classNames: ['bp-input'],
	classNameBindings: ['block::input-inline', 'mediumSize', 'largeSize', 'widthSmall'],
	attributeBindings: ['disabled'],
	/**
	 * Property to block
	 * @property block
	 * @type boolean
	 * @default false
	 * @public
	 */
	block: false,
	/**
	 * Property to vertical
	 * @property vertical
	 * @type {boolean}
	 * @default false
	 * @public
	 */
	vertical: false,
	/**
	 * 控制 input 的 disabled
	 * @property disabled
	 * @type {boolean}
	 * @default false
	 * @public
	 */
	disabled: false,
	/**
	 * 控制 input 的 label
	 * @property label
	 * @type {string}
	 * @default ''
	 * @public
	 */
	label: '',
	/**
	 * 控制 input 的 state
	 * @property state
	 * @type {string}
	 * @default 'default'
	 * @public
	 */
	state: 'default',
	/**
	 * 显示 input 的状态
	 * @property showInputState
	 * @type {string}
	 * @default 'input-default'
	 * @private
	 */
	showInputState: computed('state', 'valueLength', function () {
		let {
			state,
			valueLength,
			maxLength } =
			this.getProperties('state', 'valueLength', 'maxLength');

		if (valueLength > maxLength) {
			return `input-error`;
		}
		return `input-${state}`;
	}),
	/**
	 * input 的类型-type
	 * @property type
	 * @type {string}
	 * @default 'text'
	 * @public
	 */
	type: 'text',
	/**
	 * input's height size
	 * @property size
	 * @type {string}
	 * @default 'default'
	 * @public
	 */
	size: 'default',
	/**
	 * input's size
	 * @property mediumSize
	 * @type {boolean}
	 * @default false
	 * @private
	 */
	mediumSize: equal('size', 'medium'),
	/**
	 * input's size
	 * @property largeSize
	 * @type {boolean}
	 * @default false
	 * @private
	 */
	largeSize: equal('size', 'large'),
	/**
	 * input's width size
	 * @property widthSize
	 * @type {string}
	 * @default 'default'
	 * @public
	 */
	widthSize: 'default',
	/**
	 * input's width size
	 * @property widthSmall
	 * @type {string}
	 * @default 'default'
	 * @private
	 */
	widthSmall: equal('widthSize', 'small'),
	/**
	 * 控制 input 的最大输入数量
	 * @property maxLength
	 * @type {number}
	 * @default 0
	 * @public
	 */
	maxLength: 0,
	/**
	 * input's value
	 * @property value
	 * @type {any}
	 * @default ''
	 * @public
	 */
	value: '',
	/**
	 * input's value's number
	 * @property valueLength
	 * @type {number}
	 * @default 0
	 * @private
	 */
	valueLength: computed('value', function () {
		let maxLength = this.get('maxLength'),
			value = this.get('value') || '';

		return maxLength !== 0 ? value.length : 0;
	}),
	/**
	 * input 的黑方快
	 * @property prepend
	 * @type {string}
	 * @default ''
	 * @public
	 */
	prepend: '',
	/**
	 * 改变 perpend 的方向
	 * @property prependDirection
	 * @type {string}
	 * @default 'left'
	 * @public
	 */
	prependDirection: 'left',
	/**
	 * 改变perpend的方向的类
	 * @property prependDirClass
	 * @type {boolean}
	 * @default false
	 * @private
	 */
	prependDirClass: equal('prependDirection', 'right'),
	/**
	 * 当 input 的内容发生改变的时候
	 *
	 * @event onChange
	 * @param {*} value
	 * @public
	 * 只会传送到 maxLength 的值！！！
	 */
	onChange() { },
	onKeyDown() { },
	actions: {
		change(event) {
			let maxLength = this.get('maxLength'),
				value = event.target.value;

			this.set('value', event.target.value);
			if (maxLength !== 0) {
				this.get('onChange')(value.slice(0, maxLength));
			} else {
				this.get('onChange')(value);
			}
		},
		keyDown(event) {
			let maxLength = this.get('maxLength');

			if (maxLength !== 0) {
				this.get('onKeyDown')(event.target.value.slice(0, maxLength));
			} else {
				this.get('onKeyDown')(event.target.value);
			}
		}
	}

});
