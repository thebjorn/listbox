<script lang="ts">
	import {setContext} from 'svelte'
	import {nanoid} from 'nanoid'
    import type {Snippet} from 'svelte'
    import type {Person, ListboxContext, PersonList} from './types.ts'

	const id = "id_" + nanoid(8)

	let {
		items = $bindable(),
		list_item
	}: {
        items: PersonList | undefined,
        list_item: Snippet<[Person, number]>
    } = $props()

	let litems: HTMLElement[] = $state([])
    let curpos: number | null = $state(null)
	let selected_position = $state(0)

	function select_position(pos: number) {
		console.log({pos})
        curpos = pos
        if (items == null) return;
		// items.forEach((el, i: number) => {
		// 	items[i].active = i === pos
		// })
		// litems[pos]?.focus()
	}
	

    export const ctx: ListboxContext = {
		id,
		select_position, 
		get selected_position() { return selected_position },
		set selected_position(v) { selected_position = v },
		get curpos(): number | null {return curpos},
		set curpos(v: number | null) { curpos = v},
		set_litem(li, i) { litems[i] = li },
		get length() { return items?.length ?? 0},
		log() { console.log("LISTBOX:curpos", curpos, "items:", JSON.stringify($state.snapshot(items), null, 4))}
	} 
	setContext('listbox', ctx)

    // const handle_focus = (e: Event) => {
    //     console.log("handle:focus")
	// 	if (curpos != null) return select_position(curpos);
	// 	select_position(0)
	// }

	
</script>

<!-- onfocusin={handle_focus}  onfocus={handle_focus} -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div class="listbox">
    {#if items == null}
        <p>no items</p>
    {:else}
        {#each items as item, index (index)}
            {@render list_item(item, index, select_position)}
        {/each}
    {/if}
</div>


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