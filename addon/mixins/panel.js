import Mixin from '@ember/object/mixin';
import EmberObject from '@ember/object';

export default Mixin.create({
	/**
	 * @author Frank Wang
	 * @property
	 * @name id
	 * @description panel's id
	 * @type String
	 * @default null
	 * @public
	 */
	id: null,
	/**
	 * @author Frank Wang
	 * @property
	 * @name title
	 * @description panel's title
	 * @type String
	 * @default 'new Panel'
	 * @public
	 */
	title: 'new Panel',
	/**
	 * @author Frank Wang
	 * @property
	 * @name description
	 * @description panel's description
	 * @type String
	 * @default ''
	 * @public
	 */
	description: '',
	/**
	 * @author Frank Wang
	 * @property
	 * @name gridPos
	 * @description panel's position
	 * @type Object
	 * @default {}
	 * @public
	 */
	gridPos: EmberObject.create({
		w: 24,
		h: 8,
		x: 0,
		y: 0
	}),
	/**
	 * @author Frank Wang
	 * @property
	 * @name version
	 * @description panel's version
	 * @type Number
	 * @default 0
	 * @public
	 */
	version: 0,
	/**
	 * @author Frank Wang
	 * @property
	 * @name type
	 * @description panel's type
	 * @type String
	 * @default 'graph'
	 * @public
	 */
	type: 'graph',
	/**
	 * @author Frank Wang
	 * @method
	 * @name destory
	 * @description destory this panel instance
	 * @param panelId
	 * @return void
	 * @example 创建例子。
	 * @public
	 */
	destory(id) {
		// code here
		window.console.log(id);
	}
});
