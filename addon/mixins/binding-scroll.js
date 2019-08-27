import Mixin from '@ember/object/mixin';
import $ from 'jquery';
import { debounce } from '@ember/runloop';
export default Mixin.create({
	bindScrolling(element) {
		let onScroll = null,
			_this = this,
    		opts = {debounce: 100};

		if (opts.debounce) {
			onScroll = function() {
				debounce(_this, _this.get('scrolled'), 0);
			};
		} else {
			onScroll = function(){
				return _this.scrolled();
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
