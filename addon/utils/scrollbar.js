// export function getScrollbarWidth() {
// 	let scrollDiv = document.createElement('div'),
// 		scrollbarWidth = 0;

// 	scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
// 	document.body.appendChild(scrollDiv);
// 	scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
// 	document.body.removeChild(scrollDiv);
// 	return scrollbarWidth;
// }
export function getScrollbarWidth() {

	// Creating invisible container
	const outer = document.createElement('div'),
		inner = document.createElement('div');

	let scrollbarWidth = 0;

	outer.style.visibility = 'hidden';
	outer.style.overflow = 'scroll'; // forcing scrollbar to appear
	outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
	document.body.appendChild(outer);

	// Creating inner element and placing it in the container
	// const inner = document.createElement('div');

	outer.appendChild(inner);

	// Calculating difference between container's full width and the child width
	scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

	// Removing temporary elements from the DOM
	outer.parentNode.removeChild(outer);

	return scrollbarWidth;

}