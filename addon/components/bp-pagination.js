import Component from '@ember/component';
import layout from '../templates/components/bp-pagination';
import { computed } from '@ember/object';

export default Component.extend({
	layout,
	tagName: 'ul',
	classNames: ['bp-pagination'],

	positionalParams: ['pageCount', 'curPage'],
	curPage: 1,
	pageGroup: null,
	nextFlag: computed('curPage', 'pageCount', function () {
		if (this.curPage === this.pageCount) {
			return false;
		}
		return true;
	}),
	previousFlag: computed('curPage', 'pageCount', function () {
		if (this.get('curPage') === 1 || this.curPage === 0) {
			return false;
		}
		return true;
	}),
	/**
	 * 需要展示几个页数
	 * @property showHowManyPages
	 * @type {number}
	 * @default 6
	 * @public
	 */
	showHowManyPages: 6,
	/**
	 * 总页数
	 * @property totalPageCounts
	 * @type {number}
	 * @default 0
	 * @public
	 */
	totalPageCounts: 0,
	generateTemPageGroup(totalPageCounts) {
		let tmpArr = [...Array(totalPageCounts).keys()].map((ele) => {
			return ele + 1;
		});

		return tmpArr;
	},
	createPageGroup() {

		let arr = [],
			{ showHowManyPages: pageNums, totalPageCounts } =
				this.getProperties('showHowManyPages', 'totalPageCounts');


		// if (this.pageCount < pageNums) {
		// 	if (this.pageCount === 0) {
		// 		return;
		// 	}
		// 	for (let idx = 1; idx <= this.pageCount; idx++) {
		// 		let tmpPage = {};

		// 		tmpPage.pageNum = idx;
		// 		arr.push(tmpPage);
		// 	}

		// } else {
		// 	for (let idx = 1; idx <= pageNums; idx++) {
		// 		let tmpPage = {};

		// 		tmpPage.pageNum = idx;
		// 		arr.push(tmpPage);
		// 	}
		// }
		if (totalPageCounts === 0) {
			return;
		}
		if (totalPageCounts < pageNums) {
			arr = this.generateTemPageGroup(totalPageCounts);
		} else {
			arr = this.generateTemPageGroup(pageNums);

		}
		this.set('pageGroup', arr);
	},
	updatePageGroup() {
		let arr = [];

		if (this.pageCount < 6) {
			return;
		}
		if (this.curPage < 3) {
			for (let idx = 1; idx <= 6; idx++) {
				let tmpPage = {};

				tmpPage.pageNum = idx;
				arr.push(tmpPage);
			}
		} else if (this.curPage > this.pageCount - 2) {
			for (let idx = this.pageCount - 4; idx <= this.pageCount; idx++) {
				let tmpPage = {};

				tmpPage.pageNum = idx;
				arr.push(tmpPage);
			}
		} else {
			for (let idx = this.curPage - 2; idx <= this.curPage + 2; idx++) {
				let tmpPage = {};

				tmpPage.pageNum = idx;
				arr.push(tmpPage);
			}
		}

		this.set('pageGroup', arr);
	},
	didReceiveAttrs() {
		this._super(...arguments);
		this.createPageGroup();
	},
	actions: {
		pagiOnClick(param) {
			this.set('curPage', param);
			this.updatePageGroup(this.pageGroup);
			this.sendPageNum(this.curPage);
		},
		onFirstClick() {
			this.set('curPage', 1);
			this.updatePageGroup(this.pageGroup);
			this.sendPageNum(this.curPage);
		},
		onPreviousClick() {
			this.set('curPage', this.curPage - 1);
			this.updatePageGroup(this.pageGroup);
			this.sendPageNum(this.curPage);
		},
		onNextClick() {
			this.set('curPage', this.curPage + 1);
			this.updatePageGroup(this.pageGroup);
			this.sendPageNum(this.curPage);
		},
		onLastClick() {
			this.set('curPage', this.pageCount);
			this.updatePageGroup(this.pageGroup);
			this.sendPageNum(this.curPage);
		}
	}
});
