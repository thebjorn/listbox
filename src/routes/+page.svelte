<script lang="ts">
	import {untrack} from 'svelte'
	import Listbox from './Listbox.svelte'
	import ListItem from './ListItem.svelte'
    import type {Person, PersonList, ListboxContext} from './types.ts'


	let names = $state<Record<'teens'|'adults', PersonList>>({
        teens: 'Timmy Tracy Trevor'.split(' ').map(n => ({name: n, active: false})),
        adults: 'Andrew Agatha'.split(' ').map(n=> ({name: n, active: false}))
	})

    let listbox: {ctx: ListboxContext};
	let curlist = $state<'teens'|'adults'>('teens')
	let items: PersonList | undefined = $state()

    const do_switch = (e: Event) => {
		curlist = curlist === 'teens' ? 'adults' : 'teens'
        listbox.ctx.curpos = null
	}

	$effect(() => {
		items = names[curlist]
		// untrack(() => items!.forEach(i => i.active = false))
	})
	
    const simulate_db_update = (e: Event) => {
		names = {
			teens: 'Timmy Tracy Trevor Tina'.split(' ').map(n => ({name: n})),
			adults: 'Andrew Agatha Anthony'.split(' ').map(n=> ({name: n}))
		}
		listbox.ctx.curpos = null
	}
</script>

<div class="header">
    <strong>{curlist}</strong>
    <button type="button" onclick={e => do_switch(e)}>switch</button>
    <button type="button" onclick={simulate_db_update}>simulate db update</button>
    <button type="button" onclick={e => listbox.ctx.log()}>log</button>
</div>
<input placeholder="before (to check tab-order)">

<Listbox bind:items bind:this={listbox}>
	{#snippet list_item(item: Person, index: number)}
		<ListItem bind:active={item.active} 
                  position={index} 
                  onactivate={(e: Event) => console.log('hello', item.name)}>
			{item.name}
		</ListItem>
	{/snippet}
</Listbox>

<input placeholder="after (to check tab-order)">

<pre>{JSON.stringify(names, null, 4)}</pre>

<style>
	:global(:focus-visible, :focus) {
        outline: 5px dotted hotpink;
		background-color: orange !important;
		color: blue !important;
	}
</style>