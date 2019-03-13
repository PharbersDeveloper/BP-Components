import Component from '@ember/component';
import layout from '../templates/components/bp-pagination';
import { computed } from '@ember/object';
import { gt } from '@ember/object/computed';

export default Component.extend({
	layout,
	tagName: 'ul',
	classNames: ['bp-pagination'],
	positionalParams: ['totalPageCounts'],
	/**
	 * 当前页数
	 * @property curPage
	 * @type {number}
	 * @default 1
	 * @private
	 */
	curPage: 1,
	/**
	 * 当前展示的页数数组
	 * @property pageGroup
	 * @type {Array}
	 * @default null
	 * @private
	 */
	pageGroup: null,
	/**
	 * 下一页按钮的状态 disabled
	 * @property nextFlag
	 * @type {boolean}
	 * @default false
	 * @private
	 */
	nextFlag: computed('curPage', 'totalPageCounts', function () {
		return this.get('curPage') < this.get('totalPageCounts');
	}),
	/**
	 * 下一页按钮的状态 disabled
	 * @property previousFlag
	 * @type {boolean}
	 * @default false
	 * @private
	 */
	previousFlag: gt('curPage', 1),
	/**
	 * 需要展示几个页数
	 * @property showHowManyPages
	 * @type {number}
	 * @default 7
	 * @public
	 */
	showHowManyPages: 7,
	/**
	 * 总页数
	 * @property totalPageCounts
	 * @type {number}
	 * @default 0
	 * @public
	 */
	totalPageCounts: 0,
	/**
	 * 是否显示more in right
	 * @param curPage
	 * @param totalPageCounts
	 * @private
	 */
	rightMoreIcon: computed('totalPageCounts', 'pageGroup', function () {
		let { totalPageCounts, pageGroup } =
			this.getProperties('totalPageCounts', 'pageGroup');

		if (totalPageCounts - pageGroup.lastObject > 1) {
			return true;
		}
		return false;
	}),
	/**
	 * 是否显示more icon in left
	 * @param curPage
	 * @param totalPageCounts
	 * @private
	 */
	leftMoreIcon: gt('pageGroup.firstObject', 2),
	/**
	 * 要显示的page
	 * @method
	 * @param {number} totalPageCounts
	 * @param {number} fromIndex
	 * @private
	 */
	generateTemPageGroup(totalPageCounts, fromIndex = 0) {
		let tmpArr = [...Array(totalPageCounts).keys()].map((ele) => {
			return ele + 1;
		});

		return fromIndex !== 0 ? tmpArr.slice(fromIndex) : tmpArr;
	},
	/**
	 * 初始化展示数组
	 * @method
	 * @private
	 */
	createPageGroup() {
		let arr = [],
			maxPageNum = 0,
			{ showHowManyPages: pageNums, totalPageCounts } =
				this.getProperties('showHowManyPages', 'totalPageCounts');

		if (totalPageCounts === 0) {
			return;
		}
		if (totalPageCounts <= pageNums) {
			maxPageNum = totalPageCounts;
		} else {
			maxPageNum = pageNums - 2;
		}
		arr = this.generateTemPageGroup(maxPageNum);
		this.set('pageGroup', arr);
	},
	/**
	 * 更新展示数组
	 * @method
	 * @private
	 */
	updatePageGroup() {
		let arr = [],
			{ showHowManyPages: pageNums, totalPageCounts, curPage } =
				this.getProperties('showHowManyPages', 'totalPageCounts', 'curPage');

		if (totalPageCounts < pageNums) {
			return;
		}
		if (totalPageCounts === pageNums) {
			arr = this.generateTemPageGroup(pageNums);
		} else if (curPage < 4) {
			arr = this.generateTemPageGroup(pageNums - 2);
		} else if (curPage > 3 && curPage < totalPageCounts - 3) {
			arr = this.generateTemPageGroup(curPage + 1, curPage - 2);
		} else {
			arr = this.generateTemPageGroup(totalPageCounts, totalPageCounts - 5);
		}
		this.set('pageGroup', arr);
	},
	didReceiveAttrs() {
		this._super(...arguments);
		this.createPageGroup();
	},
	/**
	 * 点击页面的操作
	 * @param page
	 * @public
	 */
	onClickPage() { },
	/**
	 * 点击 page
	 * @param {number} page
	 * @private
	 */
	clickPage(page) {
		this.set('curPage', page);
		this.updatePageGroup(this.get('pageGroup'));
		this.get('onClickPage')(page);
	},
	actions: {
		pageOnClick(param) {
			this.clickPage(param);
		},
		onPreviousClick() {
			this.clickPage(this.get('curPage') - 1);
		},
		onNextClick() {
			this.clickPage(this.get('curPage') + 1);
		},
		jumpToPage(page) {
			let NumberPage = Number(page),
				totalPageCounts = this.get('totalPageCounts');

			if (!NumberPage || NumberPage > totalPageCounts) {
				return;
			}
			this.clickPage(NumberPage);
		}
	}
});
