import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import { debounce } from '@ember/runloop';
export default Mixin.create({
	bindScrolling(element) {
		let onScroll = null,
			that = this,
			opts = { debounce: 100 };

		//TODO 防抖
		if (opts.debounce) {
			onScroll = function () {
				debounce(that, that.get('scrolled'), 0);
			};
		} else {
			onScroll = function () {
				return that.scrolled();
			};
		}
		// $(document).bind('touchmove', onScroll);
		$(element).bind('scroll', onScroll);
	},

	unbindScrolling(element) {
		$(element).unbind('scroll');
		// $(document).unbind('touchmove');
	}

});
