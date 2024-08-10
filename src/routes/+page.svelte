<script lang="ts">
	import {untrack} from 'svelte'
	import Listbox from './Listbox.svelte'
	import ListItem from './ListItem.svelte'
    import type {Person, ListItems} from './types.ts'


	let names = $state<Record<'males'|'females', ListItems>>({
		males: [
			{name: 'Richard'},
			{name: 'Timmy'}
		].map(p => ({...p, active: false})),
		females: [
			{name: 'Rita'},
			{name: 'Tracy'}
		].map(p => ({...p, active: false}))
	})

	let curlist = $state<'males'|'females'>('males')
	let items = $state(names.males)

    const do_switch = (e: Event) => {
		curlist = curlist === 'males' ? 'females' : 'males'
	}

	$effect(() => {
		items = names[curlist]
		untrack(() => items.forEach(i => i.active = false))
	})
	
</script>

<button type="button" onclick={e => do_switch(e)}>switch</button>

<Listbox bind:items>
	{#snippet list_item(item: Person, index: number)}
		<ListItem bind:active={item.active} 
                  position={index} 
                  onactivate={(e: Event) => console.log('hello', item.name)}>
			{item.name}
		</ListItem>
	{/snippet}
</Listbox>

<pre>{JSON.stringify(names, null, 4)}</pre>

<style>
	:global(:focus-visible) {
		outline: 5px dotted hotpink;
	}
</style>