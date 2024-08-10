<script lang="ts">
	import {getContext} from 'svelte'
	import {listitem} from './ariakeys.svelte.js'
    import type {ListboxContext} from './types.ts'
	
    type Props = {
        position?: number
        onactivate?: (e: Event) => void
        active?: boolean
        children?: () => any
    }

	let {
		position,
		onactivate,
		children,
		active = $bindable()
	}: Props = $props()

	let dombutton: HTMLButtonElement;
	const listbox: ListboxContext = getContext('listbox')

	function toggle() {
		if (position === listbox.curpos) return;
		active = !active
		if (active && position != null) {
            listbox.curpos = position
		    listbox.updateItems(position)
        }
	}

	$effect(() => {
		if (position != null) listbox.set_litem(dombutton, position)
	})
</script>

<button bind:this={dombutton}
	use:listitem={{listbox, position: position ?? 0, set_active: v => active = v, onactivate}}
	class:active
	onclick={toggle} 
	ondblclick={e => onactivate && onactivate(e)}>
	
	{@render children?.()}
</button>

<style>
	.active {
		background-color: color-mix(in srgb, rebeccapurple 90%, transparent);
		color: white;

		&:hover {
			background-color: rebeccapurple;
		}
	}

	button {
		all: unset;
		display: block;
		width: 100%;
		padding: .5rem 1rem;
		box-sizing: border-box;

		&:hover {
			background-color: color-mix(in srgb, rebeccapurple 50%, transparent);
		}
	}
</style>