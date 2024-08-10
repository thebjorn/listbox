import type { LitemUseProps } from "./types";



export function listitem(node: HTMLElement, {listbox, position, set_active, onactivate}: LitemUseProps) {

	const handle_keydown = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault()
				// set_active(false)
				listbox.updateItems(position + 1)
				// ?
				break;
			case 'ArrowUp':
				e.preventDefault()
				// set_active(false)
				listbox.updateItems(Math.max(0, position - 1))
				// ?
				break;
			case ' ':  // space
				e.preventDefault()
				if (typeof onactivate === 'function') onactivate(e)
		}
	}
	
	node.addEventListener('keydown', handle_keydown)

	return {
		destroy() {
			node.removeEventListener('keydown', handle_keydown)
		}
	}
}
