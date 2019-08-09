import Component from '@ember/component';
import layout from '../../templates/components/bp-datepicker/day';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
	layout,
	tagName: 'td',
	classNameBindings: ['isToday:today', 'active'],
	isActive() {
		let choosedDate = this.get('choosedDate'),
			currentDate = this.get('date');

		if (choosedDate.date === currentDate.showDate && choosedDate.year === currentDate.year && choosedDate.month === currentDate.month) {
			this.set('active', true);
		} else {
			this.set('active', false);
		}
	},
	isToday: alias('today.isToday'),
	showText: alias('today.showText'),
	today: computed('date', function () {
		let date = this.get('date'),
			now = new Date(),
			year = now.getFullYear(),
			month = now.getMonth() + 1,
			day = now.getDate();

		if (date.year === year && date.month === month && date.showDate === day) {
			return {
				isToday: true,
				showText: '今'
			};
		}
		return {
			isToday: false,
			showText: date.showDate
		};
	}),
	onClick() { },
	didReceiveAttrs() {
		this._super(...arguments);
		this.isActive();
	},
	didUpdateAttrs() {
		this._super(...arguments);
		this.isActive();
	},
	click(e) {
		let date = this.get('date');

		this.set('active', true);
		this.get('onClick')(date,e);
	}
}).reopenClass({
	positionalParams: ['date']
});
