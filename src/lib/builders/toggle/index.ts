import { elementDerived } from '$lib/internal/helpers';
import { writable } from 'svelte/store';

export type CreateToggleArgs = {
	disabled?: boolean;
	pressed?: boolean;
};

export function createToggle(args: CreateToggleArgs = {}) {
	const pressed = writable(args.pressed ?? false);
	const disabled = writable(args.disabled ?? false);

	const toggle = elementDerived([pressed, disabled], ([$pressed, $disabled], { attach }) => {
		attach('click', () => {
			if (!$disabled) {
				pressed.update((p) => !p);
			}
		});

		return {
			'data-disabled': $disabled ? '' : undefined,
			'data-state': $pressed ? 'on' : 'off',
			'aria-pressed': $pressed,
			type: 'button',
		} as const;
	});

	return {
		toggle,
		pressed,
	};
}
