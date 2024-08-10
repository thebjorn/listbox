<script lang="ts">
	import {setContext} from 'svelte'
    import type {Snippet} from 'svelte'
    import type {Person, ListboxContext} from './types.ts'



	let {
		items = $bindable(),
		list_item
	}: {
        items: any[],
        list_item: Snippet<[Person, number]>
    } = $props()

	let litems: HTMLElement[] = $state([])
	
	function updateItems(changedPosition: number) {
		console.log({changedPosition})
		items.forEach((el, i: number) => {
			items[i].active = i === changedPosition
		})
		litems[changedPosition]?.focus()
	}
	let curpos = $state()

	setContext('listbox', {
		updateItems, 
		get curpos() {return curpos},
		set curpos(v) { curpos = v},
		set_litem(li, i) { litems[i] = li }
	} as ListboxContext)

	$effect(() => {
		items;
		curpos = null
	})
</script>

<div class="listbox">
	{#each items as item, index (index)}
		{@render list_item(item, index)}
	{/each}
</div>

<pre>{JSON.stringify(litems)}</pre>

<style>
	.listbox {
		border: 1px solid rebeccapurple;
		border-radius: .25rem;
		width: 400px;
		display: grid;
		grid-template-columns: 1fr;
		margin-block: 1rem;
	}
</style>