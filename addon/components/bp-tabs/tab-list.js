import Component from '@ember/component';
import layout from '../../templates/components/bp-tabs/tab-list';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { empty } from '@ember/object/computed';
import { isNone } from '@ember/utils';
import { once } from '@ember/runloop';

export default Component.extend({
	layout,
	tagName: 'ul',
	classNames: ['nav', 'nav-tabs'],
	tabComponent: 'bp-tabs/tab',
	itemComponent: 'bp-tabs/item',
	/**
	 * Gives focus to the selected tab.
	 *
	 * @method focusSelectedTab
	 */
	focusSelectedTab() {
		this.get('selectedTab').element.focus();
	},

	init() {
		this._super(...arguments);
		once(this, this._registerWithTabsContainer);
	},

	isEmpty: empty('tabs'),

	/**
	 * Adds a tab to the `tabs` array.
	 *
	 * @method registerTab
	 * @param {bp-tabs.tabComponent} tab
	 */
	registerTab(tab) {
		this.get('tabs').pushObject(tab);
		once(this, this.selectTab);
	},

	/**
	 * Selects the next tab in the list, if any.
	 *
	 * @method selectNextTab
	 */
	selectNextTab() {
		const selectedTab = this.get('selectedTab'),
			tabs = this.get('tabs'),
			length = tabs.get('length');

		let idx = selectedTab.get('index'),
			tab = null;

		do {
			idx++;
			// Next from the last tab should select the first tab.
			if (idx === length) {
				idx = 0;
			}

			tab = tabs.objectAt(idx);
		} while (tab && tab.isDestroying && tab !== selectedTab);

		if (tab) {
			tab.select();
		}
	},

	/**
	 * Selects the previous tab in the list, if any.
	 *
	 * @method selectPreviousTab
	 */
	selectPreviousTab() {
		const selectedTab = this.get('selectedTab'),
			tabs = this.get('tabs'),
			length = tabs.get('length');

		let idx = selectedTab.get('index'),
			tab = null;

		do {
			idx--;
			// Previous from the first tab should select the last tab.
			if (idx < 0) {
				idx = length - 1;
			}
			// This would only happen if there are no tabs, so stay at 0.
			if (idx < 0) {
				idx = 0;
			}

			tab = tabs.objectAt(idx);
		} while (tab && tab.isDestroying && tab !== selectedTab);

		if (tab) {
			tab.select();
		}
	},

	selectTab() {
		const selection = this.get('selection');

		if (isNone(selection) || this.get('tabs.length') === 1) {
			this.selectTabByIndex(0);
		} else {
			this.selectTabByModel(selection);
		}
	},

	/**
	 * Select the tab at `index`.
	 *
	 * @method selectTabByIndex
	 * @param {Number} index
	 */
	selectTabByIndex(index) {
		const tab = this.get('tabs').objectAt(index);

		if (tab) {
			tab.select();
		}
	},

	selectTabByModel(model) {
		const tab = this.get('tabs').findBy('selectPaneId', model);

		if (tab) {
			tab.select();
		}
	},

	/**
	 * The currently-selected `bp-tabs/tab` instance.
	 *
	 * @property selectedTab
	 * @type bp-tabs.tabComponent
	 */
	selectedTab: computed('selection', 'tabs.@each.selectPaneId', function () {
		return this.get('tabs').findBy('selectPaneId', this.get('selection'));
	}),

	tabs: computed(function () {
		return A();
	}).readOnly(),

	/**
	 * The `bp-tabs` component.
	 *
	 * @property tabsContainer
	 * @type bp-tabs.tabsComponent
	 * @default null
	 */
	tabsContainer: null,

	/**
	 * Removes a tab from the `tabs` array.
	 *
	 * @method unregisterTab
	 * @param {bp-tabs.tabComponent} tab
	 */
	unregisterTab(tab) {
		const index = tab.get('index');

		if (tab.get('isSelected')) {
			if (index === 0) {
				this.selectNextTab();
			} else {
				this.selectPreviousTab();
			}
		}

		this.get('tabs').removeObject(tab);
	},
	_registerWithTabsContainer() {
		this.get('tabsContainer').registerTabList(this);
		once(this, this.selectTab);
	},

	_unregisterWithTabsContainer() {
		this.get('tabsContainer').unregisterTabList(this);
	},
	willDestroy() {
		this._super(...arguments);
		once(this, this._unregisterWithTabsContainer);
	}
});