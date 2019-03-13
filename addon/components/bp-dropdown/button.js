import Button from 'bp-components/components/bp-button';
import DropdownToggle from 'bp-components/mixins/dropdown-toggle';

/**
 Button component with that can act as a dropdown toggler.

 See [Components.Dropdown](Components.Dropdown.html) for examples.

 @class DropdownButton
 @namespace Components
 @extends Components.Button
 @uses Mixins.DropdownToggle
 @public
 */
export default Button.extend(DropdownToggle, {
	classNames: ['dropdown-button']
});
