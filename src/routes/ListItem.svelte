<script lang="ts">
    import {getContext} from 'svelte'
    import {listitem} from './ariakeys.svelte.js'
    import type {ListboxContext} from './types.ts'
    
    type Props = {
        position?: number
        onactivate?: (e: Event) => void
        group: number,
        // selected_position?: number,
        children?: any
    }

    let {
        position,
        onactivate,
        children,
        group = $bindable(),
        // selected_position = $bindable()
    }: Props = $props()


    let dombutton: HTMLButtonElement;
    const listbox: ListboxContext = getContext('listbox')

    // function toggle() {
    //     if (position === listbox.curpos) return;
    //     active = true
    //     if (active && position != null) {
    //         listbox.curpos = position
    //         listbox.select_position(position)
    //     }
    // }

    // $effect(() => {
    //     if (position != null) listbox.set_litem(dombutton, position)
    // })
</script>

<!-- use:listitem={{listbox, position: position ?? 0, set_active: v => active = v, onactivate}}
class:active
onclick={toggle}  
           onchange={e => listbox.select_position(position)} 
use:listitem={{listbox, position: position ?? 0, set_active: v => group = v, onactivate}} 
-->

<label ondblclick={e => onactivate && onactivate(e)}
       
    >
    <input type="radio" 
           name="{listbox.id}" 
           bind:group={group}
           value={position}>
    
    {@render children?.()} <small hidden>(grp: {group})</small>
</label>

<style lang="scss">
    label {
        display: block;
        padding: .5rem 1rem;
        user-select: none; 

        &:hover {
            background-color: color-mix(in srgb, rebeccapurple 50%, transparent);
        }

        & input[type="radio"] {
            position: absolute;
            opacity: 0;
            pointer-events: none;
        }

        &:has(input[type="radio"]:checked) {
            background-color: color-mix(in srgb, rebeccapurple 90%, transparent);
            color: white;

            &:hover {
                background-color: rebeccapurple;
            }
        }
    }

</style>