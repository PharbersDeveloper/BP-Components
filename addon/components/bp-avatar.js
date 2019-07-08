import Component from '@ember/component';
import layout from '../templates/components/bp-avatar';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';
import { htmlSafe } from '@ember/template';

export default Component.extend({
	layout,
	classNames: 'bp-avatar',
	classNameBindings: ['avatarType:avatar-s:avatar-c'],
	/**
	 * 设置头像的类型
	 * @default 'square'
	 * @value 'square' 'circle'
	 * @type String
	 * @public
	 */
	type: 'square',
	/**
	 * 判断头像的类型
	 * @private
	 */
	avatarType: equal('type', 'square'),
	/**
	 * 头像的大小
	 * @default 24
	 * @type Number
	 * @public
	 */
	size: 24,
	/**
	 * avatarSize 头像大小的结果
	 *
	 */
	avatarSize: computed('size', function () {
		let size = this.get('size');

		return htmlSafe(`width:${size}px;height:${size}px;`);
	}),
	/**
	 * 头像资源地址
	 * @default ''
	 * @type String
	 * @public
	 */
	src: '',
	/**
	 * 头像最终显示的地址
	 * @return String
	 * @private
	 */
	showSrc: computed('src', 'avatarType', function () {
		let src = this.get('src'),
			avatarType = this.get('avatarType');

		if (isEmpty(src)) {
			return avatarType ? 'https://i.loli.net/2019/07/08/5d22e488796ed39304.png' : 'https://i.loli.net/2019/07/08/5d22e4888d73e10367.png';
		}
	})
});
