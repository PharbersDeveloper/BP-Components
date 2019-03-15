import Component from '@ember/component';
import layout from '../templates/components/bp-card';

export default Component.extend({
	layout,
	classNames: ['bp-card'],
	/**
	 * 图片地址
	 * @property src
	 * @type {string}
	 * @default ''
	 * @public
	 */
	src: '',
	/**
	 * category
	 * @property category
	 * @type {string}
	 * @default ''
	 * @public
	 */
	category: '',
	/**
	 * title
	 * @property title
	 * @type {string}
	 * @default ''
	 * @public
	 */
	title: '',
	/**
	 * desc
	 * @property desc
	 * @type {string}
	 * @default ''
	 * @public
	 */
	desc: '',
	/**
	 * 点击时传送的值
	 * @property clickValue
	 * @type {string}
	 * @default ''
	 * @public
	 */
	clickValue: '',
	/**
	 * tag 的状态（要显示的状态文字）
	 * @property tagState
	 * @type {string}
	 * @default ''
	 * @public
	 */
	tagState: '',
	/**
	 * tag 的类型 value=open/close
	 * @property tagType
	 * @type {string}
	 * @default ''
	 * @public
	 */
	tagType: '',
	onClick() { },
	click() {
		let action = this.get('onClick'),
			actionValue = this.get('clickValue');

		action(actionValue);
	}
	// cardHeader: 'bp-card/header',
	// cardBody: 'bp-card/body'
});
