import Component from '@ember/component';
import layout from '../templates/components/bp-datepicker';
import { htmlSafe } from '@ember/template';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
	layout,
	classNames: ['bp-datepicker-wrapper'],
	toggleDatepicker: false,
	inputValue: '',
	tabindex: '-1',
	attributeBindings: ['tabindex'],
	/**
	 * @author Frank Wang
	 * @property
	 * @name date
	 * @description 需要供用户当前选择的日期数据-年/月/日
	 * @type {Obejct}
	 * @default now
	 * @private
	 */
	date: EmberObject.create({
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
		days: A([])
	}),
	// focusIn(e) {
	// 	this.set('toggleDatepicker', true);
	// 	e.stopImmediatePropagation();
	// 	console.log('focusIn');
	// },
	focusOut(e) {
		e.stopImmediatePropagation();
		this.set('toggleDatepicker', false);
	},
	click(e) {
		this.set('toggleDatepicker', true);
		e.stopImmediatePropagation();
	},

	/**
	 * @author Frank Wang
	 * @property
	 * @name monthWeek
	 * @description 显示几周的天数
	 * @type {Number}
	 * @default 5
	 * @public
	 */
	monthWeek: 5,
	/**
	 * @author Frank Wang
	 * @property
	 * @name choosedDate
	 * @description 点击日期选中的日期数据
	 * @type {Object}
	 * @default 'now'
	 * @private
	 */
	choosedDate: EmberObject.create({
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
		date: new Date().getDate()
	}),
	/**
	 * @author Frank Wang
	 * @property
	 * @name choosedDay
	 * @description 点击日期选中的阳历日
	 * @type {Number}
	 * @default new Date().getDate()
	 * @private
	 */
	choosedDay: alias('choosedDate.date'),
	/**
	 * @author Frank Wang
	 * @property
	 * @name weekend
	 * @description 要展示的星期数据（目前作为private，将来应该可自定义）
	 * @type {Array}
	 * @default A(['一', '二', '三', '四', '五', '六', '日'])
	 * @private
	 */
	weekend: A(['一', '二', '三', '四', '五', '六', '日']),
	didInsertElement() {
		this._super(...arguments);

		let monthDate = this.getMonthDate();

		window.console.log(monthDate);
	},
	actions: {
		// showDatepicker() {
		// 	this.set('toggleDatepicker', true);
		// },
		// closeDatepicker(e) {
		// 	console.log(e);
		// 	// this.set('toggleDatepicker', false);
		// },
		chooseDate(date, e) {
			let choosedDate = this.get('choosedDate');

			choosedDate.setProperties({
				year: date.year,
				month: date.month,
				date: date.showDate
			});
			this.set('inputValue', `${date.year}-${date.month}-${date.showDate}`);
			// this.set('toggleDatepicker', false);
			this.focusOut(e);
			// e.stopImmediatePropagation();
		},
		prevMonth() {
			let date = this.get('date'),
				newYear = date.year,
				newMonth = date.month - 1;

			if (newMonth === 0) {
				newMonth = 12;
				newYear -= 1;
			}
			this.getMonthDate(newYear, newMonth);
		},
		nextMonth() {
			let date = this.get('date'),
				newYear = date.year,
				newMonth = date.month + 1;

			if (newMonth === 13) {
				newMonth = 1;
				newYear += 1;
			}
			this.getMonthDate(newYear, newMonth);
		},
		prevYear() {
			let date = this.get('date'),
				newYear = date.year - 1;

			this.getMonthDate(newYear, date.month);
		},
		nextYear() {
			let date = this.get('date'),
				newYear = date.year + 1;

			this.getMonthDate(newYear, date.month);
		}
	},
	getMonthDate: function (year, month) {
		// let date = this.get('date'),
		let ret = [],
			monthWeek = this.get('monthWeek') || 5,
			showYear = year,
			showMonth = month,
			firstDay = 0,
			firstDayWeekDay = 0,
			lastDayOfLastMonth = null,
			lastDateOfLastMonth = 0,
			preMonthDayCount = 30,
			lastDay = null,
			lastDate = 0;

		if (!showYear || !showMonth) {

			let today = new Date();

			showYear = today.getFullYear();
			showMonth = today.getMonth() + 1;
		}
		firstDay = new Date(showYear, showMonth - 1, 1);//获取当月第一天

		firstDayWeekDay = firstDay.getDay();//获取星期几，才好判断排在第几列

		if (firstDayWeekDay === 0) {//周日
			firstDayWeekDay = 7;
		}

		showYear = firstDay.getFullYear();
		showMonth = firstDay.getMonth() + 1;

		lastDayOfLastMonth = new Date(showYear, showMonth - 1, 0);//获取最后一天
		lastDateOfLastMonth = lastDayOfLastMonth.getDate();

		preMonthDayCount = firstDayWeekDay - 1;
		lastDay = new Date(showYear, showMonth, 0);
		lastDate = lastDay.getDate();

		for (let i = 0; i < 7 * monthWeek; i++) {
			let date = i + 1 - preMonthDayCount,
				showDate = date,
				thisMonth = showMonth;
			//上一月

			if (date <= 0) {
				thisMonth = showMonth - 1;
				showDate = lastDateOfLastMonth + date;
			} else if (date > lastDate) {
				//下一月
				thisMonth = showMonth + 1;
				showDate = showDate - lastDate;
			}
			if (thisMonth === 0) {
				thisMonth = 12;
			}
			if (thisMonth === 13) {
				thisMonth = 1;
			}
			ret.push({
				year: showYear,
				month: thisMonth,
				date: date,
				showDate: showDate
			});

		}
		this.set('date', {
			year: showYear,
			month: showMonth,
			days: ret
		});
		return {
			year: showYear,
			month: showMonth,
			days: ret
		};
	},
	monthDays: alias('pickerBody.monthDays'),
	datepickerHtml: alias('pickerBody.html'),

	pickerBody: computed('date.{year,month}', function () {
		let date = this.get('date'),
			monthWeek = this.get('monthWeek') || 6,
			days = date.days,
			now = new Date(),
			weekend = this.get('weekend'),
			weekendHtml = weekend.map(ele => `<th>${ele}</th>`).join(''),
			datepickerHTML = `<div class="ui-datepicker-body">
			<table><thead><tr>${weekendHtml}</tr></thead><tbody>`,
			insideMonthDays = A([]);

		for (let j = 0; j < monthWeek; j++) {
			insideMonthDays.push(days.slice(7 * j, 7 * j + 7));
		}

		for (let i = 0; i < date.days.length; i++) {
			let currentDate = date.days[i];


			if (i % 7 === 0) {
				datepickerHTML += `<tr>`;
			}
			if (date.year === now.getFullYear() && currentDate.month === now.getMonth() + 1 && currentDate.showDate === now.getDate()) {
				datepickerHTML += `<td class="today">今</td>`;
			} else {
				datepickerHTML += `<td>${currentDate.showDate}</td>`;
			}

			if (i % 7 === 6) {
				datepickerHTML += `</tr>`;
			}
		}
		datepickerHTML += `</tbody></table></div>`;

		return {
			html: htmlSafe(datepickerHTML),
			monthDays: insideMonthDays
		};
	}),
	buildUi: function () {
		let monthData = this.get('date'),
			weekend = this.get('weekend'),
			weekendHtml = weekend.map(ele => `<th>${ele}</th>`).join(''),
			datepickerHTML = `<div class="ui-datepicker-body">
			<table><thead><tr>${weekendHtml}</tr></thead><tbody>`;

		for (let i = 0; i < monthData.days.length; i++) {
			let date = monthData.days[i];

			if (i % 7 === 0) {
				datepickerHTML += `<tr>`;
			}
			datepickerHTML += `<td>${date.showDate}</td>`;

			if (i % 7 === 6) {
				datepickerHTML += `</tr>`;
			}
		}
		datepickerHTML += `</tbody></table></div>`;
		return htmlSafe(datepickerHTML);
	}
});
