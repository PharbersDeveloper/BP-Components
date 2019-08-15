import Component from '@ember/component';
import { computed } from '@ember/object';

import layout from '../../templates/components/bp-table/sort-icon';

export default Component.extend({
	tagName: '',
  layout,
  icon: computed('sortIcons', 'sortIconProperty', function () {
		return 'down';
	})
});
