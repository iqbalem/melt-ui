import { createFocusTrap, useClickOutside, useFloating, usePortal } from '$lib/internal/actions';
import { addEventListener, executeCallbacks, kbd } from '$lib/internal/helpers';
import type { Action } from 'svelte/action';
import { noop } from 'svelte/internal';
import type { PopperArgs, PopperConfig } from './popper.types';

const defaultConfig = {
	floating: {},
	focusTrap: {},
	clickOutside: {},
} satisfies PopperConfig;

export const usePopper: Action<HTMLElement, PopperArgs> = (popperElement, args) => {
	const { anchorElement, open, options } = args ?? {};
	if (!(open && anchorElement && options)) return { destroy: noop };

	const opts = { ...defaultConfig, ...options } as PopperConfig;

	const portal = usePortal(popperElement);

	const unsubscribeFloating = useFloating(anchorElement, popperElement, opts.floating).destroy;

	let unSubfocusTrap = noop;
	if (options.focusTrap !== null) {
		const { useFocusTrap } = createFocusTrap({
			immediate: true,
			escapeDeactivates: false,
			allowOutsideClick: true,
			returnFocusOnDeactivate: false,
			fallbackFocus: popperElement,
			...opts.focusTrap,
		});

		const usedFocusTrap = useFocusTrap(popperElement);

		if (usedFocusTrap && usedFocusTrap.destroy) {
			unSubfocusTrap = () => usedFocusTrap.destroy;
		}
	}

	const unsubscribeClickOutside = useClickOutside(popperElement, {
		enabled: open,
		handler: (e: PointerEvent) => {
			if (e.defaultPrevented) return;

			if (!anchorElement?.contains(e.target as Element)) {
				open.set(false);
				anchorElement.focus();
			}
		},
		...opts.clickOutside,
	}).destroy;

	const removeKeydown = addEventListener(popperElement, 'keydown', (e) => {
		if (e.defaultPrevented) return;
		const event = e as KeyboardEvent;

		switch (event.key) {
			case kbd.ESCAPE:
				open.set(false);
				break;
			default:
		}
	});

	const unsubscribe = executeCallbacks(
		unsubscribeFloating,
		unsubscribeClickOutside,
		unSubfocusTrap,
		removeKeydown,
		portal && portal.destroy ? portal.destroy : noop
	);

	return {
		destroy: unsubscribe,
	};
};
