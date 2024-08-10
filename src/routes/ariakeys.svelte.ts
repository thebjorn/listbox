import type { LitemUseProps } from "./types";


export function listitem(node: HTMLElement, {listbox, position, set_active, onactivate}: LitemUseProps) {

    const handle_keydown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                listbox.select_position(Math.min(position + 1, listbox.length - 1))
                break;
            case 'ArrowUp':
                e.preventDefault()
                listbox.select_position(Math.max(0, position - 1))
                break;
            case 'Home':
                e.preventDefault()
                listbox.select_position(0)
                break;
            case 'End':
                e.preventDefault()
                listbox.select_position(listbox.length - 1)
                break;
            case ' ':  // space
                e.preventDefault()
                if (typeof onactivate === 'function') onactivate(e)
                break;
            case 'Tab':
                // tab out of the listbox
                listbox.log()
                e.preventDefault()
                if (e.shiftKey) {
                    node.closest('.listbox')?.previousElementSibling?.focus()
                } else {
                    node.closest('.listbox')?.nextElementSibling?.focus()
                }
                listbox.log()
                break;
        }
    }
    
    node.addEventListener('keydown', handle_keydown)

    return {
        destroy() {
            node.removeEventListener('keydown', handle_keydown)
        }
    }
}
