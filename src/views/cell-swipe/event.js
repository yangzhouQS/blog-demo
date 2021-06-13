let supportsPassive = false;

const isServer = false
if (isServer) {
	try {
		var opts = {};
		Object.defineProperty(opts, 'passive', {
			get: function get() {
				supportsPassive = supportsPassive = true;
			}
		});
		window.addEventListener('test-passive', null, opts);
	} catch (e) {
	}
}

export function on(target, event, handler, passive) {
	if (passive === void 0) {
		passive = false;
	}

	if (!isServer) {
		target.addEventListener(event, handler, supportsPassive ? {
			capture: false,
			passive: passive
		} : false);
	}
}

export function off(target, event, handler) {
	if (!isServer) {
		target.removeEventListener(event, handler);
	}
}

export function stopPropagation(event) {
	event.stopPropagation();
}

export function preventDefault(event, isStopPropagation) {
	if (typeof event.cancelable !== 'boolean' || event.cancelable) {
		event.preventDefault();
	}

	if (isStopPropagation) {
		stopPropagation(event);
	}
}

