<script lang="ts">
	import { createToolbar } from '$lib';
	import { createToolbarGroup } from '$lib/builders/toolbar/group';
	import { Docs } from '$routes/(components)';

	import Bold from '~icons/lucide/bold';
	import Italic from '~icons/lucide/italic';
	import Strikethrough from '~icons/lucide/strikethrough';
	import AlignLeft from '~icons/lucide/align-left';
	import AlignCenter from '~icons/lucide/align-center';
	import AlignRight from '~icons/lucide/align-right';

	const { root, options, button, link, separator } = createToolbar();
	const { root: fontGroup, item: fontItem } = createToolbarGroup({
		toolbarOptions: options,
		type: 'multiple',
	});
	const { root: alignGroup, item: alignItem } = createToolbarGroup({ toolbarOptions: options });
</script>

<Docs.PreviewWrapper fullwidth>
	<div
		{...$root}
		class="flex min-w-max items-center gap-4 rounded-md bg-white px-3 py-3 text-neutral-700 shadow-sm"
	>
		<div class="group" {...$fontGroup}>
			<button class="item" {...$fontItem('bold')}>
				<Bold />
			</button>
			<button class="item" {...$fontItem('italic')}>
				<Italic />
			</button>
			<button class="item" {...$fontItem('strikethrough')}>
				<Strikethrough />
			</button>
		</div>
		<div class="separator" {...$separator} />
		<div class="group" {...$alignGroup}>
			<button class="item" {...$alignItem('left')}>
				<AlignLeft />
			</button>
			<button class="item" {...$alignItem('center')}>
				<AlignCenter />
			</button>
			<button class="item" {...$alignItem('right')}>
				<AlignRight />
			</button>
		</div>
		<div class="separator" {...$separator} />
		<!-- svelte-ignore a11y-invalid-attribute -->
		<a href="#" class="link nowrap flex-shrink-0" {...$link()}> Edited 2 hours ago </a>
		<button class="button" {...$button()}>Save</button>
	</div>
</Docs.PreviewWrapper>

<style lang="postcss">
	.group {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.item {
		padding: theme('spacing.1');
		border-radius: theme('borderRadius.md');

		&:hover {
			background-color: theme('colors.magnum.100');
		}

		&[data-state='on'] {
			background-color: theme('colors.magnum.200');
			color: theme('colors.magnum.900');
		}
	}

	.separator {
		width: 1px;
		background-color: theme('colors.neutral.300');
		align-self: stretch;
	}

	.button {
		background-color: theme('colors.magnum.600');
		color: theme('colors.magnum.100');
		padding: theme('spacing.1') theme('spacing.3');
		border-radius: theme('borderRadius.md');
		font-weight: theme('fontWeight.medium');
		margin-inline-start: auto;

		&:hover {
			opacity: theme('opacity.75');
		}

		&:active {
			opacity: theme('opacity.50');
		}
	}
</style>
