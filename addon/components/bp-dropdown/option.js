import Component from '@ember/component';
import layout from '../../templates/components/bp-dropdown/option';
import { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';

export default Component.extend({
	layout,
	tagName: 'option',
	attributeBindings: ['selected', 'disabled', 'value', 'title'],
	selected: computed('value', 'select.value', function () {
		return this.get('value') === this.get('select.value');
	}),
	/**
	 * 当前选择的 option 的值
	 *
	 * @property value
	 * @type Object
	 * @default null
	 */
	value: null,

	/**
	 * 调用 register
	 *
	 * @override
	 */
	didInsertElement() {
		this._super(...arguments);

		scheduleOnce('afterRender', () => {
			this.get('register')(this);
		});
	},

	/**
	 * 调用 unregister
	 *
	 * @override
	 */
	willDestroyElement() {
		this._super(...arguments);

		this.get('unregister')(this);
	}
});
