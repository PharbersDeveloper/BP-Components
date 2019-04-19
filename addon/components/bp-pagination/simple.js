import Pagination from 'bp-components/components/bp-pagination';
import layout from '../../templates/components/bp-pagination/simple';
import { computed } from '@ember/object';

export default Pagination.extend({
	layout,
	currentPage: computed('curPage', 'totalPageCounts', function () {
		let { curPage, totalPageCounts } = this.getProperties('curPage', 'totalPageCounts');

		if (curPage === totalPageCounts) {
			return totalPageCounts - 1;
		}
		return curPage;
	})
});