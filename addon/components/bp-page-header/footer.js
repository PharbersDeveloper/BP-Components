import PHBody from 'bp-components/components/bp-page-header/body';
import layout from '../../templates/components/bp-page-header/body';

export default PHBody.extend({
	layout,
	isFooter: true,
	pageHeaderRightItem: 'bp-page-header/footer-right-item'
});
