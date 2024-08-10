<script lang="ts">
	import {setContext} from 'svelte'
    import type {Snippet} from 'svelte'
    import type {Person, ListboxContext, PersonList} from './types.ts'



	let {
		items = $bindable(),
		list_item
	}: {
        items: PersonList | undefined,
        list_item: Snippet<[Person, number]>
    } = $props()

	let litems: HTMLElement[] = $state([])
    let curpos: number | null = $state(null)

	function select_position(pos: number) {
		console.log({pos})
        curpos = pos
        if (items == null) return;
		items.forEach((el, i: number) => {
			items[i].active = i === pos
		})
		litems[pos]?.focus()
	}
	

    export const ctx: ListboxContext = {
		select_position, 
		get curpos(): number | null {return curpos},
		set curpos(v: number | null) { curpos = v},
		set_litem(li, i) { litems[i] = li },
		get length() { return items?.length ?? 0},
		log() { console.log("LISTBOX:curpos", curpos, "items:", JSON.stringify($state.snapshot(items), null, 4))}
	} 
	setContext('listbox', ctx)

    const handle_focus = (e: Event) => {
        console.log("handle:focus")
		if (curpos != null) return select_position(curpos);
		select_position(0)
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div class="listbox" onfocus={handle_focus} onfocusin={handle_focus} tabindex="0">
    {#if items == null}
        <p>no items</p>
    {:else}
        {#each items as item, index (index)}
            {@render list_item(item, index)}
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